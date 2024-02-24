import { ColorType, createChart } from "lightweight-charts";
import React, { useEffect, useRef } from "react";

function ChartView() {
  const chartContainerRef = useRef();

  useEffect(() => {
    const initialData = [
      { time: "2021-04-11", value: 80.01 },
      { time: "2021-04-12", value: 96.63 },
      { time: "2021-04-13", value: 76.64 },
      { time: "2021-04-14", value: 81.89 },
      { time: "2021-04-15", value: 74.43 },
      { time: "2021-04-16", value: 80.01 },
      { time: "2021-04-17", value: 96.63 },
      { time: "2021-04-18", value: 76.64 },
      { time: "2021-04-19", value: 81.89 },
      { time: "2021-04-20", value: 74.43 },
    ];

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "white" },
      },
      width: 400,
      height: 300,
    });
    const newSeries = chart.addLineSeries({
      lineColor: "#2962FF",
      topColor: "#2962FF",
      bottomColor: "rgba(41,98,255, 0.28)",
    });

    newSeries.setData(initialData);
  }, []);

  return (
    <>
      <div></div>
    </>
  );
}

export default ChartView;
