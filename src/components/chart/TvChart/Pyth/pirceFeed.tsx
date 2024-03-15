import React, { useEffect, useState } from 'react';
import { PriceServiceConnection } from '@pythnetwork/price-service-client';

const PriceFeedDisplay = () => {
  const [btcPrice, setBtcPrice] = useState<string | null>(null);
  const [ethPrice, setEthPrice] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const connection = new PriceServiceConnection(
        "https://hermes.pyth.network",
        {
          priceFeedRequestConfig: {
            binary: true,
          },
        }
      );
      const priceIds = [
        "e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
        "ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
      ];

      try {
        const currentPrices = await connection.getLatestPriceFeeds(priceIds);
        if (currentPrices) {
          // console.log("Current Prices:", currentPrices);

          currentPrices.forEach(priceFeed => {
            const priceInfo = priceFeed.getPriceNoOlderThan(60);
            if (priceInfo) {
              // console.log(`Received update for ${priceFeed.id}: ${priceInfo.price}`);

              const formattedPrice = formatPrice(priceInfo.price, priceInfo.expo);
              if (priceFeed.id === priceIds[0]) {
                setBtcPrice(formattedPrice);
              } else if (priceFeed.id === priceIds[1]) {
                setEthPrice(formattedPrice);
              }
            }
          });
        } else {
          console.error("No current prices were fetched.");
        }
      } catch (error) {
        console.error("Error fetching price feeds:", error);
      } finally {
        connection.closeWebSocket();
      }
    };

    const interval = setInterval(fetchData , 500); 

    return () => clearInterval(interval);
  }, []);

  function formatPrice(price: string, expo: number): string {
    const priceNum = Number(price);
    const adjustedPrice = priceNum * Math.pow(10, expo);
    const formattedPrice = adjustedPrice.toFixed(2);
    return formattedPrice;

  }

  return (
    <div>
      <h1 className='mb-[10px]'>Price Feeds</h1>
      <p>BTC/USD: {btcPrice ?? 'Loading...'}</p>
      <p>ETH/USD: {ethPrice ?? 'Loading...'}</p>
    </div>
  );
};

export default PriceFeedDisplay;