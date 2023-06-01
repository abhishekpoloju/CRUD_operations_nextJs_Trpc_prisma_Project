import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "~/server/db";

export const subscribeRouter=createTRPCRouter({
  sub:publicProcedure.input(z.object({text:z.string()})).query(({input})=>{
    return{
      pleaseSub: `please subscribe to : ${input?.text}`
    }
  })
}
)