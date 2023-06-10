import { Notes } from "@prisma/client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { api } from "~/utils/api";
interface AddModelProps {
  title?: string;
  description?: string;
  isUpdateFlag: boolean;
  id: string;
  setCloseModel: Dispatch<SetStateAction<boolean>>;
  refetch: any;
  setBackgroundClick: Dispatch<SetStateAction<boolean>>;
  data: Notes[] | undefined;
  setRetrieve: Dispatch<SetStateAction<Notes[] | undefined>>;
  retrieve:Notes[] | undefined
  index:number|null
}

export const AddModel = (props: AddModelProps) => {
  const addMutation = api.crudApi.add.useMutation();
  const updateMutation = api.crudApi.update.useMutation();
  const [title, setTitle] = useState(props.title || "");
  const [description, setDescription] = useState(props.description || "");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (props.isUpdateFlag) {
      const data:Notes = await updateMutation.mutateAsync({
        id: props.id,
        title,
        description,
      });
      const tempdata=props.data
      tempdata![props.index!]=data
      props.setRetrieve(tempdata)
    } else {
      const data = await addMutation.mutateAsync({ title, description });
      console.log("data is .....", data);
      props.setRetrieve([...(props.retrieve||[]),data])
    }

    props.setBackgroundClick(true);
    props.setCloseModel(false);
  };
  const handleReset = () => {
    setTitle(props.title!);
    setDescription(props.description!);
    props.setCloseModel(false);
    props.setBackgroundClick(true);
  };
  return (
    <div className="md pointer-events-auto absolute right-[2%] top-[2%] z-50 flex w-[500px] flex-col gap-5 rounded border border-slate-950 bg-slate-100 p-5 font-mono">
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="flex flex-col gap-3"
      >
        <textarea
          className="rounded-2xl bg-white px-4 pt-2 outline-none"
          placeholder="Enter Title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            console.log(title);
          }}
        />
        <textarea
          className="rounded-2xl  bg-white px-4 pt-2 outline-none"
          placeholder="Enter Description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
            console.log(title);
          }}
        />
        <div className="flex justify-end py-2">
          <button
            type="reset"
            className="mr-5 rounded-2xl   bg-white p-2 font-medium text-blue-500 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="mr-2 rounded-2xl bg-blue-500 p-2 font-medium text-white hover:opacity-70"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
