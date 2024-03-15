"use client";
import React from "react";
import tvc from "./Tradingview.module.css";
import { CustomWallet } from "../components/wallet/CustomWallet";
import { useAccount, useBalance } from "wagmi";
import { formatEther } from "viem";



export default function WalletViewPage() {
  const { address, chainId, connector, chain } = useAccount();
  const { data: walletBalance } = useBalance({ address });


  const shortenAddress = (address: string) => {
    return `${address.substring(0, 10)}...${address.substring(
      address.length - 4
    )}`;
  };

  interface TokenPrps {
    name: string;
    address: string;
  }

  const TokenName: TokenPrps[] = [
    {
      name: "USDC",
      address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    },
    {
      name: "BTC",
      address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    },
  ];




  return (
    <>
      <div className={tvc.main}>
        <CustomWallet />
        <div className={tvc.conBal}>
          {/* wallet connected data */}
          <div className={tvc.cont}>
            <h1>Wallet</h1>
            <div className={tvc.chart}>
              {address && <p>Address: {shortenAddress(address)}</p>}
              {chainId && <p>Chain ID: {chainId}</p>}
              {connector && <p>Connector: {connector.name}</p>}
              {chain && <p>Chain: {chain.name}</p>}
            </div>
          </div>
          {/* balance of connected wallet */}
          <div className={tvc.balance}>
            <h1>Balance</h1>
            <p>ETH: {walletBalance ? formatEther(walletBalance.value) : "0"}</p>
          </div>
        </div>
        {/* Test for custom Token addres */}
        <div className={tvc.TokenDataAll}>
          <h1>Custom Token Balance</h1>
          {TokenName.map((TokenAdd, index) => (
            <div key={index}>
              <div className={tvc.tokenall}>
                <p>
                   {TokenAdd.name}
                  <span> {TokenAdd.address}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
