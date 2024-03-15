"use client"
import React from 'react'
import PriceFeedDisplay from "@/components/chart/TvChart/Pyth/pirceFeed"


export default function page() {
  // const [isScriptReady, setIsScriptReady] = React.useState(false);
  return (
    <>
    <div className='flex justify-center mt-8 text-4xl font-bold gap-7'>
        <h1>Trading Chart</h1>
    </div> 
    <div>
         <h2>Pyth Price</h2>
         <PriceFeedDisplay />
    </div>
    </>
  )
}
