import React from "react"

export default function Header({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="my-8 border-b-2 border-yellow-400 pb-4 text-center space-y-4">
      <div className="capitalize text-4xl font-bold">{title}</div>
      <p className="w-[50%] mx-auto">{description}</p>
    </div>
  )
}
