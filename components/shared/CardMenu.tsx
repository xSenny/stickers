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

const CardMenu = ({name, hasAccess, handleImageShare, handleEmbedShare, handleDeleteSticker, handleEditSticker}: {name: string, hasAccess: Boolean, handleImageShare: () => void, handleEmbedShare: () => void, handleDeleteSticker: () => void, handleEditSticker: (name: string) => void}) => {
  return (
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
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4"/>
              <span>Edit your sticker's name</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default CardMenu;