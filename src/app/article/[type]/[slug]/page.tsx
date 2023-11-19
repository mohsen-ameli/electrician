import prisma from "@/db/prisma-db"
import { Button } from "@/components/ui/button"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { isAuthenticated } from "@/lib/is-authenticated"
import DeleteArticle from "./delete-article"
import ShareButton from "../share"

export async function generateStaticParams() {
  const articles = await prisma.article.findMany()
  return articles.map(article => ({
    type: article.type,
    slug: article.slug,
  }))
}

export default async function page({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const article = await prisma.article.findUnique({ where: { slug } })
  const authenticated = await isAuthenticated()

  if (!article) {
    return <div>Article not found</div>
  }

  return (
    <div className="container mt-8 px-32 py-8">
      <div className="rounded-xl bg-slate-300 p-8 dark:bg-slate-700">
        {article.image && (
          <div className="relative mb-6 h-[400px] w-full">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        )}
        <h1 className="flex items-center justify-between text-5xl font-semibold">
          {article.title}
          <div className="flex items-center gap-x-4">
            {authenticated && <DeleteArticle slug={article.slug} />}
            <ShareButton title={article.title} />
          </div>
        </h1>
        <p className="mb-8 mt-2">
          {new Date(article.createdAt).toLocaleString("default", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p className="leading-loose">{article.content}</p>
        <div className="mt-8 flex items-center gap-x-4">
          <Link href={`/article/${article.type}/`}>
            <Button>Go Back</Button>
          </Link>
          <ShareButton title={article.title} />
        </div>
      </div>
    </div>
  )
}
