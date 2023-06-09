import React, { Dispatch, SetStateAction } from 'react'
interface ViewModelProps{
  
  title:string
  description:string
  createdDate:string
  updatedDate:string
  setCloseModel:Dispatch<SetStateAction<boolean>>
  setBackgroundClick:Dispatch<SetStateAction<boolean>>
}
export const ViewModel = (props:ViewModelProps) => {
  return (
    <div className='pointer-events-auto absolute right-[2%] top-[2%] w-[500px] font-mono border rounded-md p-5 flex flex-col gap-3 bg-slate-100 z-50'>
      <textarea disabled className='bg-white w-full h-auto' value={props.title}/>
      <textarea disabled className='bg-white w-full h-auto' value={props.description}/>
      <div className='flex justify-between'>
        <div className='flex flex-col items-center'>
          <span className='font-[250]'>Created Date</span>
          <span>{props.createdDate}</span>
        </div>
        <div className='flex flex-col items-center'>
          <span className='font-[250]'>Updated Date</span>
          <span>{props.updatedDate}</span>
        </div>
      </div>
      <div className='flex justify-end py-2 '>
        <button onClick={()=>{props.setCloseModel(false);props.setBackgroundClick(true)}} className='bg-blue-500  rounded-2xl font-medium text-white mr-2 p-2 hover:opacity-70'>Close</button>
      </div>
    </div>
  )
}
