import React from 'react'

const Shimmer = () => {
  return (
    <div className='flex justify-center my-16 w-96 mx-145'>
        <div className="flex w-52 flex-col gap-4">
  <div className="skeleton h-32 w-full"></div>
  <div className="skeleton h-4 w-28"></div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
</div>
    </div>
  )
}

export default Shimmer