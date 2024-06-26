import React, { useEffect, useState, useRef } from 'react';
import Chart from './components/Chart';
import data from './data/data.json';
import { toPng } from 'html-to-image';

const App: React.FC = () => {
  const [chartData, setChartData] = useState<{ timestamp: string; value: number }[]>([]);
  const [timeframe, setTimeframe] = useState<string>('daily');
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChartData(data);
  }, []);

  const filterDataByTimeframe = (timeframe: string) => {
    // Implement data filtering logic based on the selected timeframe
    // For simplicity, let's assume data is already filtered
    return data;
  };

  const handleTimeframeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeframe(e.target.value);
    setChartData(filterDataByTimeframe(e.target.value));
  };

  const handleExport = () => {
    if (chartRef.current === null) {
      return;
    }

    toPng(chartRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'chart.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <h1>My Chart</h1>
      <select value={timeframe} onChange={handleTimeframeChange}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <button onClick={handleExport}>Export as PNG</button>
      <div ref={chartRef}>
        <Chart data={chartData} />
      </div>
    </div>
  );
};

export default App;
