import { Notes } from "@prisma/client";
import { useState } from "react";
import { api } from "~/utils/api";
import { AddModel } from "~/components/AddModel";
import { ViewModel } from "~/components/ViewModel";
import React from "react";
const Home = () => {
  const deleteMutation = api.crudApi.delete.useMutation();
  const { data, error, refetch } = api.crudApi.getAll.useQuery();
  const handleDelete = async (id: string) => {
    deleteMutation.mutateAsync({ id });
    await refetch();
  };
  const [openAddModelToogle, setOpenAddModelToggle] = useState("");
  const [openAddModel, setOpenAddModel] = useState(false);
  const handleAddModel = (index: string) => {
    
    setOpenAddModelToggle(index);
    setOpenAddModel(true);
  };
  const [openViewModelToogle, setOpenViewModelToggle] = useState("");
  const [openViewModel, setOpenViewModel] = useState(false);
  const handleViewModel = (index: string) => {
    
    setOpenViewModelToggle(index);
    setOpenViewModel(true);
  };
  if (data) {
    return (
      <div className={`w-full font-mono p-5 pt-10 ${openViewModel?'bg-opacity-50':'bg-opacity-100'}`}>
        <div className="flex w-full justify-center">
          <button
            onClick={() => {
              handleAddModel("");
            }}
            className="rounded-lg bg-red-400 p-4 text-white"
          >
            Add newNote
          </button>
          {openAddModel && openAddModelToogle === "" && (
            <AddModel isUpdateFlag={false} id="" setCloseModel={setOpenAddModel}/>
          )}
        </div>
        {data?.length && (
          <div className="grid grid-cols-4 mt-10 gap-3 ">
            {data.map((data: Notes) => {
              return (
                <React.Fragment
                  key={data.id}                  
                >
                  <div className="bg-pink-300">{data.title}</div>
                  <button
                    onClick={() => {
                      handleViewModel(data.id);
                    }}
                    className="w-auto bg-slate-600 rounded p-2 text-white"
                  >
                    view
                  </button>
                  <button
                    onClick={() => {
                      handleAddModel(data.id);
                    }}
                    className="bg-orange-300 rounded p-2 text-white"
                  >
                    edit
                  </button>
                  <button
                    className="bg-green-300 rounded p-2 text-white"
                    onClick={() => {
                      handleDelete(data.id);
                    }}
                  >
                    delete
                  </button>
                  {openAddModel && openAddModelToogle === data.id && (
                    <AddModel isUpdateFlag id={data.id} title={data.title} description={data.description} setCloseModel={setOpenAddModel}/>
                  )}
                  {
                    openViewModel && openViewModelToogle===data.id &&(
                      <ViewModel title={data.title} description={data.description} createdDate={data.createdAt.toLocaleDateString()} updatedDate={data.updatedAt.toLocaleDateString()} setCloseModel={setOpenViewModel}/>
                    )
                  }
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    );
  } else if (error) {
    return <div>Sorry something error please refresh or comeback again</div>;
  }
};

export default Home;
