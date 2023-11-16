"use server"

import prisma from "@/db/prisma-db"

export default async function addBlog(
  slug: string,
  title: string,
  content: string,
  image: string
) {
  const createdAt = new Date()

  await prisma.blog.create({
    data: { slug, title, content, createdAt, image },
  })
}
