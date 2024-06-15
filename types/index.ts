export type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
}


export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}

export type CreateStickerParams = {
  userId: string,
  stickerName: string,
  stickerUrl: string,
}

export type GetAllStickersParams = {
  query?: string,
  page: Number,
  userId?: string,
  category: string,
}

export type StickerPaginationParams = {
  currentPage: Number,
  maxPage: Number,
}


export type Sticker = {
  uploader: {
    _id: string,
    username: string,
  },
  _id: string,
  stickerUrl: string,
  createdAt: string,
  name: string;
}

export type StickerCardProps = {
  stickers: Sticker
}

export type StickerCollectionProps = {
  stickers?: Sticker[]
}