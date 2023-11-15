import React from "react"

export default function Header({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="my-8 space-y-4 border-b-2 border-yellow-400 pb-4 text-center">
      <div className="text-4xl font-bold capitalize">{title}</div>
      <p className="mx-auto w-[50%]">{description}</p>
    </div>
  )
}
