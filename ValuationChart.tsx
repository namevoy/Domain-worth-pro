import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { Language, ValuationResponse } from '../types';
import { TRANSLATIONS } from '../constants';

interface ValuationChartProps {
  data: ValuationResponse;
  language: Language;
}

const ValuationChart: React.FC<ValuationChartProps> = ({ data, language }) => {
  const t = TRANSLATIONS[language];

  const chartData = [
    { subject: t.brandability, A: data.brandabilityScore, fullMark: 100 },
    { subject: t.keywords, A: data.keywordScore, fullMark: 100 },
    { subject: t.extensions, A: data.extensionScore, fullMark: 100 },
    { subject: t.age, A: data.ageScore, fullMark: 100 },
    // Derived metric for visual balance - Market potential averaged
    { subject: t.marketTrends, A: Math.round((data.keywordScore + data.brandabilityScore) / 2), fullMark: 100 },
  ];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#4b5563', fontSize: 12 }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name={t.score}
            dataKey="A"
            stroke="#0284c7"
            strokeWidth={3}
            fill="#0ea5e9"
            fillOpacity={0.3}
          />
          <Tooltip 
             contentStyle={{ 
               backgroundColor: 'white', 
               borderRadius: '8px', 
               border: 'none', 
               boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
             }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ValuationChart;