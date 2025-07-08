"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ALL_TOPICS } from "@/lib/data"
import type { Topic } from "@/lib/types"
import { useState } from "react"
import { groupBy } from "lodash"

interface StudyPlanManagerProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  currentPlan: Topic[]
  onSave: (newPlan: Topic[]) => void
}

export function StudyPlanManager({ isOpen, onOpenChange, currentPlan, onSave }: StudyPlanManagerProps) {
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>(currentPlan.map(t => t.id))

  const handleToggleTopic = (topicId: string, checked: boolean) => {
    setSelectedTopicIds(prev =>
      checked ? [...prev, topicId] : prev.filter(id => id !== topicId)
    )
  }

  const handleSave = () => {
    const newPlan = ALL_TOPICS.filter(t => selectedTopicIds.includes(t.id))
    onSave(newPlan)
    onOpenChange(false)
  }

  const topicsByCategory = groupBy(ALL_TOPICS, 'category')

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-xl">
        <DialogHeader>
          <DialogTitle>Customize Your Study Plan</DialogTitle>
          <DialogDescription>
            Select the topics you want to focus on. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96 pr-6">
          <div className="space-y-4">
            {Object.entries(topicsByCategory).map(([category, topics]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold mb-2">{category}</h3>
                <div className="space-y-2">
                  {topics.map(topic => (
                    <div key={topic.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={topic.id}
                        checked={selectedTopicIds.includes(topic.id)}
                        onCheckedChange={(checked) => handleToggleTopic(topic.id, !!checked)}
                      />
                      <Label htmlFor={topic.id} className="flex-1 cursor-pointer">{topic.title}</Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
