import { Prisma } from "../../generated/prisma"

export type articleType = Prisma.articleGetPayload<{
  select: { type: true }
}>["type"]
