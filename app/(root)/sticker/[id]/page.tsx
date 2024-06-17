import { getSticker } from '@/lib/actions/sticker.actions'
import type { Metadata, ResolvingMetadata } from 'next'
import SharedStickerPage from '@/components/shared/SharedStickerPage'

type Props = {
  params: {id: string}
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id
 
  const sticker = await getSticker(id)

  const stickerUrl = sticker ? sticker.stickerUrl : '/assets/illustrations/not-found.png'

  return {
    title: `${sticker ? `Cel mai bun sticker pe tema: ${sticker.name}` : 'Sticker deleted or not found'}`,
    openGraph: {
      images: [stickerUrl],
    },
  }
}
 
export default async function Page({ params }: Props) {
  const id = params.id
 
  return (
    <SharedStickerPage />
  )
}