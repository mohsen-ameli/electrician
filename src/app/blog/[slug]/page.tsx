import prisma from "@/db/prisma-db"
import { Button } from "@/components/ui/button"
import React from "react"
import ShareButton from "../share"
import Link from "next/link"
import Image from "next/image"
import { isAuthenticated } from "@/lib/is-authenticated"
import DeleteBlog from "./delete-blog"

export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany()
  return blogs.map(blog => ({
    slug: blog.slug,
  }))
}

export default async function page({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const blog = await prisma.blog.findUnique({ where: { slug } })
  const authenticated = await isAuthenticated()

  if (!blog) {
    return <div>Blog not found</div>
  }

  return (
    <div className="container mt-8 px-32 py-8">
      <div className="rounded-xl bg-slate-300 p-8 dark:bg-slate-700">
        <div className="relative mb-6 h-[400px] w-full">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <h1 className="flex items-center justify-between text-5xl font-semibold">
          {blog.title}
          <div className="flex items-center gap-x-4">
            {authenticated && <DeleteBlog slug={blog.slug} />}
            <ShareButton title={blog.title} />
          </div>
        </h1>
        <p className="mb-8 mt-2">
          {new Date(blog.createdAt).toLocaleString("default", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p className="leading-loose">{blog.content}</p>
        <div className="mt-8 flex items-center gap-x-4">
          <Link href="/blog">
            <Button>Go Back</Button>
          </Link>
          <ShareButton title={blog.title} />
        </div>
      </div>
    </div>
  )
}
