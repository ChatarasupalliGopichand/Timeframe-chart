import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

interface ChartProps {
  data: { timestamp: string; value: number }[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const handleClick = (data: any) => {
    alert(`Timestamp: ${data.activePayload[0].payload.timestamp}\nValue: ${data.activePayload[0].payload.value}`);
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} onClick={handleClick}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
