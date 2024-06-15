import Filter from '@/components/shared/Filter'
import InputAndSavedButton from '@/components/shared/InputAndSavedButton'
import StickerPagination from '@/components/shared/Pagination'
import StickerCollection from '@/components/shared/StickerCollection'
import { getAllStickers } from '@/lib/actions/sticker.actions'
import { getAllUsers } from '@/lib/actions/user.actions'
import { SearchParamProps } from '@/types'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const page = async ({searchParams}: SearchParamProps) => {
  const {sessionClaims} = auth()

  const userId = sessionClaims?.userId as string;
  // console.log(sessionClaims)
  // console.log(userId)

  const page = Number(searchParams?.page) || 1
  const searchText = (searchParams?.query as string) || ''
  const category = (searchParams?.filter as string) || 'recent'

  let maxPages = 1

  const stickers = await getAllStickers({
    query: searchText,
    page: page,
    category: category,
    userId
  })

  maxPages = stickers?.totalPages || 1



  return (
    <div className="flex flex-col gap-10 mt-10">
      <InputAndSavedButton />
      <div className="w-full flex justify-end pr-52">
        <Filter />
      </div>
      <StickerCollection stickers={stickers?.data}/>
      <StickerPagination currentPage={page} maxPage={maxPages}/>
    </div>
  )
}

export default page
