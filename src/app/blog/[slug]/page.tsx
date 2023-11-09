import { db } from "@/db/drizzle-db"
import { blogs } from "@/db/schema"
import { eq } from "drizzle-orm"
import React from "react"
import ShareButton from "../share"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function page({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const blog = await db.query.blogs.findFirst({
    where: eq(blogs.slug, slug),
  })

  if (!blog) {
    return <div>Blog not found</div>
  }

  return (
    <div className="container mt-8 py-8 px-32">
      <div className="bg-slate-100 dark:bg-slate-800 p-12 rounded-xl">
        <h1 className="text-5xl font-semibold flex justify-between items-center">
          {blog.title} <ShareButton title={blog.title} />
        </h1>
        <p className="mt-2 mb-8">
          {new Date(blog.date).toLocaleString("default", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p className="leading-loose">{blog.content}</p>
        <div className="flex items-center gap-x-4 mt-8">
          <Link href="/blog">
            <Button>Go Back</Button>
          </Link>
          <ShareButton title={blog.title} />
        </div>
      </div>
    </div>
  )
}
