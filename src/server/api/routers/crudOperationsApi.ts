import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
export const crudOperationsRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().max(300, "cant be more than 200 words"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const postData = await prisma.notes.create({
          data: { title: input?.title, description: input.description },
        });
        return postData;
      } catch (error) {
        throw new Error("failed to create note " + error);
      }
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const deleting = await prisma.notes.delete({ where: { id: input.id } });
        return deleting;
      } catch (error) {
        throw new Error("failed to delete note " + error);
      }
    }),
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const getData = await prisma.notes.findUnique({
          where: { id: input.id },
        });
        return getData;
      } catch (error) {
        throw new Error("failed to fetch note " + error);
      }
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string()
      })
    )
    .mutation(async ({ input }) => {
      try {
        const updateData = await prisma.notes.update({
          where: { id: input.id },
          data: {
            title: input.title,
            description: input.description,
          },
        }
        );
        return updateData
      } catch (error) {
        throw new Error("failed to fetch note " + error);
      }
    }),
  getAll: publicProcedure.query(async ()=>{
    try{
      const getAllData=await prisma.notes.findMany()
      return getAllData
    }catch(error){
      throw new Error("failed to fetch all notes" + error);
    }
  }),
});
