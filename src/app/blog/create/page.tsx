"use client"

import Loading from "@/components/loading"
import { submitAction, validateBlog } from "./action"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"

export default function page() {
  const [loading, setLoading] = useState(false)

  async function submit(form: FormData) {
    const data = await validateBlog(form.get("title") as string)
    if (data.error) {
      toast({ title: "Validation failed!", description: data.error })
      return setLoading(false)
    }

    const res = await submitAction(form)
    if (res.error) {
      toast({ title: "An error happened!", description: res.error })
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={() => setLoading(true)}
      action={submit}
      className="container space-y-6 p-8"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="image">
          Image <span className="text-red-500">*</span>
        </label>
        <input type="file" name="image" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="title">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          required
          className="rounded-md border-2 border-black p-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="content">
          Content <span className="text-red-500">*</span>
        </label>
        <textarea
          name="content"
          required
          className="min-h-[200px] rounded-md border-2 border-black p-2"
        />
      </div>

      <Button
        variant="hover"
        className="w-full"
        type="submit"
        disabled={loading}
      >
        {loading ? <Loading /> : "Add Blog"}
      </Button>
    </form>
  )
}
