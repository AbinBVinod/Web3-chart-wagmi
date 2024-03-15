"use client"
import React from 'react'
import PriceFeedDisplay from "@/components/chart/TvChart/Pyth/pirceFeed"


export default function page() {
  // const [isScriptReady, setIsScriptReady] = React.useState(false);
  return (
    <>
    <div className='flex justify-center mt-8 text-4xl font-bold gap-7'>
        <h1>Trading Chart Pyth</h1>
    </div> 
    <div className='ml-[100px]'>
         <PriceFeedDisplay />
    </div>
        <div className='flex justify-start ml-[280px] mt-9 flex-col'>
          <h1 className='text-xl'>Trading Chart</h1>
          </div>
          
          <div className='flex justify-center'>Chart here</div>
    </>
  )
}
