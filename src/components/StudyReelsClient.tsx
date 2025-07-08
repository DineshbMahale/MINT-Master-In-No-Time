"use client"

import { useState, useEffect, useMemo } from 'react'
import { BookOpen, LineChart, ListTodo, LogOut, Settings } from 'lucide-react'
import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SkillSelector } from './SkillSelector'
import { StudyCard } from './StudyCard'
import { ProgressTracker } from './ProgressTracker'
import { PracticeProblemSuggestor } from './PracticeProblemSuggestor'
import { StudyPlanManager } from './StudyPlanManager'
import { STUDY_PLANS } from '@/lib/data'
import type { SkillLevel, Topic, StudyPlan } from '@/lib/types'

type View = 'study' | 'progress' | 'practice'

export function StudyReelsClient() {
  const [isClient, setIsClient] = useState(false)
  const [skillLevel, setSkillLevel] = useState<SkillLevel | null>(null)
  const [studyPlan, setStudyPlan] = useState<StudyPlan>([])
  const [completedTopics, setCompletedTopics] = useState<string[]>([])
  const [activeView, setActiveView] = useState<View>('study')
  const [isPlanManagerOpen, setIsPlanManagerOpen] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const storedSkillLevel = localStorage.getItem('skillLevel') as SkillLevel | null
    const storedStudyPlan = localStorage.getItem('studyPlan')
    const storedCompletedTopics = localStorage.getItem('completedTopics')

    if (storedSkillLevel) {
      setSkillLevel(storedSkillLevel)
      if (storedStudyPlan) {
        setStudyPlan(JSON.parse(storedStudyPlan))
      } else {
        setStudyPlan(STUDY_PLANS[storedSkillLevel])
      }
      if (storedCompletedTopics) {
        setCompletedTopics(JSON.parse(storedCompletedTopics))
      }
    }
  }, [])
  
  const handleSelectSkill = (level: SkillLevel) => {
    const newPlan = STUDY_PLANS[level]
    setSkillLevel(level)
    setStudyPlan(newPlan)
    setCompletedTopics([])
    localStorage.setItem('skillLevel', level)
    localStorage.setItem('studyPlan', JSON.stringify(newPlan))
    localStorage.setItem('completedTopics', JSON.stringify([]))
  }

  const handleSavePlan = (newPlan: StudyPlan) => {
    setStudyPlan(newPlan)
    localStorage.setItem('studyPlan', JSON.stringify(newPlan))
  }

  const handleMarkAsDone = (topicId: string) => {
    setCompletedTopics(prev => {
      const newCompleted = prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
      localStorage.setItem('completedTopics', JSON.stringify(newCompleted))
      return newCompleted
    })
  }
  
  const handleLogout = () => {
    localStorage.clear()
    setSkillLevel(null)
    setStudyPlan([])
    setCompletedTopics([])
  }

  const memoizedStudyPlan = useMemo(() => studyPlan, [studyPlan])

  if (!isClient) {
    return null
  }

  if (!skillLevel) {
    return <SkillSelector onSelect={handleSelectSkill} />
  }

  const renderContent = () => {
    switch (activeView) {
      case 'study':
        return (
          <div className="h-full w-full overflow-y-auto snap-y snap-mandatory">
            {memoizedStudyPlan.length > 0 ? (
              memoizedStudyPlan.map(topic => (
                <StudyCard
                  key={topic.id}
                  topic={topic}
                  onMarkAsDone={handleMarkAsDone}
                  isDone={completedTopics.includes(topic.id)}
                />
              ))
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <h2 className="text-2xl font-semibold">Your Study Plan is Empty!</h2>
                    <p className="text-muted-foreground mt-2">Click "Edit Plan" to add some topics.</p>
                    <Button onClick={() => setIsPlanManagerOpen(true)} className="mt-4">
                        Edit Plan
                    </Button>
                </div>
            )}
          </div>
        )
      case 'progress':
        return <ProgressTracker studyPlan={memoizedStudyPlan} completedTopics={completedTopics} />
      case 'practice':
        return <PracticeProblemSuggestor studiedTopics={memoizedStudyPlan} />
      default:
        return null
    }
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-primary">StudyReels</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveView('study')}
                isActive={activeView === 'study'}
              >
                <BookOpen />
                Study
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveView('progress')}
                isActive={activeView === 'progress'}
              >
                <LineChart />
                Progress
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveView('practice')}
                isActive={activeView === 'practice'}
              >
                <ListTodo />
                Practice
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <Button variant="outline" onClick={() => setIsPlanManagerOpen(true)}>
             <Settings className="mr-2 h-4 w-4" /> Edit Plan
           </Button>
           <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col h-screen">
         <header className="flex items-center justify-between p-2 border-b">
           <SidebarTrigger />
           <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{skillLevel}</span>
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="person user"/>
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
           </div>
         </header>
        <main className="flex-grow overflow-hidden">
          {renderContent()}
        </main>
      </SidebarInset>
      <StudyPlanManager
        isOpen={isPlanManagerOpen}
        onOpenChange={setIsPlanManagerOpen}
        currentPlan={memoizedStudyPlan}
        onSave={handleSavePlan}
      />
    </SidebarProvider>
  )
}
