'use server'

import { CreateUserParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/User";
import { revalidatePath } from "next/cache";

export const createUser = async (userData: CreateUserParams) => {
  try {
    await connectToDatabase()
    const newUser = await User.create(userData)
    console.log(newUser)
    console.log('^ the new saved user')
    return newUser;
  }catch(e) {
    console.log(e)
  }
}

export const getAllUsers = async () => {
  try {
    await connectToDatabase()
    const users = await User.find()

    return users;
  } catch (e) {
    console.log(e)
  }
}

export const deleteUser = async (clerkId: string) => {
  try {
    await connectToDatabase()
    const deletedUser = await User.findOne({clerkId})

    if (!deletedUser) {
      throw new Error('User not found')
    }

    const user = await User.findByIdAndDelete(deletedUser._id)

    revalidatePath('/')
    return user

  } catch(e) {
    console.log(e)
  }
}