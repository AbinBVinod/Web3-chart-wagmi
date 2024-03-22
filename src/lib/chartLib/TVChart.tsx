import React, { useEffect, useRef } from 'react';
import {
  widget as TradingViewWidget,
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
} from '../../../public/tradingview/charting_library';
import DataFeedFactory from './DataFeed';


type ResolutionString = '1D' | '1W' | '1M'; 

export type ChartProps = {
  symbol: string;
  interval: any;
  containerId: string;
  libraryPath: string;
  fullscreen: boolean;
  autosize: boolean;
  studiesOverrides: Record<string, any>;
};

export const TVChart: React.FC<ChartProps> = ({
  symbol,
  interval,
  containerId,
  libraryPath,
  fullscreen,
  autosize,
  studiesOverrides,
}) => {
  const chartContainerRef = useRef<IChartingLibraryWidget | null>(null);

  useEffect(() => {
    const chart = new TradingViewWidget({
      symbol,
      interval,
      container: containerId,
      library_path: libraryPath,
      locale: 'en',
      fullscreen,
      autosize,
      studies_overrides: studiesOverrides,
      datafeed: DataFeedFactory(1), 
    });

    chart.onChartReady(() => {
      console.log('Chart is ready');
    });

    chartContainerRef.current = chart;

    return () => {
      if (chartContainerRef.current) {
        chartContainerRef.current.remove();
        chartContainerRef.current = null;
      }
    };
  }, [symbol, interval, fullscreen, autosize, studiesOverrides]);

  return <div id={containerId} />;
};
