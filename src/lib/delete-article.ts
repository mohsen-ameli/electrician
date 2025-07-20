"use server"

import prisma from "@/lib/prisma"

export async function deleteArticle(slug: string) {
  try {
    await prisma.article.delete({ where: { slug } })
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
