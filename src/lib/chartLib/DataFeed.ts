
import {
    HistoryCallback,
    IBasicDataFeed,
    LibrarySymbolInfo,
    OnReadyCallback,
    PeriodParams,
    ResolutionString,
    SearchSymbolsCallback,
    SubscribeBarsCallback,
  } from '../../../public/tradingview/charting_library'
  
  const myCustomData = [
    // { time: UNIX_TIMESTAMP, open: NUMBER, high: NUMBER, low: NUMBER, close: NUMBER, volume: NUMBER },
    { time: 1609459200, open: 1, high: 5, low: 0.5, close: 4, volume: 100 },
    // More candlestick objects as needed
  ];
  
  const supportedResolutions = [
    '1', '5', '15', '30', '60', '120', '240', '480', '720', '1D', '3D', '7D', '30D',
  ] as ResolutionString[];
  
  const config = {
    supports_search: false,
    supports_group_request: true,
    supported_resolutions: supportedResolutions,
  };
  
  const DataFeedFactory = (
    chartScale: number,
  ): IBasicDataFeed => {
    return {
      onReady: (cb: OnReadyCallback) => {
        setTimeout(() => cb(config), 0);
      },
      resolveSymbol: (symbolName: string, onSymbolResolvedCallback: (symbolInfo: LibrarySymbolInfo) => void) => {
        const symbolInfo: LibrarySymbolInfo = {
          ticker: symbolName,
          name: symbolName,
          description: '',
          type: 'crypto',
          session: '24x7',
          timezone: 'Etc/UTC',
          exchange: '',
          minmov: 1,
          pricescale: chartScale,
          has_intraday: true,
          intraday_multipliers: supportedResolutions,
          supported_resolutions: supportedResolutions,
          volume_precision: 2,
          data_status: 'streaming',
          full_name: symbolName,
          listed_exchange: '',
          format: 'price' 
        };
        onSymbolResolvedCallback(symbolInfo);
      },
      
      getBars: function (
        symbolInfo: LibrarySymbolInfo,
        resolution: ResolutionString,
        periodParams: PeriodParams,
        onHistoryCallback: HistoryCallback,
        onErrorCallback: (error: string) => void
      ) {
        const bars = myCustomData.filter(bar =>
          bar.time >= periodParams.from && bar.time < periodParams.to
        ).map(bar => ({
          ...bar,
          time: bar.time * 1000, // Convert UNIX timestamp to milliseconds
        }));
  
        if (bars.length) {
          onHistoryCallback(bars, { noData: false });
        } else {
          onHistoryCallback([], { noData: true });
        }
      },
      subscribeBars: (
        symbolInfo: LibrarySymbolInfo,
        resolution: ResolutionString,
        onTick: SubscribeBarsCallback
      ) => {
        // subscription logic if needed for real-time updates
      },
      unsubscribeBars: (subscriberUID: string) => {
        // unsubscription logic if needed
      },
      searchSymbols: (
        userInput: string,
        exchange: string,
        symbolType: string,
        onResult: SearchSymbolsCallback
      ) => {
        // search functionality if needed
        onResult([]);
      },
    };
  };
  
  export default DataFeedFactory;
  