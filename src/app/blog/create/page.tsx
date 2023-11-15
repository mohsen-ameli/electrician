import SendButton from "@/components/send-button"
import { authenticate } from "@/lib/authenticate"
import { redirect } from "next/navigation"
import prisma from "@/db/prisma-db"

export default async function CreateBlog() {
  const authenticated = await authenticate()
  if (!authenticated) redirect("/blog")

  async function addBlog(form: FormData) {
    "use server"

    const title = form.get("title") as string
    const content = form.get("content") as string
    const slug = title.toLowerCase().replace(/\s/g, "-")
    const createdAt = new Date()
    await prisma.blogs.create({ data: { slug, title, content, createdAt } })
    redirect("/blog/" + slug)
  }

  return (
    <form action={addBlog} className="container space-y-6 p-8">
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

      <SendButton
        actionText="Add Blog"
        pendingText="Adding Blog"
        doneText="Blog Added"
      />
    </form>
  )
}
