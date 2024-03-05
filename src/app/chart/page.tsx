"use client"
import React from 'react'
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  ChartingLibraryWidgetOptions,
  ResolutionString,
} from "@/components/chart/charting_library/charting_library";

const defaultWidgetProps: Partial<ChartingLibraryWidgetOptions> = {
  symbol: "AAPL",
  interval: "1D" as ResolutionString,
  library_path: "@/components/chart/charting_library/charting_library",
  locale: "en",
  charts_storage_url: "https://saveload.tradingview.com",
  charts_storage_api_version: "1.1",
  client_id: "tradingview.com",
  user_id: "public_user_id",
  fullscreen: false,
  autosize: true,
};

const TVChartContainer = dynamic(
  () =>
    import("@/components/chart/TvChart").then((mod) => mod.TVChartContainer),
  { ssr: false }
);

export default function page() {
  const [isScriptReady, setIsScriptReady] = useState(false);
  return (
    <>
    <div className='flex justify-center mt-8 text-4xl font-bold gap-7'>
        <h1>Trading Chart</h1>
        {isScriptReady && <TVChartContainer {...defaultWidgetProps} />}
    </div>
    </>
  )
}
