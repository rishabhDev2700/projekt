import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className='w-screen h-[80vh] grid place-items-center place-content-center'><Loader2 className='animate-spin'/></div>
  )
}
