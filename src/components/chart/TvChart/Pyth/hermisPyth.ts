import { PriceServiceConnection, PriceFeed } from '@pythnetwork/price-service-client';

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
  "c3d5d8d6d17081b3d0bbca6e2fa3a6704bb9a9561d9f9e1dc52db47629f862ad": "FRAX/USD",
  "ef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d": "SOL/USD",
  "93da3352f9f1d105fdfe4971cfa80e9dd777bfc5d0f683ebb6e1294b92137bb7": "AVAX/USD",
  "2b9ab1e972a281585084148ba1389800799bd4be63b957507db1349314e47445": "AAVE/USD",
  "5de33a9112c2b700b8d30b8a3402c103578ccfa2765696471cc672bd5cf6ac52": "MATIC/USD",
  "765d2ba906dbc32ca17cc11f5310a89e9ee1f6420508c63861f2f8ba4ee34bb2": "XAU/USD",
  "f2fb02c32b055c805e7238d628e5e9dadef274376114eb1f012337cabe93871e": "XAG/USD",
  "a995d00bb36a63cef7fd2c287dc105fc8f3d93779f062f09551b0af3e81ec30b": "EUR/USD",
  "15add95022ae13563a11992e727c91bdb6b55bc183d9d747436c80a483d8c864":"APE/USD",
  "6489800bb8974169adfe35937bf6736507097d13c190d760c557108c7e93a81b":"DYDX/USD",
  "2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f":"BNB/USD",
  "dcef50dd0a4cd2dcc17e45df1676dcb336a11a61c69df7a0299b0150c672d25c": "DOGE/USD",
  "385f64d993f7b77d8182ed5003d97c60aa3361f3cecfe711544d2d59165e9bdf": "OP/USD",
  "3fa4252848f9f0a1480be62745a4629d9eb1322aebab8a791e344b3b9c1adcf5": "ARB/USD",
  "8ff1200345393bb25be4f4eeb2d97234e91f7e6213f3745a694b1436e700f271": "ATOM/ATOM",
  "5c6c0d2386e3352356c3ab84434fafb5ea067ac2678a38a338c4a69ddc4bdb0c": "FTM/USD",
  "c415de8d2eba7db216527dff4b60e8f3a5311c740dadb233e13e12547e226750": "NEAR/USD",
  "2fb245b9a84554a0f15aa123cbb5f64cd263b59e9a87d80148cbffab50c69f30": "FLOW/USD",
  "b7e3904c08ddd9c0c10c6d207d390fd19e87eb6aab96304f571ed94caebdefa0":"AXS/USD",
  "67a6f93030420c1c9e3fe37c1ab6b77966af82f995944a9fefce357a22854a80":"AUD/USD",
  "84c2dde9633d93d1bcad84e7dc41c9d56578b7ec52fabedc1f335d673df0a7c1":"GBP/USD",
  "2a01deaec9e51a579277b34b122399984d0bbf57e2458a7e42fecd2829867a0d": "ADA/USD",
  "03ae4db29ed4ae33d323568895aa00337e658e348b37509f5372ae51f0af00d5": "APT/USD",
  "3dd2b63686a450ec7290df3a1e0b583c0481f651351edfa7636f39aed55cf8a3": "BCH/USD",
  "a19d04ac696c7a6616d291c7e5d1377cc8be437c327b75adb5dc1bad745fcae8":"CRV/USD",
  "150ac9b959aee0051e4091f0ef5216d941f590e1c5e7f91cf7635b5c11628c0e": "FIL/USD",
  "b962539d0fcb272a494d65ea56f94851c2bcf8823935da05bd628916e2e9edbf": "GMX/USD",
  "c63e2a7f37a04e5e614c07238bedb25dcc38927fba8fe890597a593c0b2fa4ad": "LDO/USD",
  "6e3f3fa8253588df9326580180233eb791e03b443a3ba7a1d892e73874e19a54": "LTC/USD",
  "f0d57deca57b3da2fe63a493f4c25925fdfd8edf834b20f93e1f84dbd1504d4a" : "SHIB/USD",
  "23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744": "SUI/USD",
  "d69731a2e74ac1ce884fc3890f7ee324b6deb66147055249568869ed700882e4": "PEPE/USD",
  "856aac602516addee497edf6f50d39e8c95ae5fb0da1ed434a8c2ab9c3e877e9": "BLUR/USD",
  "ec5d399846a9209f3fe5881d70aae9268c94339ff9817e8d18ff19fa05eea1c8": "XRP/USD",
  "ca3eed9b267293f6595901c734c7525ce8ef49adafe8284606ceb307afa2ca5b":"DOT/USD",
  "67aed5a24fdad045475e7195c98a98aea119c763f272d4523f5bac93a4f33c2b": "TRX/USD",
  "6b1381ce7e874dc5410b197ac8348162c0dd6c0d4c9cd6322672d6c2b1d58293": "FLOKI/USD",
  "7a5bc1d2b56ad029048cd63964b3ad2776eadf812edc1a43a31406cb54bff592": "INJ/USD",
  "846ae1bdb6300b817cee5fdee2a6da192775030db5615b94a465f53bd40850b5": "STETH/USD"

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
  // console.log('\[HERMES\] price streaming started');
  if (!isHermesStreamingOn) {
    try {
      isHermesStreamingOn = true;
      connection.subscribePriceFeedUpdates(priceIds, (priceFeed: PriceFeed) => {
        const price = priceFeed.getPriceNoOlderThan(60);
        if (price) {
          const symbol: string | undefined = priceIdsMap[priceFeed.id];
          if (symbol) {
            let pythPrice: string = BigInt(price.price).toString();
            const formattedPythPrice = formatPrice(pythPrice, price.expo);
            callback(symbol, formattedPythPrice);
            // console.log('\[HERMES\] price updated', symbol, ': ', formattedPythPrice);
          }
        }
      });
    } catch (error) {
      console.error('\[HERMES\] Error fetching from the streaming endpoint:', error);
      attemptReconnect(retries, delay);
    }
  } else {
    // console.log('\[HERMES\] Streaming already running.');
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