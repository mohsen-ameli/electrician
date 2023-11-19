"use server"

import prisma from "@/db/prisma-db"

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
