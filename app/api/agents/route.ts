import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Agent from '@/lib/models/Agent';
import Chat from '@/lib/models/Chat';
import Couple from '@/lib/models/Couple';

export async function GET() {
  try {
    await connectDB();

    // Get all agents with their usage stats
    const agents = await Agent.find()
      .sort({ createdAt: -1 })
      .lean();

    const agentsWithStats = await Promise.all(
      agents.map(async (agent: any) => {
        const chatCount = await Chat.countDocuments({ agentId: agent._id });
        
        // Get unique couples using this agent
        const coupleIds = await Chat.distinct('agentId', { agentId: agent._id });
        const coupleCount = await Couple.countDocuments({
          _id: { $in: [agent.coupleId] }
        });

        // Get last activity time
        const lastChat = await Chat.findOne({ agentId: agent._id })
          .sort({ updatedAt: -1 })
          .select('updatedAt')
          .lean();

        // Categorize agent based on title/description
        const titleLower = agent.title.toLowerCase();
        let category = 'general';
        if (titleLower.includes('plan') || titleLower.includes('planning')) {
          category = 'productivity';
        } else if (titleLower.includes('date') || titleLower.includes('romance') || titleLower.includes('gift')) {
          category = 'romance';
        } else if (titleLower.includes('memory') || titleLower.includes('remember')) {
          category = 'memory';
        } else if (titleLower.includes('travel')) {
          category = 'travel';
        } else if (titleLower.includes('daily') || titleLower.includes('briefing')) {
          category = 'daily';
        } else if (titleLower.includes('conflict') || titleLower.includes('communicat')) {
          category = 'communication';
        }

        const lastSeen = lastChat?.updatedAt 
          ? new Date(lastChat.updatedAt).toLocaleString()
          : 'Never';

        return {
          id: agent._id.toString(),
          name: agent.title,
          status: 'active',
          couples: coupleCount || 1, // At least the owner couple
          lastSeen: lastSeen.includes('Never') ? 'Never' : getTimeAgo(new Date(lastChat!.updatedAt)),
          chats: chatCount,
          category
        };
      })
    );

    // Calculate totals
    const totalAgents = agentsWithStats.length;
    const totalChats = agentsWithStats.reduce((sum: number, agent: any) => sum + agent.chats, 0);
    const avgUsage = totalAgents > 0 ? Math.round(totalChats / totalAgents) : 0;

    return NextResponse.json({
      success: true,
      data: {
        agents: agentsWithStats,
        stats: {
          activeAgents: totalAgents,
          totalChats,
          avgUsage
        }
      }
    });
  } catch (error: any) {
    console.error('Error fetching agents data:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch agents data' },
      { status: 500 }
    );
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
}

