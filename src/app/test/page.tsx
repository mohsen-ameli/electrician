"use client"

import { useEffect, useState } from "react"

export default function Test() {
  const [data, setData] = useState(null)
  const [data2, setData2] = useState(null)

  async function getData() {
    const res = await fetch("/api/test")
    const data = await res.json()
    console.log(data)
    setData(data)
  }
  async function getData2() {
    const res = await fetch(process.env.NEXT_PUBLIC_HOST + "/api/test")
    const data = await res.json()
    console.log("data2", data)
    setData2(data)
  }
  useEffect(() => {
    getData()
    getData2()
  }, [])

  return (
    <>
      <div>data: {JSON.stringify(data)}</div>
      <br />
      <div>data2: {JSON.stringify(data2)}</div>
    </>
  )
}
