import React from 'react'

const page = () => {
  return (
    <div>
      <div className='text-4xl'>Home</div>
      <div className='bg-[#D9D9D9]'>
        <div className='pl-5 py-3 text-2xl font-bold text-black'>1on1スケジュールテーブル</div>
        <div className='flex justify-between gap-x-10 px-16 py-10'>  {/* justify-between で均等に配置 */}
          <div className='px-[125px] py-[300px] bg-black'>a</div>
          <div className='px-[125px] py-[300px] bg-black'>a</div>
          <div className='px-[125px] py-[300px] bg-black'>a</div>
          <div className='px-[125px] py-[300px] bg-black'>a</div>
        </div>
      </div>
    </div>
  )
}

export default page
