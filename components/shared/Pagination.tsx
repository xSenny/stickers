'use client'
import {StickerPaginationParams} from '@/types'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import {useState, useEffect} from 'react'

import { formUrlQuery } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'


const StickerPagination = ({currentPage, maxPage}: StickerPaginationParams) => {

  const [page, setPage] = useState(currentPage)

  const searchParams = useSearchParams()    
  const router = useRouter()

  useEffect(() => {
    let newUrl = ''
    newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'page',
      value: page
    })
    router.push(newUrl, {scroll: false})
  }, [page])

  return (
    <Pagination>
      <PaginationContent>
        {currentPage !== 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={e => setPage(currentPage-1)} href="#"/>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href="#">{`${currentPage}`}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#"  onClick={e => setPage(maxPage)}>{`${maxPage}`}</PaginationLink>
        </PaginationItem>
        {currentPage !== maxPage && (
          <PaginationItem>
            <PaginationNext href="#"  onClick={e => setPage(currentPage + 1)}/>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>

  )
}

export default StickerPagination;