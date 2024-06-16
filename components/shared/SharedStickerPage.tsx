'use client'
import { useEffect } from "react";
import {useRouter} from "next/navigation"

const SharedStickerPage = () => {

  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 10000)
  })

  return (
    <div className="flex w-full h-full justify-center flex-col items-center">
      <h1 className="text-center text-[24px] font-bold">Most probably a friend sent you here. <br /> Browse through our sticker collection, or upload some of your stickers</h1>
      <p className="mb-4 text-center">You are gonna be redirected in 10 seconds...</p>
      <img src={'/assets/illustrations/welcome.svg'}/>
    </div>
  )
}

export default SharedStickerPage;