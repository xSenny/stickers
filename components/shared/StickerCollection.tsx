import {StickerCollectionProps} from '@/types'
import Header from '@/components/shared/Header'
import Image from 'next/image'
import StickerCard from '@/components/shared/StickerCard'
const StickerCollection = ({stickers}: StickerCollectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stickers.length > 0 && (
        stickers.map((s, i) => (
          <StickerCard name={s.name} uploader={s.uploader.username} id={s._id} imageUrl={s.stickerUrl}/>
        ))
      )}
    </div>
  )
}

export default StickerCollection;