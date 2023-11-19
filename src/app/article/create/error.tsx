"use client"

import { Button } from "@/components/ui/button"

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="container space-y-8 py-8 text-center">
      <h1 className="text-2xl font-bold">You were unable to authenticate.</h1>
      <Button onClick={reset}>Go back</Button>
    </div>
  )
}
