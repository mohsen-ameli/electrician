"use client"

import SendButton from "@/components/send-button"
import Upload from "./upload"
import { useEffect, useRef, useState } from "react"
import addBlog from "./action"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

export default function CreateBlog() {
  const router = useRouter()
  const [start, setStart] = useState(false)
  const [url, setUrl] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const title = useRef<HTMLInputElement>(null!)
  const content = useRef<HTMLTextAreaElement>(null!)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStart(true)
  }

  useEffect(() => {
    async function add() {
      if (!url) return alert("Please upload an image")

      const title_ = title.current.value
      const content_ = content.current.value

      const slug = title_.toLowerCase().replace(/\s/g, "-")

      await addBlog(slug, title_, content_, url)
      router.push("/blog/" + slug)
    }
    if (url) add()
  }, [url])

  return (
    <form onSubmit={submit} className="container space-y-6 p-8">
      <div className="flex flex-col gap-1">
        <Upload start={start} setUrl={setUrl} setProgress={setProgress} />
        <label htmlFor="title">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          required
          ref={title}
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
          ref={content}
          className="min-h-[200px] rounded-md border-2 border-black p-2"
        />
      </div>

      <Dialog>
        <DialogTrigger className="w-full">
          <SendButton
            actionText="Add Blog"
            pendingText="Adding Blog"
            doneText="Blog Added"
          />
        </DialogTrigger>
        <DialogContent includeX={false}>
          <DialogHeader>
            <DialogDescription className="space-y-4 pt-2">
              <Progress value={progress} />
              <h1 className="text-center">Uploading your image...</h1>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </form>
  )
}
