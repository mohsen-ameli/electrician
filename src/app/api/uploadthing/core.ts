import { createUploadthing, type FileRouter } from "uploadthing/next"
import prisma from "@/db/prisma-db"
import { cookies } from "next/headers"

const f = createUploadthing()

const auth = (req: Request) => ({ id: "fakeId" }) // Fake auth function

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req)
      if (!user) throw new Error("Unauthorized")

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      cookies().set("image", file.url)
      // Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return file
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
