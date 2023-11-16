"use client"

import type { FileWithPath } from "@uploadthing/react"
import { useDropzone } from "@uploadthing/react/hooks"
import { generateClientDropzoneAccept } from "uploadthing/client"
import { useUploadThing } from "@/lib/uploadthing"
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"

type Stage = "idle" | "complete" | "error"

export default function Upload({
  start,
  setUrl,
  setProgress,
}: {
  start: boolean
  setUrl: Dispatch<SetStateAction<string | null>>
  setProgress: Dispatch<SetStateAction<number>>
}) {
  const [files, setFiles] = useState<File[]>([])
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles)
  }, [])
  const [stage, setStage] = useState<Stage>("idle")

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: () => {
        setStage("complete")
      },
      onUploadError: () => {
        setStage("error")
      },
      onUploadProgress: p => {
        setProgress(p)
        console.log("progress", p)
      },
    }
  )

  useEffect(() => {
    async function upload() {
      const res = await startUpload(files)
      res && setUrl(res[0].url)
    }
    if (start) upload()
  }, [start])

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : []

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  })

  if (stage === "complete") {
    return <h1>Image uploaded successfully!</h1>
  } else if (stage === "error") {
    return <h1>There was an error uploading your image.</h1>
  } else if (isUploading) {
    return <></>
  } else if (files.length > 0) {
    return <h1 className="pb-4">Image selected!</h1>
  }

  return (
    <div {...getRootProps()} className="mb-4">
      <label htmlFor="image">
        Image <span className="text-red-500">*</span>
      </label>
      <input {...getInputProps()} name="image" />
      <div className="mt-2 cursor-pointer rounded-lg border-2 border-dashed border-white px-4 py-8">
        Click or Drop your images here!
      </div>
    </div>
  )
}
