import React from "react"

export default function Header({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="mx-auto my-8 w-fit space-y-4 border-b-4 border-yellow-400 pb-4 text-center">
      <div className="text-4xl font-bold capitalize">{title}</div>
      {description && <p className="mx-auto lg:w-[50%]">{description}</p>}
    </div>
  )
}
