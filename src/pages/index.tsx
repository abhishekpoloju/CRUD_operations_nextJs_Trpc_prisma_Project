import { Notes } from "@prisma/client";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { AddModel } from "~/components/AddModel";
import { Todo } from "~/components/Todo";
import React from "react";
const Home = () => {
  const deleteMutation = api.crudApi.delete.useMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [retrieve, setRetrieve] = useState<Notes[]>();

  const { data, error, refetch, isLoading } = api.crudApi.getAll.useQuery({
    searchQuery: searchQuery,
  });
  console.log(data);
  useEffect(() => {
    setRetrieve(data);
  }, [data]);
  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync({ id });
    refetch();
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
  if (isLoading) {
    return (
      <div className="fixed left-[60%] top-[50%] -translate-x-[50%] -translate-y-[50%] animate-pulse"></div>
    );
  }
  if (retrieve) {
    console.log(retrieve);
    return (
      <div
        className={`w-full p-5 pt-10 font-mono ${
          openViewModel ? "bg-opacity-50" : "bg-opacity-100"
        }`}
      >
        <div className="flex w-full justify-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
            className="w-[400px] rounded border"
          />
          <button
            onClick={() => {
              handleAddModel("");
            }}
            className="rounded-lg bg-red-400 p-4 text-white"
          >
            Add newNote
          </button>
          {openAddModel && openAddModelToogle === "" && (
            <AddModel
              isUpdateFlag={false}
              id=""
              setCloseModel={setOpenAddModel}
              refetch={refetch}
            />
          )}
        </div>
        <Todo 
        retrieve={retrieve}
        openAddModelToogle={openAddModelToogle}
        openAddModel={openAddModel}
        setOpenAddModel={setOpenAddModel}
        setOpenAddModelToggle={setOpenAddModelToggle}
        openViewModel={openViewModel}
        openViewModelToogle={openViewModelToogle}
        setOpenViewModel={setOpenViewModel}
        setOpenViewModelToggle={setOpenViewModelToggle}
        handleAddModel={handleAddModel}
        handleViewModel={handleViewModel}
        handleDelete={handleDelete}
        refetch={refetch}
        />
      </div>
    );
  } else if (error) {
    return <div>Sorry something error please refresh or comeback again</div>;
  }
};

export default Home;
