import jwt from "jsonwebtoken";
import {
   createUser,
   findUserByEmail,
   findUserById,
   updateToken,
   updateUser,
} from "../../repository/user";
import { comparePasswords, hashPassword } from "../../utils/passwords";

export const createNewUserService = async (email: string, password: string, name: string) => {
   const userExists = await findUserByEmail(email);
   if (userExists) {
      return {
         success: false,
         statusCode: 400,
         message: "User already exists",
         data: null,
      };
   }

   // Crerate the hash for the password
   const hashedPassword = await hashPassword(password);

   const lastLogin = new Date();

   const user = await createUser(email, hashedPassword, name, lastLogin);
   if (!user) {
      return {
         success: false,
         statusCode: 500,
         message: "Failed to create user",
         data: null,
      };
   }

   const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET_KEY as string,
      {
         expiresIn: "1d",
      }
   );

   const refreshToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET_KEY as string
   );

   const updateUserWithToken = await updateToken(user.id, refreshToken);

   if (!updateUserWithToken) {
      return {
         success: false,
         statusCode: 500,
         message: "Failed to update user with refresh token",
         data: null,
      };
   }

   return {
      success: true,
      statusCode: 201,
      message: "User created successfully",
      data: {
         user: {
            id: user.id,
            email: user.email,
            name: user.name,
         },
         accessToken: accessToken,
      },
   };
};

export const customizeUserService = async (
   id: string,
   avatarUrl: string,
   prefferedVoice: string,
   prefferedStyle: string
) => {
   const isUserExist = await findUserById(id);
   if (!isUserExist) {
      return {
         success: false,
         statusCode: 404,
         message: "User not found",
         data: null,
      };
   }

   const payload: Partial<{ avatarUrl: string; prefferedVoice: string; prefferedStyle: string }> =
      {};
   if (avatarUrl) payload.avatarUrl = avatarUrl;
   if (prefferedVoice) payload.prefferedVoice = prefferedVoice;
   if (prefferedStyle) payload.prefferedStyle = prefferedStyle;

   const updatedUser = await updateUser(id, payload);

   if (!updatedUser) {
      return {
         success: false,
         statusCode: 500,
         message: "Failed to update user customization",
         data: null,
      };
   }

   return {
      success: true,
      statusCode: 200,
      message: "User customization updated successfully",
      data: updatedUser,
   };
};

export const loginUserService = async (email: string, password: string) => {
   const userExists = await findUserByEmail(email);
   if (!userExists) {
      return {
         success: false,
         statusCode: 404,
         message: "User not found",
         data: null,
      };
   }

   const isPassWordValid = await comparePasswords(password, userExists.password);
   if (!isPassWordValid) {
      return {
         success: false,
         statusCode: 401,
         message: "Invalid password",
         data: null,
      };
   }

   const accessToken = jwt.sign(
      { userId: userExists.id, email: userExists.email },
      process.env.JWT_SECRET_KEY as string,
      {
         expiresIn: "1d",
      }
   );

   const refreshToken = jwt.sign(
      { userId: userExists.id, email: userExists.email },
      process.env.JWT_SECRET_KEY as string
   );

   const updateUserWithToken = await updateToken(userExists.id, refreshToken);

   if (!updateUserWithToken) {
      return {
         success: false,
         statusCode: 500,
         message: "Failed to update user with refresh token",
         data: null,
      };
   }

   return {
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      data: {
         user: {
            id: userExists.id,
            email: userExists.email,
            name: userExists.name,
         },
         accessToken: accessToken,
      },
   };
};
