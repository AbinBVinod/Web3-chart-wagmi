"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Cwm from "./customwallet.module.css";
import Walletoption from "./walop.svg";
import Frame from "./frame.svg";
import Image from "next/image";

export const CustomWallet = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                  </button>

                  <span
                    onClick={openChainModal}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: 72,
                      height: 40,
                      borderRadius: 10,
                      background: "#151926",
                      border: "1px solid #1B2033",
                      gap: 10,
                      cursor: "pointer",
                    }}
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 20,
                          height: 20,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginLeft: 10,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{
                              width: 20,
                              height: 20,
                            }}
                          />
                        )}
                      </div>
                    )}
                    <Image className={Cwm.imageDot} src={Walletoption} alt="Wallet Option"  />
                  </span>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
