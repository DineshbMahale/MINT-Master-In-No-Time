"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { Topic } from "@/lib/types"

interface ProgressTrackerProps {
  studyPlan: Topic[]
  // In a real app, this would come from user data
  completedTopics: string[] 
}

const chartData = [
  { name: "Data Structures", time: 4 },
  { name: "Algorithms", time: 8 },
  { name: "Web Dev", time: 2 },
  { name: "System Design", time: 5 },
]

export function ProgressTracker({ studyPlan, completedTopics }: ProgressTrackerProps) {
  const completionRate = studyPlan.length > 0 ? (completedTopics.length / studyPlan.length) * 100 : 0
  const weakAreas = Array.from(new Set(studyPlan.map(t => t.category)))
    .filter(category => !studyPlan.filter(t => t.category === category).every(t => completedTopics.includes(t.id)))

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Topics Studied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTopics.length} / {studyPlan.length}</div>
            <p className="text-xs text-muted-foreground">
              {completionRate.toFixed(0)}% completion rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">19 hours</div>
            <p className="text-xs text-muted-foreground">
              Across all topics
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weak Areas</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-lg font-bold">{weakAreas.join(', ')}</div>
             <p className="text-xs text-muted-foreground">
              Keep practicing these!
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={completionRate} className="w-full" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Time Spent per Category</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}h`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                }}
              />
              <Bar dataKey="time" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
