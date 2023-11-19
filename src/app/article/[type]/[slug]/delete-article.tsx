"use client"

import Loading from "@/components/loading"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { deleteArticle } from "@/lib/delete-article"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function DeleteArticle({ slug }: { slug: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null!)

  useEffect(() => {
    dialog.current.addEventListener("click", e => {
      const dialogDimensions = dialog.current.getBoundingClientRect()

      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialog.current.close()
      }
    })
  }, [])

  async function confirm() {
    setLoading(true)

    const data = await deleteArticle(slug)

    if (data.success) {
      router.push("/article/")
      toast({ title: "Article deleted successfully." })
    } else {
      toast({
        title: "An error happened.",
        content: data.error,
      })
    }
    setLoading(false)
  }

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete Article
      </Button>
      <dialog open={open} onClose={() => setOpen(false)} ref={dialog}>
        <div className="fixed inset-0 grid place-content-center bg-white/50 dark:bg-black/75">
          <div className="w-full space-y-4 rounded-xl border-2 bg-white p-6 shadow-lg dark:bg-black lg:w-[400px]">
            <h1 className="text-xl">
              Are you sure you want to delete this article?
            </h1>
            <div className="flex items-center justify-end gap-x-4">
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                variant="destructive"
                onClick={() => confirm()}
                disabled={loading}
              >
                {loading ? <Loading /> : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}
