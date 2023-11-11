import SendButton from "@/components/send-button"
import { db } from "@/db/drizzle-db"
import { blogs } from "@/db/schema"
import { authenticate } from "@/lib/authenticate"
import { redirect } from "next/navigation"

export default async function CreateBlog() {
  const authenticated = await authenticate()
  if (!authenticated) redirect("/blog")

  async function addBlog(e: FormData) {
    "use server"

    const title = e.get("title") as string
    const content = e.get("content") as string
    const slug = title.toLowerCase().replace(/\s/g, "-")
    const date = Date.now()
    await db.insert(blogs).values({ slug, title, content, date })
    redirect("/blog/" + slug)
  }

  return (
    <form action={addBlog} className="space-y-6 p-8 container">
      <div className="flex flex-col gap-1">
        <label htmlFor="title">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          required
          className="border-2 border-black rounded-md p-2"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="content">
          Content <span className="text-red-500">*</span>
        </label>
        <textarea
          name="content"
          required
          className="border-2 border-black rounded-md p-2 min-h-[200px]"
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
