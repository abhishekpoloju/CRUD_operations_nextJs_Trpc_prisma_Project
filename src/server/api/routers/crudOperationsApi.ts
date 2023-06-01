import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
export const crudOperationsRouter = createTRPCRouter({
  add: publicProcedure.input(
    z.object({
      title: z.string().min(5, "requried min 5 length"),
      description: z.string().max(300, "cant be more than 200 words"),
    })
  ).mutation(async ({input})=>{
    try{
      const postData=await prisma.notes.create({data:{title:input.title,description:input.description}})
      return postData
    }catch(error){
      console.log("error while creating note "+error)
      throw new Error("failed to create matter "+error)
    }
  }),
});
