import { createUploadthing, type FileRouter } from "uploadthing/next"
import { cookies } from "next/headers"
import { isAuthenticated } from "@/lib/is-authenticated"

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const authenticated = await isAuthenticated()
      if (!authenticated)
        throw new Error("You are unauthorized! Get outta here!")
      return {}
    })
    .onUploadComplete(async ({ metadata, file }) => {
      cookies().set("image", file.url)
      // Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return file
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
