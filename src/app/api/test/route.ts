import { signUp } from "@/lib/create-admin"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  // Use this to create an admin user for testing purposes
  const admin = await signUp("username", "password", "email@email.com")
  return NextResponse.json(admin)
  // const blogs = await db.query.blogs.findMany()
  // const { searchParams } = new URL(req.url)
  // const username = searchParams.get("username")
  // const blogs = await db.execute(sql`CREATE TABLE IF NOT EXISTS "admin" (
  //   "id" serial PRIMARY KEY NOT NULL,
  //   "username" varchar(256) NOT NULL,
  //   "password" varchar(256) NOT NULL,
  //   CONSTRAINT "admin_username_unique" UNIQUE("username")
  // );`)
  // await db.insert(users).values({
  //   username: ".",
  //   password: await hash(".", 10),
  // })
  // const a = await db.execute(
  //   sql`SELECT * FROM admin WHERE username = ${username};`
  // )
  // const blogs = await prisma.blog.findMany()
  // await prisma.admin.create({
  //   data: {
  //     username: "",
  //     email: "",
  //     password: await hash("", 10),
  //   },
  // })
  // await prisma.blog.create({
  //   data: {
  //     slug: "test-title",
  //     content:
  //       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et, esse?",
  //     title: "test-title",
  //   },
  // })
  // await prisma.$executeRaw`DROP TABLE blog;`
  // await addBlog("Hello", "Hello", "shdfsd", "lsjdf")
  // return NextResponse.json({})
}
