import { PrismaClient } from "@prisma/client";
import { env } from "~/env.mjs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
// import { PrismaClient } from '@prisma/client';

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// export const prisma = global.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== 'production') {
//   global.prisma = prisma;
// }

// async function connectDB() {
//   try {
//     await prisma.$connect();
//     console.log('? Database connected successfully');
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// export default connectDB;
