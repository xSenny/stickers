'use server'
import { revalidatePath } from "next/cache"
import { connectToDatabase } from "../database"
import Sticker from "../database/models/Sticker"
import User from "../database/models/User"
import { CreateStickerParams, GetAllStickersParams } from "@/types"

const populateSticker = (query: any) => {
  return query.populate({path: "uploader", model: User, select: '_id username'})
}


export const createSticker = async ({userId, stickerName, stickerUrl}: CreateStickerParams) => {
  try {
    await connectToDatabase()

    const uploader = await User.findById(userId)
    if (!uploader) throw new Error('The user with id ' + userId + ' could not be found')

    const newSticker = await Sticker.create({uploader: userId, name: stickerName, stickerUrl, createdAt: new Date()})
    console.log(newSticker)
    return JSON.parse(JSON.stringify(newSticker));
  } catch(e) {
    console.log('Error creating a sticker')
    console.log(e)
  }
}

export const deleteSticker = async (stickerId: string) => { 
  try {
    await connectToDatabase()
    const deletedSticker = await Sticker.findByIdAndDelete(stickerId)
  } catch (e) {
    console.log('Error deleting a sticker')
    console.log(e)
  }
}

export const updateSticker = async (stickerId: string, name: string) => {
  try {
    await connectToDatabase()
    const updatedSticker = await Sticker.findByIdAndUpdate(stickerId, {name})
  } catch (e) {
    console.log('Error updating a sticker')
    console.log(e)
  }
}

export const getAllStickersForDashboard = async() => {
  try {
    await connectToDatabase()
    const stickers = await Sticker.find()
    return stickers;
  } catch (e) {
    console.log(e)
  }
}

export const getTableStickers = async () => {
  try {
    await connectToDatabase()
    const query = Sticker.find()
    const stickers = await populateSticker(query)

    return stickers;
  } catch (e) {
    console.log(e)
  }
}

export const getAllStickers = async ({query, page, category, userId}: GetAllStickersParams) => {
  const limit = 18
  try {
    await connectToDatabase()

    const titleConditions = query ? {name: {$regex: query, $options: 'i'}} : {}

    if (category === 'uploaded') {
      const skipAmount = (Number(page) - 1) * limit

      const query = Sticker.find({
        $and: [
          titleConditions,
          {uploader: userId}
        ]
      })
        .sort({createdAt: 'desc'})
        .skip(skipAmount)
        .limit(limit)

      const stickers = await populateSticker(query)

      const stickerCounts = await Sticker.countDocuments({
        $and: [
          titleConditions,
          {uploader: userId}
        ]
      })

      return {
        data: stickers,
        totalPages: Math.ceil(stickerCounts / limit)
      }
    } else if (category === 'oldest') {
      const skipAmount = (Number(page) - 1) * limit

      const query = Sticker.find({
        $and: [
          titleConditions,
        ]
      })
        .sort({createdAt: 'asc'})
        .skip(skipAmount)
        .limit(limit)

      const stickers = await populateSticker(query)

      const stickerCounts = await Sticker.countDocuments({
        $and: [
          titleConditions,
        ]
      })

      return {
        data: stickers,
        totalPages: Math.ceil(stickerCounts / limit)
      }
    } else {
      const skipAmount = (Number(page) - 1) * limit

      const query = Sticker.find({
        $and: [
          titleConditions,
        ]
      })
        .sort({createdAt: 'desc'})
        .skip(skipAmount)
        .limit(limit)

      const stickers = await populateSticker(query)

      const stickerCounts = await Sticker.countDocuments({
        $and: [
          titleConditions,
        ]
      })

      return {
        data: stickers,
        totalPages: Math.ceil(stickerCounts / limit)
      }
    }
  } catch (e) {
    console.log('Error retrieving the stickers')
    console.log(e)
  }
}

export const getSticker = async (id: string) => {
  try {
    await connectToDatabase();

    const sticker = await Sticker.findById(id)

    if (!sticker) return null
    
    return sticker
  } catch (e) {
    console.log(e)
  }
}