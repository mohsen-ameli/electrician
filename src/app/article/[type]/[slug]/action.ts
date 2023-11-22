"use server"

import { getS3Url, s3Upload } from "../../create/action"
import prisma from "@/db/prisma-db"

export async function updateArticle(formData: FormData) {
  const file = formData.get("image") as File | string
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const slug = formData.get("slug") as string
  const newSlug = title.toLowerCase().replace(/\s/g, "-")
  let image = await getS3Url((file as File).name)

  // Checking if the image already exists on AWS, in which case we don't need to upload it
  const duplicate = (await fetch(image)).ok

  if (file !== "") {
    if (!duplicate) {
      const res = await s3Upload(file as File)
      if (!res.success) {
        return {
          error: res.error,
          success: false,
        }
      }
      image = res.url
    }
    await prisma.article.update({
      where: { slug },
      data: {
        title,
        content,
        slug: newSlug,
        image,
        createdAt: new Date(),
      },
    })
  } else {
    try {
      await prisma.article.update({
        where: { slug },
        data: {
          title,
          content,
          slug: newSlug,
          createdAt: new Date(),
        },
      })
    } catch (e) {
      console.log(e)
    }
  }

  return {
    error: "",
    success: true,
  }
}
