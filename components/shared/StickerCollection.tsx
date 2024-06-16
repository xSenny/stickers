import {StickerCollectionProps} from '@/types'
import Header from '@/components/shared/Header'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import StickerCard from '@/components/shared/StickerCard'
const StickerCollection = ({stickers}: StickerCollectionProps) => {
  const {sessionClaims} = auth()

  const userId = sessionClaims?.userId as string;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stickers !== undefined && stickers.length > 0 && (
        stickers.map((s, i) => (
          <StickerCard name={s.name} uploader={s.uploader.username} id={s._id} imageUrl={s.stickerUrl} hasAccess={userId === s.uploader.id}/>
        ))
      )}
    </div>
  )
}

export default StickerCollection;