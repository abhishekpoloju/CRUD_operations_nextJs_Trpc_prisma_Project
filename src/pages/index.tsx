import { type NextPage } from "next";
import Head from "next/head";
import { Notes } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { api } from "~/utils/api";

export const getServerSideProps:GetServerSideProps<{repo:Notes[] | undefined}> = async()=>{
  const {data,error}=await api.crudApi.getAll.useQuery()
  return {
    props:{
      repo: data
    }
  }
}



const Home = ({repo}:InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return(
    <div className="h-screen w-full">
      {
        repo?.length&&(
          <div className="flex flex-col gap-3">
            {
              repo.map((data)=>{
                return(
                  <div key={data.id} className="flex flex-row gap-2 border">
                    <div>{data.title}</div>
                    <div>{data.description}</div>
                    <div>{data.createdAt.toLocaleDateString()}</div>
                    <div>{data.updatedAt.toLocaleDateString()}</div>
                  </div>
                )
              })
            }
          </div>
        )
      }
    </div>
  ) 
};

export default Home;
