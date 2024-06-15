'use client'
const StickerCard = ({name, id, imageUrl, uploader}: {name: string, id: string, imageUrl: string; uploader: string}) => {
  return (
    <div className="flex justify-center items-center">
        <div className="w-[240px] h-[300px] border-2 rounded-xl border-designPrimary overflow-hidden" onClick={() => navigator.clipboard.writeText(imageUrl)}>
        <div className="w-full h-[220px] flex justify-center items-center">
          <img src={imageUrl} alt={name}/>
        </div>
        <div className="w-full h-[80px] bg-gray-300 flex justify-center flex-col">
          <p className="text-center">{name}</p>
          <p className="text-start">Uploaded by {uploader}</p>
        </div>
      </div>
    </div>
  )
}

export default StickerCard;