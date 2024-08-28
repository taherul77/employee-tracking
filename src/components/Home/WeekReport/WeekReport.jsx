"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { week: "SUN", Active: 186, Inactive: 80 },
  { week: "MON", Active: 305, Inactive: 200 },
  { week: "TUE", Active: 237, Inactive: 120 },
  { week: "WED", Active: 73, Inactive: 190 },
  { week: "THU", Active: 209, Inactive: 130 },
  { week: "FRI", Active: 214, Inactive: 140 },
  { week: "SAT", Active: 214, Inactive: 140 },
];

const chartConfig = {
  Active: {
    label: "Active",
    color: "#008000",
  },
  Inactive: {
    label: "Inactive",
    color: "#ff0000",
  },
};

const WeekReport = () => {
  return (
    <>
      <ChartContainer config={chartConfig} className="h-[230px] ">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="week"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickCount={5}  // Adjust number of ticks as needed
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            ticks={[0, 100, 200, 300, 400]}  // Custom tick values
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="Active" fill="var(--color-Active)" radius={4} />
          <Bar dataKey="Inactive" fill="var(--color-Inactive)" radius={4} />
        </BarChart>
      </ChartContainer>
    </>
  );
};

export default WeekReport;
