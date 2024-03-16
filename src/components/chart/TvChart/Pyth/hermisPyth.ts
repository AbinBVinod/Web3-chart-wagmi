import { PriceServiceConnection, PriceFeed } from '@pythnetwork/price-service-client';
import { BigNumber } from '@ethersproject/bignumber';

interface HermesPrice {
  price: { value: string; decimals: number };
  timestamp: number;
}

const priceIdsMap: Record<string, string> = {
  "e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43": "BTC/USD",
  "ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace": "ETH/USD",
  "9d4294bbcd1174d6f2003ec365831e64cc31d9f6f15a2b85399db8d5000960f6": "WETH/USD",
  "c9d8b075a5c69303365ae23633d4e085199bf5c520a3b90fed1322a0342ffc33": "WBTC/USD",
  "8ac0c70fff57e9aefdf5edf44b51d62c2d433653cbb2cf5cc06bb115af04d221": "LINK/USD",
  "78d185a741d07edb3412b09008b7c5cfb9bbbd7d568bf00ba737b456ba171501": "UNI/USD",
  "eaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a": "USDC.e/USD",
  "2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b": "USDT/USD",
  "b0948a5e5313200c632b51bb5ca32f6de0d36e9950a942d19751e833f70dabfd": "DAI/USD",
  "c3d5d8d6d17081b3d0bbca6e2fa3a6704bb9a9561d9f9e1dc52db47629f862ad": "FRAX/USD"
};

const priceIds = Object.keys(priceIdsMap);

const connection = new PriceServiceConnection("https://hermes.pyth.network", {
  priceFeedRequestConfig: {
    binary: true,
  },
});

let isHermesStreamingOn: boolean = false;
let hermesPricesMap: Record<string, HermesPrice> = {};

function formatPrice(price: string, expo: number): string {
  const priceNum = Number(price);
  const adjustedPrice = priceNum * Math.pow(10, expo);
  const formattedPrice = adjustedPrice.toFixed(2);
  return formattedPrice;
}

export function startHermesStreaming(callback: (symbol: string, price: string) => void, retries: number = 10, delay: number = 3000): void {
  console.log('\[HERMES\] price streaming started');
  if (!isHermesStreamingOn) {
    try {
      isHermesStreamingOn = true;
      connection.subscribePriceFeedUpdates(priceIds, (priceFeed: PriceFeed) => {
        const price = priceFeed.getPriceNoOlderThan(60);
        if (price) {
          const symbol: string | undefined = priceIdsMap[priceFeed.id];
          if (symbol) {
            let pythPrice: string = BigInt(price.price).toString();
            // Use the correct property name 'expo' as indicated
            const formattedPythPrice = formatPrice(pythPrice, price.expo);
            callback(symbol, formattedPythPrice);
            console.log('\[HERMES\] price updated', symbol, ': ', formattedPythPrice);
          }
        }
      });
    } catch (error) {
      console.error('\[HERMES\] Error fetching from the streaming endpoint:', error);
      attemptReconnect(retries, delay);
    }
  } else {
    console.log('\[HERMES\] Streaming already running.');
  }

  function attemptReconnect(retriesLeft: number, inDelay: number): void {
    isHermesStreamingOn = false;
    if (retriesLeft > 0) {
      console.log(`\[HERMES\] Attempting to reconnect in ${inDelay}ms...`);
      setTimeout(() => {
        startHermesStreaming(callback, retriesLeft - 1, inDelay);
      }, inDelay);
    } else {
      console.error('\[HERMES\] Maximum reconnection attempts reached.');
    }
  }
}