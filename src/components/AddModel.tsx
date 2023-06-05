import React, { Dispatch, SetStateAction, useState } from 'react'
import { api } from '~/utils/api'
interface AddModelProps{
  title?:string
  description?:string
  isUpdateFlag:boolean
  id:string
  setCloseModel:Dispatch<SetStateAction<boolean>>
}

export const AddModel=(props:AddModelProps)=> {
const addMutation=api.crudApi.add.useMutation()
const updateMutation=api.crudApi.update.useMutation()
  const [title,setTitle]=useState(props.title||"")
  const [description,setDescription]=useState(props.description||"");
  
  const handleSubmit=()=>{
    if(props.isUpdateFlag){
      updateMutation.mutateAsync({id:props.id,title,description})
    }else{
    addMutation.mutateAsync({title,
      description
    }) 
  }
  }
  const handleReset=()=>{
    setTitle(props.title!)
    setDescription(props.description!)
    props.setCloseModel(false)
  }
  return (
    <div className='w-[500px] p-5 flex flex-col gap-5 bg-slate-300 top-48 left-[20rem] fixed z-50'>
      <form onSubmit={handleSubmit} onReset={handleReset}>
      <textarea className='bg-white w-full h-auto' value={title} onChange={(event)=>{setTitle(event.target.value);console.log(title)}} />
      <textarea className='bg-white w-full h-auto' value={description} onChange={(event)=>{setDescription(event.target.value);console.log(title)}}/>
      <div className='flex justify-end py-2 bg-white'>
        <button type='reset' className='bg-blue rounded-md font-medium mr-2'>Cancel</button>
        <button type='submit' className='bg-blue rounded-md font-medium mr-2'>Save</button>
      </div>
      </form>
    </div>
  )
}
