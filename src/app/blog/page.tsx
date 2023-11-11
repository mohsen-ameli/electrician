import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { db } from "@/db/drizzle-db"
import limitString from "@/lib/limit-string"
import Link from "next/link"
import ShareButton from "./share"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Echo Power Electric | Blog",
  description: "Read about our work, learn more about our profession.",
}

export default async function Blog() {
  const allBlogs = await db.query.blogs.findMany()

  return (
    <div className="container">
      <Header
        title="Blogs"
        description="Read about our blogs and subscribe to our newsletter to receive them via email."
      />

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
