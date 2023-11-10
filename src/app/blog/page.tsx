import Header from "@/components/header"
import SendButton from "@/components/send-button"
import { Button } from "@/components/ui/button"
import { db } from "@/db/drizzle-db"
import { blogs } from "@/db/schema"
import limitString from "@/lib/limit-string"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import ShareButton from "./share"
import { Metadata } from "next"
import { authenticate } from "./action"

export const metadata: Metadata = {
  title: "Echo Power Electric | Blog",
  description: "Read about our work, learn more about our profession.",
}

export default async function Blog() {
  const allBlogs = await db.query.blogs.findMany()
  const authenticated = await authenticate()

  async function addBlog(e: FormData) {
    "use server"

    const title = e.get("title") as string
    const content = e.get("content") as string
    const slug = title.toLowerCase().replace(/\s/g, "-")
    const date = Date.now()
    await db.insert(blogs).values({ slug, title, content, date })
    revalidatePath("/blog")
  }

  return (
    <div className="container">
      <Header
        title="Blogs"
        description="Read about our blogs and subscribe to our newsletter to receive them via email."
      />

      {authenticated && (
        <form action={addBlog} className="space-y-6 pb-8">
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
      )}

      <div className="flex flex-col gap-8">
        {allBlogs.map(blog => (
          <div
            className="dark:bg-slate-700 bg-slate-300 p-8 rounded-xl space-y-4"
            key={blog.slug}
          >
            <h1 className="text-4xl font-semibold">{blog.title}</h1>
            <p>
              {new Date(blog.date).toLocaleString("default", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p>{limitString(blog.content, 50)}</p>
            <div className="flex items-center gap-x-4 mt-4">
              <Link href={`/blog/${blog.slug}/`}>
                <Button>Read More</Button>
              </Link>
              <ShareButton title={blog.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
