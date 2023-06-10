import React, { Dispatch, SetStateAction } from 'react'
import { Notes } from '@prisma/client'
import { ViewModel } from './ViewModel'
import { AddModel } from './AddModel'
interface TodoProps{
  retrieve:Notes[],
  openAddModel:boolean,
  openAddModelToogle:string,
  openViewModel:boolean,
  openViewModelToogle:string,
  setOpenViewModel:Dispatch<SetStateAction<boolean>>,
  setOpenViewModelToggle:Dispatch<SetStateAction<string>>,
  setOpenAddModelToggle:Dispatch<SetStateAction<string>>,
  setOpenAddModel:Dispatch<SetStateAction<boolean>>,
  handleViewModel:(index:string)=>void,
  handleAddModel:(index:string)=>void,
  handleDelete:(index:string)=>void
  refetch:any
  setBackgroundClick:Dispatch<SetStateAction<boolean>>
}
export const Todo = (props:TodoProps) => {
  return (
    <div>
      {props.retrieve?.length ? (
          <div className="mt-10 grid grid-cols-[minmax(0px,_1fr)_100px_100px_100px] gap-3 ">
            {props.retrieve.map((data: Notes) => {
              return (
                <React.Fragment key={data.id}>
                  <div className="bg-pink-300 w-fit">{data.title}</div>
                  <div className='relative'>
                  <button
                    onClick={() => {
                      props.handleViewModel(data.id);
                    }}
                    className="w-auto rounded bg-slate-600 p-2  text-white"
                  >
                    view
                  </button>
                  {props.openViewModel && props.openViewModelToogle === data.id && (
                    <ViewModel
                      title={data.title}
                      description={data.description}
                      createdDate={data.createdAt.toLocaleDateString()}
                      updatedDate={data.updatedAt.toLocaleDateString()}
                      setCloseModel={props.setOpenViewModel}
                      setBackgroundClick={props.setBackgroundClick}
                    />
                  )}
                    </div>
                    <div className='relative'>
                  <button
                    onClick={() => {
                      props.handleAddModel(data.id);
                    }}
                    className="rounded bg-orange-300 p-2 text-white"
                  >
                    edit
                  </button>
                  {props.openAddModel && props.openAddModelToogle === data.id && (
                    <AddModel
                      isUpdateFlag
                      id={data.id}
                      title={data.title}
                      description={data.description}
                      setCloseModel={props.setOpenAddModel}
                      refetch={props.refetch}
                      setBackgroundClick={props.setBackgroundClick}
                    />
                  )}
                  </div>
                  <button
                    className="rounded bg-green-300 p-2 text-white"
                    onClick={() => {
                      props.handleDelete(data.id);
                    }}
                  >
                    delete
                  </button>
                  
                  
                </React.Fragment>
              );
            })}
          </div>
        ):<div className=''>
          no data found
        </div>}

    </div>
  )
}
