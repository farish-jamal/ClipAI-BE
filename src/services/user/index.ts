import jwt from "jsonwebtoken";
import {
   findUserById,
   updateUser,
} from "../../repository/user";
import { comparePasswords, hashPassword } from "../../utils/passwords";


export const editUserService = async (id: string, payload: any) => {
   const isUserExist = await findUserById(id);
   if (!isUserExist) {
      return {
         success: false,
         statusCode: 404,
         message: "User not found",
         data: null,
      };
   }

   if (payload.password) {
      const isValidPassword = await comparePasswords(payload.currentPassword, isUserExist.password);
      if (!isValidPassword) {
         return {
            success: false,
            statusCode: 401,
            message: "Current password is incorrect",
            data: null,
         };
      }

      const hashedNewPassword = await hashPassword(payload.password);
      payload.password = hashedNewPassword;
      delete payload.currentPassword;
   }

   const updatedUser = await updateUser(id, payload);
   if (!updatedUser) {
      return {
         success: false,
         statusCode: 500,
         message: "Failed to update user",
         data: null,
      };
   }

   return {
      success: true,
      statusCode: 200,
      message: "User updated successfully",
      data: updatedUser,
   };
};
