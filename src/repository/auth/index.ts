import prisma from "../../prisma/client";

export const findUserByEmail = async (email: string): Promise<boolean> => {
   const user = await prisma.user.findUnique({
      where: { email },
   });
   return !!user;
};

export const createUser = async (
   email: string,
   hashedPassword: string,
   name: string,
   lastLogin: Date
) => {
   return await prisma.user.create({
      data: {
         email,
         password: hashedPassword,
         name,
         lastLogin,
      },
   });
};

export const updateToken = async (userId: string, refreshToken: string) => {
   return await prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
   });
};

export const findUserById = async (id: string) => {
   const user = await prisma.user.findUnique({
      where: { id },
   });
   return !!user;
};

export const updateUserCustomization = async (
   userId: string,
   payload: { avatarUrl?: string; prefferedVoice?: string; prefferedStyle?: string }
) => {
   return await prisma.user.update({
      where: { id: userId },
      data: payload,
   });
};
