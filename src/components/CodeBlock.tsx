"use client"

import { useState } from "react"
import { Check, Clipboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [hasCopied, setHasCopied] = useState(false)
  const { toast } = useToast()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setHasCopied(true)
      toast({ title: "Copied to clipboard!" })
      setTimeout(() => setHasCopied(false), 2000)
    })
  }

  return (
    <div className="relative my-4">
      <div className="absolute top-2 right-2">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
          onClick={copyToClipboard}
        >
          {hasCopied ? <Check size={16} /> : <Clipboard size={16} />}
        </Button>
      </div>
      <pre className="p-4 bg-gray-900 rounded-lg overflow-x-auto">
        <code className="font-code text-sm text-white">{code}</code>
      </pre>
    </div>
  )
}
