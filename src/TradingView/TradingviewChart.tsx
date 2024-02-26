"use client"
import React from 'react'
import tvc from './Tradingview.module.css'
import { CustomWallet } from "../components/wallet/CustomWallet"
import ChartView from "./TradingviewChart"



export default function TradingViewPage() {
  return (
    <>
      <div className={tvc.main}>
        <CustomWallet />
        <div className={tvc.cont}>
          <h1>Trading View Chart</h1>
          <div className={tvc.chart}>
            {/* <ChartView/>  */}
          </div>
        </div>
      </div>
    </>
  );
}
