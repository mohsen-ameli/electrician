import { articleType } from "@/lib/types"
import Link from "next/link"
import React from "react"

export default function page() {
  const articlesTypes: articleType[] = ["blog", "residential", "commercial"]

  return (
    <div className="m-8 flex flex-col gap-8">
      {articlesTypes.map(type => (
        <Link key={type} href={`/article/${type}`}>
          <div className="w-full cursor-pointer rounded-xl bg-slate-800 p-8 text-center text-2xl capitalize text-white">
            Go to {type + "s"}
          </div>
        </Link>
      ))}
    </div>
  )
}
