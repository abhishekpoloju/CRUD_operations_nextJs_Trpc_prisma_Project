import React, { Dispatch, SetStateAction } from 'react'
interface ViewModelProps{
  
  title:string
  description:string
  createdDate:string
  updatedDate:string
  setCloseModel:Dispatch<SetStateAction<boolean>>
}
export const ViewModel = (props:ViewModelProps) => {
  return (
    <div className='w-[500px] p-5 flex flex-col gap-5 bg-slate-300 top-48 left-[20rem] fixed z-50'>
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
        <button onClick={()=>{props.setCloseModel(false)}} className='bg-blue rounded-md font-medium text-white mr-2'>Close</button>
      </div>
    </div>
  )
}