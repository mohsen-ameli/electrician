"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useFormStatus } from "react-dom"

export default function SendButton({
  actionText,
  pendingText,
  doneText,
}: {
  actionText: string
  pendingText: string
  doneText: string
}) {
  const { pending } = useFormStatus()
  const count = useRef(0)

  useEffect(() => {
    count.current++
    setTimeout(() => {
      count.current = 0
    }, 5000)
  }, [pending])

  return (
    <Button
      className="w-full"
      variant="hover"
      type="submit"
      disabled={count.current !== 0 || pending}
    >
      {pending ? (
        pendingText
      ) : count.current === 0 ? (
        actionText
      ) : (
        <div className="flex items-center gap-x-2 text-green-400">
          <Check /> {doneText}
        </div>
      )}
    </Button>
  )
}
