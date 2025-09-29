"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", salinity: 35.2, depth: 0 },
  { month: "Feb", salinity: 35.8, depth: 50 },
  { month: "Mar", salinity: 36.1, depth: 100 },
  { month: "Apr", salinity: 36.5, depth: 200 },
  { month: "May", salinity: 36.2, depth: 300 },
  { month: "Jun", salinity: 35.9, depth: 500 },
];

const chartConfig = {
  salinity: {
    label: "Salinity",
    color: "hsl(var(--chart-4))",
  },
};

export function SalinityChart() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl overflow-hidden backdrop-blur-sm flex flex-col">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <h3 className="text-sm font-semibold text-white">Salinity Profiles by Depth</h3>
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-chart-4 shadow-sm"></div>
            <span className="text-slate-300">Salinity (PSU)</span>
          </div>
        </div>
      </div>
      <div className="w-full flex-1 min-h-0">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#475569" opacity={0.5} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs"
              tick={{ fill: '#cbd5e1', fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs"
              domain={['dataMin - 0.2', 'dataMax + 0.2']}
              tick={{ fill: '#cbd5e1', fontSize: 12 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="salinity"
              type="monotone"
              stroke="var(--color-salinity)"
              strokeWidth={3}
              dot={{
                fill: "var(--color-salinity)",
                strokeWidth: 2,
                stroke: "#1e293b",
                r: 6,
              }}
              activeDot={{
                r: 8,
                stroke: "var(--color-salinity)",
                strokeWidth: 2,
                fill: "#1e293b",
              }}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
}