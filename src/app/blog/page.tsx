import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import limitString from "@/lib/limit-string"
import Link from "next/link"
import ShareButton from "./share"
import { Metadata } from "next"
import prisma from "@/db/prisma-db"

export const metadata: Metadata = {
  title: "Echo Power Electric | Blog",
  description: "Read about our work, learn more about our profession.",
}

export const revalidate = 10

export default async function Blog() {
  const blogs = await prisma.blog.findMany()

  return (
    <div className="container">
      <Header
        title="Blogs"
        description="Read about our blogs and subscribe to our newsletter to receive them via email."
      />

      <div className="flex flex-col gap-8">
        {blogs.map(blog => (
          <div
            className="space-y-4 rounded-xl bg-slate-300 p-8 dark:bg-slate-700"
            key={blog.slug}
          >
            <h1 className="text-4xl font-semibold">{blog.title}</h1>
            <p>
              {new Date(blog.createdAt).toLocaleString("default", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p>{limitString(blog.content, 50)}</p>
            <div className="mt-4 flex items-center gap-x-4">
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
