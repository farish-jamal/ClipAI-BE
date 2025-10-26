import { id } from "zod/v4/locales";
import prisma from "../../prisma/client";

export const findUserByEmail = async (email: string): Promise<any> => {
   const user = await prisma.user.findUnique({
      where: { email },
   });
   return user;
};

export const createUser = async (
   email: string,
   hashedPassword: string,
   name: string,
   lastLogin: Date
): Promise<any> => {
   return await prisma.user.create({
      data: {
         email,
         password: hashedPassword,
         name,
         lastLogin,
      },
   });
};

export const updateToken = async (userId: string, refreshToken: string): Promise<any> => {
   return await prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
   });
};

export const findUserById = async (id: string): Promise<any> => {
   const user = await prisma.user.findUnique({
      where: { id },
   });
   return user;
};

export const updateUser = async (id: string, payload: any): Promise<any> => {
   return await prisma.user.update({
      where: { id },
      data: payload,
   });
};
