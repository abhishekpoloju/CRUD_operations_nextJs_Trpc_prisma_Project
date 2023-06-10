import React, { Dispatch, SetStateAction } from "react";
interface ViewModelProps {
  title: string;
  description: string;
  createdDate: string;
  updatedDate: string;
  setCloseModel: Dispatch<SetStateAction<boolean>>;
  setBackgroundClick: Dispatch<SetStateAction<boolean>>;
}
export const ViewModel = (props: ViewModelProps) => {
  return (
    <div className="pointer-events-auto absolute right-[2%] top-[2%] z-50 flex w-[500px] flex-col gap-3 rounded-md border bg-slate-100 p-5 font-mono">
      <textarea
        disabled
        className="h-auto w-full bg-white"
        value={props.title}
      />
      <textarea
        disabled
        className="h-auto w-full bg-white"
        value={props.description}
      />
      <div className="flex justify-between">
        <div className="flex flex-col items-center">
          <span className="font-[250]">Created Date</span>
          <span>{props.createdDate}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-[250]">Updated Date</span>
          <span>{props.updatedDate}</span>
        </div>
      </div>
      <div className="flex justify-end py-2 ">
        <button
          onClick={() => {
            props.setCloseModel(false);
            props.setBackgroundClick(true);
          }}
          className="mr-2  rounded-2xl bg-blue-500 p-2 font-medium text-white hover:opacity-70"
        >
          Close
        </button>
      </div>
    </div>
  );
};
