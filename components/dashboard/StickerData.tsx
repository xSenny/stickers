
import { Sticker } from "@/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import {
  FilePen,
  TrashIcon
} from 'lucide-react'

import {Button} from '@/components/ui/button'

const StickerData = ({selectedSticker, stickers, userId}: {selectedSticker: string; stickers: Sticker[]; userId: string}) => {

  let sticker: Sticker | undefined = undefined

  stickers.forEach(s => {
    if (s.id === selectedSticker) sticker = s 
  })

  const createdAtDate = new Date(sticker.createdAt)
  const dateKey = `${createdAtDate.getFullYear()}-${(createdAtDate.getMonth() + 1).toString().padStart(2, '0')}-${createdAtDate.getDate().toString().padStart(2, '0')}`;

  return (
    <div>
      <Card className="h-full w-full">
        {sticker !== undefined && (
          <>
            <CardHeader className="flex justify-center items-center ">
              <div className="flex items-center gap-4">
                <img src={sticker.stickerUrl} className="w-[50%]"/>
                <div>
                  <CardTitle>{sticker.name}</CardTitle>
                  <CardDescription>Uploaded by {sticker.uploader.username}</CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" disabled={(userId !== sticker.uploader.id && userId !== '666da486a7977bb13b64868c')}>
                  <FilePen  className="h-5 w-5"/>
                </Button>
                <Button variant="ghost" size="icon" disabled={(userId !== sticker.uploader.id && userId !== '666da486a7977bb13b64868c')}>
                  <TrashIcon  className="h-5 w-5"/>
                </Button>
              </div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="text-sm text-muted-foreground">Uploaded on {dateKey}</div>
            <div className="text-sm text-muted-foreground">Sticker ID: {sticker.id}</div>
          </CardContent>
          </>
        )}
      </Card>
    </div>
  )
}

export default StickerData
