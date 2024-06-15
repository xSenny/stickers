'use client'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'



const InputAndSavedButton = () => {
  const [param, setParam] = useState('')
  const searchParams = useSearchParams()    
  const router = useRouter()

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = ''
      if (param) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: param
        })
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['query']
        })
      }
      router.push(newUrl, {scroll: false})
    }, 300)
    return () => clearTimeout(delayDebounceFn)
  }, [param, searchParams, router])
  return (
    <div className="w-full px-8 md:px-28 flex gap-4">
      <input placeholder='Search and use stickers' value={param} onChange={(e) => setParam(e.target.value)} className="w-full py-4 px-5 rounded-lg border-2 border-designPrimary"/>
      <Sheet>
        <SheetTrigger>
          <div className="w-full py-2 px-3 rounded-lg border-2 border-designPrimary">
            <Image src={'/assets/icons/bookmark.png'} width={40} height={40} alt="bookmark"/>
          </div>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Your saved stickers</SheetTitle>
            <SheetDescription>
              Here are your saved stickers
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default InputAndSavedButton
