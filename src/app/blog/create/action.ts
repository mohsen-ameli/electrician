"use server"

import { S3 } from "aws-sdk"
import { redirect } from "next/navigation"
import prisma from "@/db/prisma-db"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

async function s3Upload(file: File) {
  const s3 = new S3({
    region: "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: "v4",
  })

  try {
    const fileParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: file.name,
      ContentType: file.type, // image
    }

    const url = await s3.getSignedUrlPromise("putObject", fileParams)
    await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    })

    return {
      error: null,
      success: true,
      url: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${file.name}`,
    }
  } catch (error) {
    return {
      error: "An error occurred while uploading your image.",
      success: false,
      url: "",
    }
  }
}

async function addBlog(
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

export async function submitAction(formData: FormData) {
  const file = formData.get("image") as File
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const slug = title.toLowerCase().replace(/\s/g, "-")

  const image = await s3Upload(file)

  if (!image.success)
    return {
      error: image.error,
      success: false,
    }

  const res = await addBlog(slug, title, content, image.url)
  if (!res.success)
    return {
      error: res.error,
      success: false,
    }

  redirect(`/blog/${slug}/`)
}

export async function validateBlog(title: string) {
  const slug = title.toLowerCase().replace(/\s/g, "-")

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
