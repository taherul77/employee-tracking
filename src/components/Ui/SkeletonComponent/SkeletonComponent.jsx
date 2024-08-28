import React from 'react'
import { Skeleton } from '../skeleton'

const SkeletonComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh] space-y-4">
    <Skeleton className="h-[125px] w-[250px] rounded-xl bg-slate-400" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px] bg-slate-400" />
      <Skeleton className="h-4 w-[200px] bg-slate-400" />
    </div>
  </div>
  )
}

export default SkeletonComponent