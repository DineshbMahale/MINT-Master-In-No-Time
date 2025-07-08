"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { SkillLevel } from "@/lib/types"

interface SkillSelectorProps {
  onSelect: (level: SkillLevel) => void;
}

export function SkillSelector({ onSelect }: SkillSelectorProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Welcome to StudyReels!</CardTitle>
          <CardDescription className="text-lg pt-2">
            To get started, please select your current skill level.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Button
              size="lg"
              className="w-full py-6 text-lg"
              onClick={() => onSelect('Beginner')}
            >
              Beginner
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full py-6 text-lg"
              onClick={() => onSelect('Intermediate')}
            >
              Intermediate
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full py-6 text-lg"
              onClick={() => onSelect('Advanced')}
            >
              Advanced
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
