"use client";
import React from "react";
import { TVChartContainer } from "@/components/chart/TvChart/index"
import PriceStreamer from '@/components/chart/TvChart/Pyth/hermisPRICE';

export default function page() {
  // const [isScriptReady, setIsScriptReady] = React.useState(false);
  return (
    <>
      <div className="flex justify-center mt-8 text-4xl font-bold gap-7">
        <h1>Trading Chart Pyth</h1>
      </div>
      <div className="ml-[100px]">
        <PriceStreamer />
      </div>
      <div className="w-full">
      <TVChartContainer/>
      </div>
    </>
  );
}
