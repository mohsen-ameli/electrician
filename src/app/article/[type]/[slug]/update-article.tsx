"use client"

import Loading from "@/components/loading"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { updateArticle } from "./action"
import { ScrollArea } from "@/components/ui/scroll-area"
import { article } from "../../../../../generated/prisma"

export default function UpdateArticle({ article }: { article: article }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null!)
  const rect = useRef<HTMLDivElement>(null!)
  const inputRef = useRef<HTMLInputElement>(null!)
  const [img, setImg] = useState<File | undefined>(
    new File([], article.image || "")
  )
  const [changed, setChanged] = useState(false)

  useEffect(() => {
    dialog.current.addEventListener("click", e => {
      const dialogDimensions = rect.current.getBoundingClientRect()
      const clickedInDialog =
        dialogDimensions.top <= e.clientY &&
        e.clientY <= dialogDimensions.top + dialogDimensions.height &&
        dialogDimensions.left <= e.clientX &&
        e.clientX <= dialogDimensions.left + dialogDimensions.width

      if (!clickedInDialog) setOpen(false)
    })
  }, [])

  async function submit(formData: FormData) {
    setLoading(true)

    formData.append("slug", article.slug)

    if (changed && img) {
      formData.append("image", img)
    } else {
      formData.set("image", "")
    }

    const res = await updateArticle(formData)

    const newSlug = (formData.get("title") as String)
      .toLowerCase()
      .replace(/\s/g, "-")

    if (!res.error) {
      setOpen(false)
      setLoading(false)
      router.push(`/article/${article.type}/${newSlug}`)
      router.refresh()
    } else {
      toast({
        title: "Some error happened",
        content: res.error,
      })
    }
  }

  return (
    <>
      <Button variant="info" onClick={() => setOpen(true)}>
        Update Article
      </Button>
      <dialog open={open} onClose={() => setOpen(false)} ref={dialog}>
        <div className="fixed inset-0 grid place-content-center bg-white/50 dark:bg-black/75">
          <ScrollArea ref={rect}>
            <div className="w-full space-y-4 rounded-xl border-2 bg-white p-6 text-base shadow-lg dark:bg-black lg:w-[600px]">
              <form
                onSubmit={() => setLoading(true)}
                action={submit}
                className="container space-y-6 p-4"
              >
                {article.type === "blog" ? (
                  !changed && img?.name ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-4">
                        Current image:
                        <img
                          width={100}
                          height={100}
                          className="object-fill"
                          src={img.name}
                          alt={img.name}
                        />
                        img
                      </div>
                      <label htmlFor="image">
                        Image <span className="text-red-500">*</span>
                      </label>
                      <input
                        ref={inputRef}
                        onChange={e => {
                          console.log(e.currentTarget.files)
                          setImg(e.currentTarget.files?.[0])
                          setChanged(true)
                        }}
                        type="file"
                        name="image"
                      />
                    </div>
                  ) : (
                    <div className="mb-4 flex items-center gap-4">
                      {`New image: ${img?.name} selected`}
                      <Button
                        className=""
                        variant="destructive"
                        onClick={() => {
                          setImg(new File([], article.image!))
                          setChanged(false)
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  )
                ) : null}

                <div className="flex flex-col gap-1">
                  <label htmlFor="title">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    defaultValue={article.title}
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
                    defaultValue={article.content}
                    className="min-h-[200px] rounded-md border-2 border-black p-2"
                  />
                </div>

                <div className="flex items-center justify-end gap-x-4">
                  <Button variant="info" type="submit" disabled={loading}>
                    {loading ? <Loading /> : "Update"}
                  </Button>
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                </div>
              </form>
            </div>
          </ScrollArea>
        </div>
      </dialog>
    </>
  )
}
