import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const SkillGapChart = ({ matchedCount, unmatchedCount }) => {
  // We restructure data to have individual bars for a cleaner look
  const data = [
    { name: "Matched Skills", value: matchedCount, color: "#10b981" },
    { name: "Missing Skills", value: unmatchedCount, color: "#f43f5e" }
  ];

  // Custom Tooltip for a "Stunning" feel
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-xl border border-slate-100 rounded-lg">
          <p className="text-sm font-bold text-slate-700">{`${payload[0].payload.name}`}</p>
          <p className="text-lg font-extrabold" style={{ color: payload[0].payload.color }}>
            {payload[0].value} <span className="text-xs text-slate-400 font-normal">Skills</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80 bg-slate-50/50 rounded-2xl border border-slate-100 p-6 transition-all hover:shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Skill Distribution
          </h2>
          <p className="text-sm text-slate-500 italic">Visualizing your compatibility</p>
        </div>
        <div className="flex gap-4">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-slate-600">Matched</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="text-xs font-medium text-slate-600">Missing</span>
            </div>
        </div>
      </div>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                dy={10}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
            
            <Bar 
                dataKey="value" 
                barSize={60} 
                radius={[10, 10, 10, 10]}
                animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SkillGapChart;
