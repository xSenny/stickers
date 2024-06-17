import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Pencil,
  Share,
  Share2,
  Trash2
} from "lucide-react"


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"

import { Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'

import {Button } from '@/components/ui/button'

import {useState} from 'react'

const CardMenu = ({name, hasAccess, handleImageShare, handleEmbedShare, handleDeleteSticker, handleEditSticker}: {name: string, hasAccess: Boolean, handleImageShare: () => void, handleEmbedShare: () => void, handleDeleteSticker: () => void, handleEditSticker: (name: string) => void}) => {

  const [newName, setNewName] = useState(name)

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="absolute bottom-5 z-1 right-5"><img src="/assets/icons/cardmenu.svg"/></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleImageShare}>
            <Share2 className="mr-2 h-4 w-4"/>
            <span>Share the sticker as an image</span>
            </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEmbedShare}>
            <Share className="mr-2 h-4 w-4"/>
            <span>Share the sticker as embeded</span>
          </DropdownMenuItem>
          {hasAccess && (
            <>
              <DropdownMenuItem onClick={handleDeleteSticker}>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete your sticker</span>
              </DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <Pencil className="mr-2 h-4 w-4"/>
                  <span>Edit your sticker's name</span>
                </DropdownMenuItem>
              </DialogTrigger>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit the sticker</DialogTitle>
          <DialogDescription>
            Make changes to your sticker here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={() => handleEditSticker(newName)}>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CardMenu;