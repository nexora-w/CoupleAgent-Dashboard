import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Couple from '@/lib/models/Couple';
import ChatMessage from '@/lib/models/ChatMessage';
import Chat from '@/lib/models/Chat';
import User from '@/lib/models/User';
import Agent from '@/lib/models/Agent';

export async function GET() {
  try {
    await connectDB();

    // Get basic statistics
    const totalCouples = await Couple.countDocuments({ status: 'active' });
    const totalUsers = await User.countDocuments();
    const totalAgents = await Agent.countDocuments();
    const totalChats = await Chat.countDocuments();

    // Get messages today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const messagesToday = await ChatMessage.countDocuments({
      createdAt: { $gte: today }
    });

    // Get new couples today
    const newCouplesToday = await Couple.countDocuments({
      status: 'active',
      createdAt: { $gte: today }
    });

    // Get recent couple activity
    const recentCouples = await Couple.find({ status: 'active' })
      .sort({ updatedAt: -1 })
      .limit(4)
      .select('coupleName user1Name user2Name')
      .lean();

    // Get recent activity (last 5 messages)
    const recentMessages = await ChatMessage.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate({
        path: 'chatId',
        select: 'title',
        populate: {
          path: 'agentId',
          select: 'title coupleId',
          populate: {
            path: 'coupleId',
            select: 'coupleName user1Name user2Name'
          }
        }
      })
      .lean();

    const recentActivity = recentMessages.map((msg: any) => {
      const chat = msg.chatId as any;
      const agent = chat?.agentId as any;
      const couple = agent?.coupleId as any;
      
      return {
        time: msg.createdAt,
        user: couple ? `${couple.user1Name} & ${couple.user2Name}` : 'Unknown',
        action: msg.sender === 'assistant' ? 'received AI response' : 'sent message',
        item: chat?.title || 'Chat',
      };
    });

    // Get usage statistics for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const messagesLast7Days = await ChatMessage.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Platform statistics
    const totalTasks = await Chat.countDocuments({ isActive: true });
    const totalMemories = 0; // Memory model not yet implemented in dashboard
    
    const dailyActiveUsers = await User.countDocuments({
      updatedAt: { $gte: today }
    });

    // Calculate average messages per couple
    const avgMessagesPerCouple = totalCouples > 0 
      ? Math.round(messagesToday / totalCouples * 10) / 10 
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          activeCouples: totalCouples,
          messagesToday,
          newCouplesToday,
          totalUsers,
          totalAgents,
          totalChats,
        },
        recentCouples: recentCouples.map((c: any) => ({
          id: c._id.toString(),
          name: c.coupleName || `${c.user1Name} & ${c.user2Name}`,
          status: 'active'
        })),
        recentActivity,
        usageStats: messagesLast7Days.map((item: any) => ({
          date: item._id,
          count: item.count
        })),
        platformStats: {
          chatConversations: totalChats,
          sharedTasks: totalTasks,
          memoriesShared: totalMemories,
          dailyActiveUsers,
          messagesPerDay: messagesToday,
          avgSessionTime: '18.5m' // This would need to be calculated from actual session data
        }
      }
    });
  } catch (error: any) {
    console.error('Error fetching overview data:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch overview data' },
      { status: 500 }
    );
  }
}

