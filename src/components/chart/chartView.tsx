import React, { useEffect, useRef } from 'react';
import { createChart, DeepPartial, ChartOptions } from 'lightweight-charts';

interface ChartProps {

}

const ChartComponent: React.FC<ChartProps> = (props) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chart:any;
    if (chartContainerRef.current) {
      chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 300,
        layout: {
          backgroundColor: '#000000',
          textColor: 'rgba(255, 255, 255, 0.9)',
        },
        grid: {
          vertLines: {
            color: 'rgba(197, 203, 206, 0.5)',
          },
          horzLines: {
            color: 'rgba(197, 203, 206, 0.5)',
          },
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
      } as DeepPartial<ChartOptions>);

      const areaSeries = chart.addAreaSeries({
        topColor: 'rgba(33, 150, 243, 0.56)',
        bottomColor: 'rgba(33, 150, 243, 0.04)',
        lineColor: 'rgba(33, 150, 243, 1)',
        lineWidth: 2,
      });

      areaSeries.setData([
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
      ]);
    }

    return () => {
      if (chart) {
        chart.remove();
      }
    };
  }, []);

  return <div ref={chartContainerRef} style={{ width: '100%', height: '300px' }} />;
};

export default ChartComponent;
