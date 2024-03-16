"use server"

import User from "../db/models/user.model"
import { connectToDb } from "../db/mongoose"
import { handleError } from "../utils";




//CREATE

export const createUser = async (user:CreateUserParams)=>{
   try {
    await connectToDb();
    const newUser =  await User.create(user)
    return JSON.parse(JSON.stringify(newUser))
 
   } catch (error) {
        handleError(error)
   }
}


//READ

export async function getUserById(userId: string) {
  try {
    await connectToDb();

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}


//UPDATE

export const updateUser = async (clerkId:string,user:UpdateUserParams)=>{
    try {
        await connectToDb();
        const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
            new: true,
          });
      
          if (!updatedUser) throw new Error("User update failed");
          
          return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        handleError(error)
    }
}


//DELETE

export async function deleteUser(clerkId: string) {
    try {
      await connectToDb();
  
      // Find user to delete
      const userToDelete = await User.findOne({ clerkId });
  
      if (!userToDelete) {
        throw new Error("User not found");
      }
  
      // Delete user
      const deletedUser = await User.findByIdAndDelete(userToDelete._id);
      //revalidatePath("/");
  
      return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;

    } catch (error) {
      handleError(error);
    }
  }