
"use client"
import React, { useEffect, useRef } from 'react';
import { createChart, IChartApi, LineSeriesPartialOptions, ISeriesApi, ColorType } from 'lightweight-charts';

interface ChartViewProps {
  width?: number;
  height?: number;
}

const ChartView: React.FC<ChartViewProps> = ({ width = 400, height = 300 }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const initialData = [
      { time: '2021-04-11', value: 80.01 },
      { time: '2021-04-12', value: 96.63 },
      { time: '2021-04-13', value: 76.64 },
      { time: '2021-04-14', value: 81.89 },
      { time: '2021-04-15', value: 74.43 },
      { time: '2021-04-16', value: 80.01 },
      { time: '2021-04-17', value: 96.63 },
      { time: '2021-04-18', value: 76.64 },
      { time: '2021-04-19', value: 81.89 },
      { time: '2021-04-20', value: 74.43 },
    ];

    const chart: IChartApi = createChart(chartContainerRef.current, {
      width,
      height,
      layout: {
        background: { type: ColorType.Solid, color: 'white' },
      },
    });

    const seriesOptions: LineSeriesPartialOptions = {
      color: '#2962FF',
      lineWidth: 2,
    };

    const lineSeries: ISeriesApi<'Line'> = chart.addLineSeries(seriesOptions);
    lineSeries.setData(initialData);

    return () => chart.remove();
  }, [width, height]);
  return <div ref={chartContainerRef} style={{ width: '100%', height: `${height}px` }} />;
};

export default ChartView;
