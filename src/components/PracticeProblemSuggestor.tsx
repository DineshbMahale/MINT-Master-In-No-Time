"use client"

import { useState } from "react"
import { Loader2, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { suggestPracticeProblems, SuggestPracticeProblemsOutput } from "@/ai/flows/suggest-practice-problems"
import type { Topic } from "@/lib/types"

interface PracticeProblemSuggestorProps {
  studiedTopics: Topic[]
}

export function PracticeProblemSuggestor({ studiedTopics }: PracticeProblemSuggestorProps) {
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<SuggestPracticeProblemsOutput | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSuggestProblems = async () => {
    setLoading(true)
    setError(null)
    setSuggestions(null)
    try {
      const topicTitles = studiedTopics.map(t => t.title)
      if (topicTitles.length === 0) {
        setError("Please add some topics to your study plan first.")
        return;
      }
      const result = await suggestPracticeProblems({ studiedTopics: topicTitles })
      setSuggestions(result)
    } catch (e) {
      setError("Failed to generate suggestions. Please try again.")
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const getBadgeVariant = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy': return 'default'
      case 'medium': return 'secondary'
      case 'hard': return 'destructive'
    }
  }

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Smart Practice Suggestions</CardTitle>
          <CardDescription>Get LeetCode-style problem suggestions based on your study plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSuggestProblems} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Suggest Problems
              </>
            )}
          </Button>
          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>

      {suggestions && suggestions.problems.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-2xl font-bold tracking-tight">Suggested Problems</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {suggestions.problems.map((problem, index) => (
              <a href={problem.link} target="_blank" rel="noopener noreferrer" key={index} className="block">
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-lg">{problem.title}</CardTitle>
                    <Badge variant={getBadgeVariant(problem.difficulty)} className="w-fit">{problem.difficulty}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Relevant Topic: {problem.topic}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
