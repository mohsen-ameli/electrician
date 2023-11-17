"use server"

import prisma from "@/db/prisma-db"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export async function addBlog(
  slug: string,
  title: string,
  content: string,
  image: string
) {
  const createdAt = new Date()

  try {
    await prisma.blog.create({
      data: { slug, title, content, createdAt, image },
    })
    return {
      success: true,
      error: "",
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // @ts-ignore
      if (error.meta.target[0] === "slug" || error.meta.target[0] === "title") {
        return {
          success: false,
          error: "A blog with that title already exists.",
        }
      }
    }
    return {
      success: false,
      error: "An unknown error occurred. Please contact Noob.",
    }
  }
}

export async function validateBlog(slug: string) {
  const alreadyExists = await prisma.blog.findUnique({
    where: { slug },
  })
  if (alreadyExists) {
    return {
      success: false,
      error: "A blog with that title already exists.",
    }
  } else {
    return {
      success: true,
      error: "",
    }
  }
}
