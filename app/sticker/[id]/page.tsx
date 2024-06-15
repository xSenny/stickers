import { getSticker } from '@/lib/actions/sticker.actions'
import type { Metadata, ResolvingMetadata } from 'next'

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

  return {
    title: `Cel mai bun sticker pe tema: ${sticker.name}`,
    openGraph: {
      images: [sticker.stickerUrl],
    },
  }
}
 
export default async function Page({ params }: Props) {
  const id = params.id
 
  const sticker = await getSticker(id)

  return (
    <img src={sticker.stickerUrl} alt="alt"/>
  )
}
