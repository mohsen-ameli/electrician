"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useEffect, useRef } from "react"
import { useFormStatus } from "react-dom"

export default function SendButton() {
  const { pending } = useFormStatus()
  const count = useRef(0)

  useEffect(() => {
    count.current++
  }, [pending])

  return (
    <Button
      className="w-full"
      variant="hover"
      type="submit"
      disabled={count.current !== 0 || pending}
    >
      {pending ? (
        "Sending..."
      ) : count.current === 0 ? (
        "Send"
      ) : (
        <div className="flex items-center gap-x-2 text-green-400">
          <Check /> Sent!
        </div>
      )}
    </Button>
  )
}
