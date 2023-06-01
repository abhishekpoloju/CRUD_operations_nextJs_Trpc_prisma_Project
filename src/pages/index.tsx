import { Notes } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps<{
  repo: Notes[] | undefined;
}> = async () => {
  try{
    const resp = await fetch("http://localhost:3001/api/getData");
    const ans = await resp.json();
    return {
      props: {
        repo: ans,
      },
    };
  }catch(error){
    const resp:Notes[]|undefined=undefined
    return{
      props:{
        repo: resp
      }
    }
  }  
};

const Home = ({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if(repo){
    return (
      <div className="h-screen w-full">
        {repo?.length && (
          <div className="flex flex-col gap-3">
            {repo.map((data) => {
              return (
                <div key={data.id} className="flex flex-row gap-2 border">
                  <div>{data.title}</div>
                  <div>{data.description}</div>
                  <div>{data.createdAt.toLocaleDateString()}</div>
                  <div>{data.updatedAt.toLocaleDateString()}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }else{
    return (
      <div>
        data is not fetching
      </div>
    )
  }
  
};

export default Home;
