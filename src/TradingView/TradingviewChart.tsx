"use client"
import React from 'react'
import tvc from './Tradingview.module.css'
import { CustomWallet } from "../components/wallet/CustomWallet"
// import ChartComponent from "./TradingviewChart"
import { useAccount } from 'wagmi'
import { useSigner } from 'wagmi';



export default function TradingViewPage() {
  const { address, chainId , connector, chain } = useAccount();

  const shortenAddress = (address:string) => {
    return `${address.substring(0, 10)}...${address.substring(address.length - 4)}`;
  };

  return (
    <>
      <div className={tvc.main}>
        <CustomWallet />
        <div className={tvc.cont}>
          <h1>Wallet</h1>
          <div className={tvc.chart}>
            {address && (
              <p>Address: {shortenAddress(address)}</p>
            )}
            {chainId && (
              <p>Chain ID: {chainId}</p>
            )}
            {connector && (
              <p>Connector: {connector.name}</p>
            )}
            {chain && (
              <p>Chain: {chain.name}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
