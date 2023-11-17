"use client"

import Upload from "./upload"
import { Suspense, useEffect, useRef, useState } from "react"
import { addBlog, validateBlog } from "./action"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import Loading from "@/components/loading"

export default function CreateBlog() {
  const router = useRouter()

  const [start, setStart] = useState(false)
  const [url, setUrl] = useState<string | null>(null)
  const [selected, setSelected] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = useRef<HTMLInputElement>(null!)
  const content = useRef<HTMLTextAreaElement>(null!)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!selected) {
      toast({ title: "Please upload an image" })
    } else {
      setLoading(true)
      const res = await validateBlog(makeSlug(title.current.value))

      if (res.error) {
        setLoading(false)
        return toast({ title: "Validation failed!", description: res.error })
      } else {
        setStart(true)
        setOpen(true)
      }
    }
  }

  useEffect(() => {
    async function add() {
      if (!url) {
        setLoading(false)
        return alert("Please upload an image")
      }

      const title_ = title.current.value
      const content_ = content.current.value
      const slug = makeSlug(title_)

      const res = await addBlog(slug, title_, content_, url)

      if (res.success) {
        router.push(`/blog/${slug}/`)
        return
      } else {
        toast({
          title: "Blog creation failed!",
          description: res.error,
        })
        setOpen(false)
        setProgress(0)
        setLoading(false)
      }
    }
    if (url) add()
  }, [url])

  return (
    <form onSubmit={submit} className="container space-y-6 p-8">
      <div className="flex flex-col gap-1">
        <Suspense fallback={<>Something went really wrong!</>}>
          <Upload
            start={start}
            setUrl={setUrl}
            setProgress={setProgress}
            setSelected={setSelected}
          />
        </Suspense>
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

      <Button
        variant="hover"
        className="w-full"
        type="submit"
        disabled={loading}
      >
        {loading ? <Loading center={false} /> : "Add Blog"}
      </Button>

      <dialog open={open} onClose={() => setOpen(false)}>
        <div className="fixed inset-0 grid place-content-center bg-black/75">
          <div className="w-full rounded-xl border-2 bg-black p-4 shadow-lg lg:w-[400px]">
            <div className="space-y-4 p-4">
              <Progress value={progress} />
              <div className="text-center">Uploading your image...</div>
            </div>
          </div>
        </div>
      </dialog>
    </form>
  )
}

function makeSlug(title: string) {
  return title.toLowerCase().replace(/\s/g, "-")
}
