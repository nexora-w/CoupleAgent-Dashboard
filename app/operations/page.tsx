"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

export default function OperationsPage() {
  const [selectedOperation, setSelectedOperation] = useState(null)

  const operations = [
    {
      id: "ACT-001",
      name: "Weekend Getaway Planning",
      status: "active",
      priority: "high",
      couple: "Sarah & Mike",
      participants: 2,
      progress: 75,
      startDate: new Date(Date.now() - 5*24*60*60*1000).toISOString().split('T')[0],
      estimatedCompletion: new Date(Date.now() + 10*24*60*60*1000).toISOString().split('T')[0],
      description: "Planning a romantic weekend getaway",
      objectives: ["Choose destination", "Book accommodations", "Plan activities"],
    },
    {
      id: "ACT-002",
      name: "Home Renovation Project",
      status: "planning",
      priority: "medium",
      couple: "Emma & James",
      participants: 2,
      progress: 25,
      startDate: new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0],
      estimatedCompletion: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      description: "Planning kitchen renovation",
      objectives: ["Get quotes", "Choose contractor", "Set timeline"],
    },
    {
      id: "ACT-003",
      name: "Anniversary Celebration",
      status: "completed",
      priority: "high",
      couple: "Lisa & David",
      participants: 2,
      progress: 100,
      startDate: new Date(Date.now() - 14*24*60*60*1000).toISOString().split('T')[0],
      estimatedCompletion: new Date(Date.now() - 1*24*60*60*1000).toISOString().split('T')[0],
      description: "5th anniversary celebration",
      objectives: ["Reserve restaurant", "Order flowers", "Plan surprise"],
    },
    {
      id: "ACT-004",
      name: "Financial Planning",
      status: "active",
      priority: "high",
      couple: "Anna & Tom",
      participants: 2,
      progress: 60,
      startDate: new Date(Date.now() - 10*24*60*60*1000).toISOString().split('T')[0],
      estimatedCompletion: new Date(Date.now() + 15*24*60*60*1000).toISOString().split('T')[0],
      description: "Joint financial planning and budgeting",
      objectives: ["Review expenses", "Set savings goals", "Create budget"],
    },
    {
      id: "ACT-005",
      name: "Gift Shopping",
      status: "active",
      priority: "medium",
      couple: "Sarah & Mike",
      participants: 2,
      progress: 40,
      startDate: new Date(Date.now() - 3*24*60*60*1000).toISOString().split('T')[0],
      estimatedCompletion: new Date(Date.now() + 5*24*60*60*1000).toISOString().split('T')[0],
      description: "Shopping for birthday gift",
      objectives: ["Research options", "Make selection", "Purchase gift"],
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-white/20 text-white"
      case "planning":
        return "bg-orange-500/20 text-orange-500"
      case "completed":
        return "bg-white/20 text-white"
      case "compromised":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-neutral-500/20 text-neutral-300"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-red-500/20 text-red-500"
      case "high":
        return "bg-orange-500/20 text-orange-500"
      case "medium":
        return "bg-neutral-500/20 text-neutral-300"
      case "low":
        return "bg-white/20 text-white"
      default:
        return "bg-neutral-500/20 text-neutral-300"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <Calendar className="w-4 h-4" />
      case "planning":
        return <Clock className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">ACTIVITIES & TASKS</h1>
          <p className="text-sm text-neutral-400">Monitor couple activities and shared tasks</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">New Activity</Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">Task Report</Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">ACTIVE TASKS</p>
                <p className="text-2xl font-bold text-white font-mono">3,247</p>
              </div>
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">COMPLETED</p>
                <p className="text-2xl font-bold text-white font-mono">12,456</p>
              </div>
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">PLANNING</p>
                <p className="text-2xl font-bold text-orange-500 font-mono">892</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">COMPLETION RATE</p>
                <p className="text-2xl font-bold text-white font-mono">79%</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operations List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {operations.map((operation) => (
          <Card
            key={operation.id}
            className="bg-neutral-900 border-neutral-700 hover:border-orange-500/50 transition-colors cursor-pointer"
            onClick={() => setSelectedOperation(operation)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-sm font-bold text-white tracking-wider">{operation.name}</CardTitle>
                  <p className="text-xs text-neutral-400 font-mono">{operation.id}</p>
                </div>
                <div className="flex items-center gap-2">{getStatusIcon(operation.status)}</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Badge className={getStatusColor(operation.status)}>{operation.status.toUpperCase()}</Badge>
                <Badge className={getPriorityColor(operation.priority)}>{operation.priority.toUpperCase()}</Badge>
              </div>

              <p className="text-sm text-neutral-300">{operation.description}</p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <Users className="w-3 h-3" />
                  <span>{operation.couple}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <Users className="w-3 h-3" />
                  <span>{operation.participants} participants</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <Clock className="w-3 h-3" />
                  <span>Est. completion: {operation.estimatedCompletion}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Progress</span>
                  <span className="text-white font-mono">{operation.progress}%</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${operation.progress}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Operation Detail Modal */}
      {selectedOperation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-neutral-900 border-neutral-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-white tracking-wider">{selectedOperation.name}</CardTitle>
                <p className="text-sm text-neutral-400 font-mono">{selectedOperation.id}</p>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedOperation(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">ACTIVITY STATUS</h3>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(selectedOperation.status)}>
                        {selectedOperation.status.toUpperCase()}
                      </Badge>
                      <Badge className={getPriorityColor(selectedOperation.priority)}>
                        {selectedOperation.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">ACTIVITY DETAILS</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Couple:</span>
                        <span className="text-white">{selectedOperation.couple}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Participants:</span>
                        <span className="text-white font-mono">{selectedOperation.participants}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Start Date:</span>
                        <span className="text-white font-mono">{selectedOperation.startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Est. Completion:</span>
                        <span className="text-white font-mono">{selectedOperation.estimatedCompletion}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">PROGRESS</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Completion</span>
                        <span className="text-white font-mono">{selectedOperation.progress}%</span>
                      </div>
                      <div className="w-full bg-neutral-800 rounded-full h-3">
                        <div
                          className="bg-orange-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${selectedOperation.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">OBJECTIVES</h3>
                    <div className="space-y-2">
                      {selectedOperation.objectives.map((objective, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-neutral-300">{objective}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">DESCRIPTION</h3>
                <p className="text-sm text-neutral-300">{selectedOperation.description}</p>
              </div>

              <div className="flex gap-2 pt-4 border-t border-neutral-700">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Update Status</Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  View Details
                </Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  Message Couple
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
