import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';

export async function GET() {
  try {
    await connectDB();

    // Check MongoDB connection status
    const mongoose = require('mongoose');
    const isConnected = mongoose.connection.readyState === 1;
    
    // Mock system data - in production, you'd have actual system monitoring
    // This would typically come from your infrastructure monitoring tools
    const systems = [
      {
        id: 'SYS-001',
        name: 'API SERVER',
        type: 'API Server',
        status: isConnected ? 'online' : 'offline',
        health: isConnected ? 98 : 0,
        cpu: 45,
        memory: 67,
        storage: 34,
        uptime: isConnected ? '247 days' : '0 days',
        location: 'US East',
        lastMaintenance: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        id: 'SYS-002',
        name: 'DATABASE CLUSTER',
        type: 'Database',
        status: isConnected ? 'online' : 'offline',
        health: isConnected ? 95 : 0,
        cpu: 72,
        memory: 84,
        storage: 78,
        uptime: isConnected ? '189 days' : '0 days',
        location: 'US East',
        lastMaintenance: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        id: 'SYS-003',
        name: 'AUTHENTICATION SERVICE',
        type: 'Authentication',
        status: 'online',
        health: 97,
        cpu: 23,
        memory: 45,
        storage: 12,
        uptime: '156 days',
        location: 'US West',
        lastMaintenance: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        id: 'SYS-004',
        name: 'WEBSOCKET SERVER',
        type: 'Real-time',
        status: 'online',
        health: 92,
        cpu: 38,
        memory: 52,
        storage: 23,
        uptime: '203 days',
        location: 'US Central',
        lastMaintenance: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        id: 'SYS-005',
        name: 'FILE STORAGE',
        type: 'Storage',
        status: 'online',
        health: 89,
        cpu: 15,
        memory: 28,
        storage: 65,
        uptime: '180 days',
        location: 'US East',
        lastMaintenance: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        id: 'SYS-006',
        name: 'AI PROCESSING ENGINE',
        type: 'AI Service',
        status: 'online',
        health: 94,
        cpu: 89,
        memory: 76,
        storage: 45,
        uptime: '134 days',
        location: 'US West',
        lastMaintenance: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
    ];

    const onlineCount = systems.filter(s => s.status === 'online').length;
    const totalSystems = systems.length;
    const warnings = systems.filter(s => s.health < 90).length;
    const avgUptime = '99.9%'; // Would be calculated from actual uptime data
    const avgResponseTime = isConnected ? '45ms' : 'N/A';

    return NextResponse.json({
      success: true,
      data: {
        systems,
        stats: {
          systemsOnline: `${onlineCount}/${totalSystems}`,
          warnings,
          avgUptime,
          responseTime: avgResponseTime
        }
      }
    });
  } catch (error: any) {
    console.error('Error fetching systems data:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch systems data' },
      { status: 500 }
    );
  }
}

