'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { formUrlQuery } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import {Sticker} from '@/types'
import {useState, useEffect} from 'react'


const StickersTable = ({stickersString}: {stickersString: string}) => {
  const searchParams = useSearchParams() 
  const [stickers, setStickers] = useState<Sticker[]>([])
  useEffect(() => {
    setStickers(JSON.parse(stickersString))
  }, [stickersString])
  const router = useRouter()

  const setStickerId = (id: string) => {
    let newUrl = ''
    newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'stickerId',
      value: id
    })
    router.push(newUrl, {scroll: false})
  }
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Stickers</CardTitle>
          <CardDescription>All the uploaded stickers</CardDescription>
        </CardHeader>
        <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Uploader</TableHead>
              <TableHead className="text-right">Create at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stickers.map((s: Sticker, i: any) => {
              const createdAtDate = new Date(s.createdAt)
              const dateKey = `${createdAtDate.getFullYear()}-${(createdAtDate.getMonth() + 1).toString().padStart(2, '0')}-${createdAtDate.getDate().toString().padStart(2, '0')}`;
              return(
                <TableRow className="cursor-pointer" key={i} onClick={() => setStickerId(s._id)}>
                  <TableCell className="font-medium">{s._id}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.uploader.username}</TableCell>
                  <TableCell className="text-right">{dateKey}</TableCell>
              </TableRow>
              )
            })}
          </TableBody>
        </Table>

        </CardContent>
      </Card>
    </div>
  )
} 

export default StickersTable;