'use client'
import React, { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formUrlQuery } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'


const Filter = () => {

  const [value, setValue] = useState('recent')
  const searchParams = useSearchParams()    
  const router = useRouter()

  useEffect(() => {
    let newUrl = ''
    newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'filter',
      value
    })
    router.push(newUrl, {scroll: false})
  }, [value])

  return (
    <div>
      <Select onValueChange={(e) => setValue(e)} defaultValue={value}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">Recent uploaded</SelectItem>
          <SelectItem value="uploaded">Uploaded by you</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>

    </div>
  )
}

export default Filter
