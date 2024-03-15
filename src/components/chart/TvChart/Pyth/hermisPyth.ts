import { PriceServiceConnection, PriceFeed } from '@pythnetwork/price-service-client';

interface HermesPrice {
  price: {
    value: string;
    decimals: number;
  };
  timestamp: number;
}

const priceIds: string[] = [
  "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
  "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
];

const priceIdsMap: Record<string, string> = {
  "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43": "BTC/USD",
  "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace": "ETH/USD",
};

// Initialize PriceServiceConnection
const connection = new PriceServiceConnection("https://hermes.pyth.network", {
  priceFeedRequestConfig: {
    binary: true,
  },
});

let isHermesStreamingOn: boolean = false;
let hermesPricesMap: Record<string, HermesPrice> = {};

export function startHermesStreaming(callback: (symbol: string, price: string) => void, retries: number = 10, delay: number = 3000): void {
  console.log('[HERMES] price streaming started');

  if (!isHermesStreamingOn) {
    try {
      isHermesStreamingOn = true;
      connection.subscribePriceFeedUpdates(priceIds, (priceFeed: PriceFeed) => {
        const price = priceFeed.getPriceNoOlderThan(60);
        if (price) {
          const symbol: string | undefined = priceIdsMap[priceFeed.id];
          if (symbol) {
            let pythPrice: string = BigInt(price.price).toString();
            callback(symbol, pythPrice);
            console.log('[HERMES] price updated', symbol, ': ', pythPrice);
          }
        }
      });
    } catch (error) {
      console.error('[HERMES] Error fetching from the streaming endpoint:', error);
      attemptReconnect(retries, delay);
    }
  } else {
    console.log('[HERMES] Streaming already running.');
  }

  function attemptReconnect(retriesLeft: number, inDelay: number): void {
    isHermesStreamingOn = false;
    if (retriesLeft > 0) {
      console.log(`[HERMES] Attempting to reconnect in ${inDelay}ms...`);
      setTimeout(() => {
        startHermesStreaming(callback, retriesLeft - 1, inDelay);
      }, inDelay);
    } else {
      console.error('[HERMES] Maximum reconnection attempts reached.');
    }
  }
}
