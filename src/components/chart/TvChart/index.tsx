import styles from "./index.module.css";
import TradingViewChart from "../tradingview/TvChart"

export const TVChartContainer = () => {
	

	return (
		<>
			<header className={styles.VersionHeader}>
				<h1>
					TradingView Charting 
				</h1>
			</header>
			<div className={styles.contant}>
               Chart Here
			   <TradingViewChart/>
			</div>
		</>
	);
};
