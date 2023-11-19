import { Prisma } from "@prisma/client"

export type articleType = Prisma.articleGetPayload<{
  select: { type: true }
}>["type"]
