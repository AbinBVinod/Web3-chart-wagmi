import React, { useEffect, useState } from 'react';
import { startHermesStreaming } from './hermisPyth';

interface Price {
  symbol: string;
  price: string;
}

const PriceStreamer: React.FC = () => {
  const [prices, setPrices] = useState<Price[]>([]);

  useEffect(() => {
    const handlePriceUpdate = (symbol: string, price: string) => {
      setPrices((prevPrices) => {
        const existingPriceIndex = prevPrices.findIndex((p) => p.symbol === symbol);
        if (existingPriceIndex !== -1) {
          const newPrices = [...prevPrices];
          newPrices[existingPriceIndex] = { symbol, price };
          return newPrices;
        } else {
          return [...prevPrices, { symbol, price }];
        }
      });
    };

    startHermesStreaming(handlePriceUpdate);

    return () => {
    };
  }, []);

  return (
    <div>
      <h2>Live Prices</h2>
      <ul>
        {prices.map((price) => (
          <li key={price.symbol}>
            {price.symbol}: {price.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceStreamer;