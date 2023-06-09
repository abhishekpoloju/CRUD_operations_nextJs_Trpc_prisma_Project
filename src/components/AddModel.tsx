import React, { Dispatch, SetStateAction, useState } from 'react'
import { api } from '~/utils/api'
interface AddModelProps{
  title?:string
  description?:string
  isUpdateFlag:boolean
  id:string
  setCloseModel:Dispatch<SetStateAction<boolean>>
  refetch:any
}

export const AddModel=(props:AddModelProps)=> {
const addMutation=api.crudApi.add.useMutation()
const updateMutation=api.crudApi.update.useMutation()
  const [title,setTitle]=useState(props.title||"")
  const [description,setDescription]=useState(props.description||"");
  
  const handleSubmit=async (e:any)=>{
    e.preventDefault();
    if(props.isUpdateFlag){
      await updateMutation.mutateAsync({id:props.id,title,description})
    }else{
    await addMutation.mutateAsync({title,
      description
    })  
  }
  props.refetch()
  props.setCloseModel(false)
  }
  const handleReset=()=>{
    setTitle(props.title!)
    setDescription(props.description!)
    props.setCloseModel(false)
  }
  return (
    <div className='w-[500px] absolute font-mono border border-slate-950 rounded md p-5 flex flex-col gap-5 bg-slate-100 z-50'>
      <form onSubmit={handleSubmit} onReset={handleReset} className='flex flex-col gap-3'>
      <textarea className='bg-white outline-none rounded-2xl px-4 pt-2' placeholder='Enter Title' value={title} onChange={(event)=>{setTitle(event.target.value);console.log(title)}} />
      <textarea className='bg-white  outline-none rounded-2xl px-4 pt-2' placeholder='Enter Description' value={description} onChange={(event)=>{setDescription(event.target.value);console.log(title)}}/>
      <div className='flex justify-end py-2'>
        <button type='reset' className='text-blue-500 bg-white   p-2 rounded-2xl font-medium mr-5 hover:bg-slate-100'>Cancel</button>
        <button type='submit' className='bg-blue-500 p-2 text-white rounded-2xl font-medium mr-2 hover:opacity-70'>Save</button>
      </div>
      </form>
    </div>
  )
}
