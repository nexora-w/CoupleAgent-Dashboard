"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OverviewData {
  stats: {
    activeCouples: number
    messagesToday: number
    newCouplesToday: number
  }
  recentCouples: Array<{
    id: string
    name: string
    status: string
  }>
  recentActivity: Array<{
    time: string
    user: string
    action: string
    item: string
  }>
  platformStats: {
    chatConversations: number
    sharedTasks: number
    memoriesShared: number
    dailyActiveUsers: number
    messagesPerDay: number
    avgSessionTime: string
  }
}

export default function CommandCenterPage() {
  const [data, setData] = useState<OverviewData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/overview')
        const result = await response.json()
        if (result.success) {
          setData(result.data)
        }
      } catch (error) {
        console.error('Error fetching overview data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="p-6">
        <div className="text-red-500">Failed to load data</div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Couple Activity Overview */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">COUPLE ACTIVITY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono">{data.stats.activeCouples.toLocaleString()}</div>
                <div className="text-xs text-neutral-500">Active Couples</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono">{data.stats.messagesToday.toLocaleString()}</div>
                <div className="text-xs text-neutral-500">Messages Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono">{data.stats.newCouplesToday.toLocaleString()}</div>
                <div className="text-xs text-neutral-500">New Today</div>
              </div>
            </div>

            <div className="space-y-2">
              {data.recentCouples.map((couple) => (
                <div
                  key={couple.id}
                  className="flex items-center justify-between p-2 bg-neutral-800 rounded hover:bg-neutral-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        couple.status === "active"
                          ? "bg-white"
                          : "bg-neutral-500"
                      }`}
                    ></div>
                    <div>
                      <div className="text-xs text-white font-mono">{couple.id}</div>
                      <div className="text-xs text-neutral-500">{couple.name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Log */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">RECENT ACTIVITY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {data.recentActivity.map((log, index) => (
                <div
                  key={index}
                  className="text-xs border-l-2 border-orange-500 pl-3 hover:bg-neutral-800 p-2 rounded transition-colors"
                >
                  <div className="text-neutral-500 font-mono">{new Date(log.time).toLocaleString()}</div>
                  <div className="text-white">
                    <span className="text-orange-500 font-mono">{log.user}</span> {log.action}{" "}
                    <span className="text-white font-mono">{log.item}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Activity */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
              MESSAGE ACTIVITY
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {/* Activity Indicator */}
            <div className="relative w-32 h-32 mb-4">
              <div className="absolute inset-0 border-2 border-white rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute inset-2 border border-white rounded-full opacity-40"></div>
              <div className="absolute inset-4 border border-white rounded-full opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-2xl font-bold">45.9K</div>
              </div>
            </div>

            <div className="text-xs text-neutral-500 space-y-1 w-full font-mono">
              <div className="flex justify-between">
                <span># {new Date().toLocaleDateString()}</span>
              </div>
              <div className="text-white">{"> Messages sent today: {data.stats.messagesToday.toLocaleString()}"}</div>
              <div className="text-orange-500">{"> Active conversations: {data.platformStats.chatConversations.toLocaleString()}"}</div>
              <div className="text-white">{"> Average per couple: {data.stats.activeCouples > 0 ? (data.stats.messagesToday / data.stats.activeCouples).toFixed(1) : '0'}"}</div>
              <div className="text-neutral-400">
                {'> Peak activity: 2:00 PM - 4:00 PM'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Statistics Chart */}
        <Card className="lg:col-span-8 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
              USAGE STATISTICS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 relative">
              {/* Chart Grid */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-20">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-neutral-700"></div>
                ))}
              </div>

              {/* Chart Line */}
              <svg className="absolute inset-0 w-full h-full">
                <polyline
                  points="0,120 50,100 100,110 150,90 200,95 250,85 300,100 350,80"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2"
                />
                <polyline
                  points="0,140 50,135 100,130 150,125 200,130 250,135 300,125 350,120"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              </svg>

              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-neutral-500 -ml-5 font-mono">
                <span>50K</span>
                <span>40K</span>
                <span>30K</span>
                <span>20K</span>
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-neutral-500 -mb-6 font-mono">
                <span>{new Date(Date.now() - 7*24*60*60*1000).toLocaleDateString()}</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Statistics */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">PLATFORM STATISTICS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-xs text-white font-medium">Active Features</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Chat Conversations</span>
                    <span className="text-white font-bold font-mono">{data.platformStats.chatConversations.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Shared Tasks</span>
                    <span className="text-white font-bold font-mono">{data.platformStats.sharedTasks.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Memories Shared</span>
                    <span className="text-white font-bold font-mono">{data.platformStats.memoriesShared.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-xs text-orange-500 font-medium">Engagement</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Daily Active Users</span>
                    <span className="text-white font-bold font-mono">{data.platformStats.dailyActiveUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Messages per Day</span>
                    <span className="text-white font-bold font-mono">{data.platformStats.messagesPerDay.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Avg Session Time</span>
                    <span className="text-white font-bold font-mono">{data.platformStats.avgSessionTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
