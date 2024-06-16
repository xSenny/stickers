'use client'

import { Separator } from "@/components/ui/separator"
import Image from "next/image";

const Landing = () => {
  return (
    <div className="w-full flex-col flex items-center mt-14 sm:mt-0">
      <div className="mb-24 w-full flex flex-col sm:flex-row justify-between items-center">
        <div className="ml-10">
          <h1 className="font-black text-[20px] md:text-[48px]">Stick ‘Em Up! <br />
          Your Ultimate Sticker Swap Meet</h1>
          <p className="text-[#8F6A6A] text-[15px] md:text-[24px]">Join the fun and slap some stickers on your digital life!</p>
        </div>
        <img className="image" alt="Illustration"/>
      </div>
      <Separator className="w-[80%] border-2 mb-12 border-designPrimary"/>
    </div>
  )
}

export default Landing;