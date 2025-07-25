import { articleType } from "@/lib/types"
import prisma from "@/lib/prisma"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import limitString from "@/lib/limit-string"
import Link from "next/link"
import { Metadata } from "next"
import Image from "next/image"
import ShareButton from "./share-button"

export const metadata: Metadata = {
  title: "Echo Power Electric | Articles",
  description: "Read about our work, learn more about our profession.",
}

export const revalidate = 10

const articlesTypes: articleType[] = ["blog", "residential", "commercial"]

export async function generateStaticParams() {
  return articlesTypes.map(type => ({ type }))
}

export default async function page({
  params,
}: {
  params: Promise<{
    type: articleType
  }>
}) {
  const { type } = await params
  if (!articlesTypes.includes(type)) {
    return <div>404</div>
  }

  const articles = await prisma.article.findMany({
    where: { type: type },
  })

  return (
    <div className="container mx-auto px-4 lg:px-20 lg:pt-8">
      <Header
        title={type + "s"}
        // description="Read about our blogs and subscribe to our newsletter to receive them via email."
      />

      <div className="grid gap-8 lg:grid-cols-3">
        {articles.map(article => (
          <div
            className="space-y-4 rounded-xl bg-slate-300 p-6 dark:bg-slate-700"
            key={article.slug}
          >
            {article.image && (
              <div className="relative h-[200px] w-full">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
            )}
            <h1 className="text-4xl font-semibold">{article.title}</h1>
            <p>
              {new Date(article.createdAt).toLocaleString("default", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p>{limitString(article.content, 20)}</p>
            <div className="mt-4 flex items-center gap-x-4">
              <Link href={`/article/${type}/${article.slug}/`}>
                <Button>Read More</Button>
              </Link>
              <ShareButton title={article.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
