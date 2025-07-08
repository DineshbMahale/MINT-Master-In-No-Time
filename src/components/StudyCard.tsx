"use client"

import { Bell } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Topic } from "@/lib/types"
import { CodeBlock } from "./CodeBlock"
import { useToast } from "@/hooks/use-toast"

interface StudyCardProps {
  topic: Topic
  onMarkAsDone: (topicId: string) => void
  isDone: boolean
}

export function StudyCard({ topic, onMarkAsDone, isDone }: StudyCardProps) {
  const { toast } = useToast()

  const handleSetReminder = () => {
    toast({
      title: "Reminder Set!",
      description: `We'll remind you to study "${topic.title}".`,
    })
  }
  
  return (
    <div className="h-full w-full flex-shrink-0 snap-start flex items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-2xl h-full flex flex-col overflow-hidden shadow-xl animate-in fade-in-50 slide-in-from-bottom-10 duration-500">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold font-headline">{topic.title}</CardTitle>
              <CardDescription className="text-md pt-1">{topic.category}</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={handleSetReminder}>
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto px-6 py-4 text-base leading-relaxed">
          <p>{topic.content}</p>
          {topic.codeSnippet && <CodeBlock code={topic.codeSnippet.code} language={topic.codeSnippet.language} />}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => onMarkAsDone(topic.id)}
            variant={isDone ? "secondary" : "default"}
          >
            {isDone ? "Marked as Done" : "Mark as Done"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
