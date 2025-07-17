"use client"

import { Check, Facebook, Link, Share2, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

export default function ShareButton({ title }: { title: string }) {
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        setClicked(false)
      }, 2000)
    }
  }, [clicked])

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href)
    setClicked(true)
  }

  function shareTwitter() {
    const url = `https://twitter.com/intent/tweet?url=${window.location.href}?spref%3Dtw&text=Echo+Power+Electric:+${title}`
    window.open(url, "_blank")
    setClicked(true)
  }

  function shareFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
    window.open(url, "_blank")
    setClicked(true)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {clicked ? <Check color="green" /> : <Share2 />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={copyToClipboard}>
            <Link className="mr-2 h-8 w-5" />
            <span className="capitalize">copy to clipboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareFacebook}>
            <Facebook className="mr-2 h-8 w-5" />
            <span className="capitalize">share on facebook</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareTwitter}>
            <Twitter className="mr-2 h-8 w-5" />
            <span className="capitalize">share on twitter</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
