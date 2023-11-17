"use server"
import prisma from "@/db/prisma-db"

export async function deleteBlog(slug: string) {
  try {
    await prisma.blog.delete({ where: { slug } })
    return {
      error: "",
      success: true,
    }
  } catch (e) {
    return {
      error: "Unable to delete blog.",
      success: false,
    }
  }
}
