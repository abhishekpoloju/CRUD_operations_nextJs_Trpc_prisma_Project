import React, { useState } from 'react'
import { api } from '~/utils/api'

export default function FormSubmiting() {
  const[input,setInput]=useState("")
  const[text,setText]=useState("")
  const ans=api.crudApi.add.useMutation()
  const handleSubmit=()=>{
  ans.mutateAsync({title:input,description:text})
    console.log(ans)
  }
  return (
    <div>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit} >
        <input className='mb-10 border w-28' type='text' value={input} onChange={(event)=>{setInput(event.target.value)}} />
        <textarea value={text} className='border w-28' onChange={(event)=>{setText(event.target.value)}}/>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}
