import { Notes } from "@prisma/client";
import { api } from "~/utils/api";

const Home = () => {
  
  const {data,error}=api.crudApi.getAll.useQuery()
  if (data) {
    return (
      <div className="h-screen w-full">
        {data?.length && (
          <div className="flex flex-col gap-3">
            {data.map((data:Notes) => {
              return (
                <div key={data.id} className="flex flex-row gap-2 border">
                  <div>{data.title}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  } else if(error) {
    return <div>data is not fetching</div>;
  }
};

export default Home;
