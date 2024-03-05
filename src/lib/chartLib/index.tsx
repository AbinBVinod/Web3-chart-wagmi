import dynamic from 'next/dynamic';
import { ChartProps } from './TVChart';
export * from './TVChart';

const TVChartContainer = dynamic(() => import('./TVChart').then((mod) => mod.TVChart), {
  ssr: false,
});

const ChartPage: React.FC<ChartProps> = (props) => {
  return <TVChartContainer {...props} />;
};

export default ChartPage;
