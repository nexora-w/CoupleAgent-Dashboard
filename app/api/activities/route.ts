import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Chat from '@/lib/models/Chat';
import Agent from '@/lib/models/Agent';
import Couple from '@/lib/models/Couple';

export async function GET() {
  try {
    await connectDB();

    // Get active chats as activities/tasks
    const activeChats = await Chat.find({ isActive: true })
      .populate({
        path: 'agentId',
        select: 'title coupleId',
        populate: {
          path: 'coupleId',
          select: 'coupleName user1Name user2Name'
        }
      })
      .sort({ updatedAt: -1 })
      .limit(20)
      .lean();

    const activities = await Promise.all(
      activeChats.map(async (chat: any) => {
        const agent = chat.agentId;
        const couple = agent?.coupleId;
        const coupleName = couple 
          ? (couple.coupleName || `${couple.user1Name} & ${couple.user2Name}`)
          : 'Unknown';

        // Calculate progress based on messages count (simplified)
        const messageCount = chat.messages?.length || 0;
        const progress = Math.min(100, Math.round((messageCount / 10) * 100));

        // Determine status and priority
        const daysSinceUpdate = Math.floor(
          (Date.now() - new Date(chat.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
        );

        let status = 'active';
        if (daysSinceUpdate > 7) status = 'planning';
        if (progress === 100) status = 'completed';

        const priority = daysSinceUpdate < 1 ? 'high' : daysSinceUpdate < 3 ? 'medium' : 'low';

        // Estimate completion date (7 days from last update for active, or based on progress)
        const estimatedCompletion = new Date(chat.updatedAt);
        estimatedCompletion.setDate(estimatedCompletion.getDate() + (100 - progress) / 10);

        // Extract objectives from chat title or agent description
        const objectives = [
          chat.title.includes('plan') || chat.title.includes('Plan') ? 'Plan details' : 'Complete task',
          'Review progress',
          'Finalize'
        ];

        return {
          id: `ACT-${chat._id.toString().substring(0, 8).toUpperCase()}`,
          name: chat.title || agent?.title || 'Untitled Activity',
          status,
          priority,
          couple: coupleName,
          participants: 2, // Always 2 for couples
          progress,
          startDate: new Date(chat.createdAt).toISOString().split('T')[0],
          estimatedCompletion: estimatedCompletion.toISOString().split('T')[0],
          description: chat.lastMessage || 'No description available',
          objectives
        };
      })
    );

    // Calculate statistics
    const activeCount = activities.filter(a => a.status === 'active').length;
    const completedCount = activities.filter(a => a.status === 'completed').length;
    const planningCount = activities.filter(a => a.status === 'planning').length;
    const successRate = activities.length > 0
      ? Math.round((completedCount / activities.length) * 100)
      : 0;

    // Get all chats for total count
    const totalActiveChats = await Chat.countDocuments({ isActive: true });
    const totalCompletedChats = await Chat.countDocuments({ isActive: false });

    return NextResponse.json({
      success: true,
      data: {
        activities: activities.slice(0, 10), // Limit to 10 for display
        stats: {
          activeTasks: activeCount,
          completed: completedCount + totalCompletedChats,
          planning: planningCount,
          successRate: totalActiveChats + totalCompletedChats > 0
            ? Math.round((totalCompletedChats / (totalActiveChats + totalCompletedChats)) * 100)
            : 0
        }
      }
    });
  } catch (error: any) {
    console.error('Error fetching activities data:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch activities data' },
      { status: 500 }
    );
  }
}

