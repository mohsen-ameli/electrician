import { articleType } from "@/lib/types"
import Link from "next/link"
import React from "react"

export default function page() {
  const articlesTypes: articleType[] = ["blog", "residential", "commercial"]

  return (
    <>
      {JSON.stringify(articlesTypes)}
      {articlesTypes.map(type => (
        <div key={type}>
          <h1>{type}</h1>
          <Link href={`/article/${type}`}>{type}</Link>
        </div>
      ))}
    </>
  )
}
