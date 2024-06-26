'use client'
import CardMenu from '@/components/shared/CardMenu'
import { useToast } from "@/components/ui/use-toast"
import {deleteSticker, updateSticker} from "@/lib/actions/sticker.actions"
import {useRouter} from 'next/navigation'
import {useState} from 'react'

const StickerCard = ({name, id, imageUrl, uploader, hasAccess}: {name: string, id: string, imageUrl: string; uploader: string, hasAccess: Boolean}) => {
  
  const { toast } = useToast()
  const router = useRouter()


  const shareImage = () => {
    navigator.clipboard.writeText(imageUrl)
    toast({
      title: "Copied the url in your clipboard!",
      description: "Send it to your friends!",
    })
  }

  const shareEmbed = () => {
    navigator.clipboard.writeText('https://stickers.xsenny.dev/sticker/'+id)
    toast({
      title: "Copied the embeded url in your clipboard!",
      description: "Send it to your friends via discord/telegram/twitter etc...",
    })
  }

  const handleDeleteSticker = async () => {
    try {
      await deleteSticker(id)
      router.refresh()
      toast({
        title: "Your sticker was deleted successfully"
      })
    } catch (e) {
      console.log (e)
    }
  }

  const handleUpdateSticker = async (name: string) => {
    try {
      await updateSticker(id, name)
      router.refresh()
      toast({
        title: "Your sticker's name was successfully changed",
        description: "Its new name is " + name
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-[240px] h-[300px]  relative border-2 rounded-xl group border-designPrimary overflow-hidden">
        <div className="w-full h-[220px] flex justify-center items-center">
          <img src={imageUrl} alt={name} className='object-cover w-full h-full'/>
        </div>
        <div className="w-full h-[80px] bg-gray-300 flex justify-center flex-col">
          <p className="text-center">{name}</p>
          <p className="text-start">Uploaded by {uploader}</p>
        </div>
        <CardMenu name={name} hasAccess={hasAccess} handleImageShare={shareImage} handleEmbedShare={shareEmbed} handleDeleteSticker={handleDeleteSticker} handleEditSticker={handleUpdateSticker}/>
      </div>
      
    </div>
  )
}

export default StickerCard;