"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// The DailyReport component with dynamic chart data
const DailyReport = ({ totalEmployees, activeCount, inactiveCount,isLoading }) => {
  // Update chartData using props
  const chartData = [
    { category: "total", count: totalEmployees, fill: "var(--color-total)" },
    { category: "active", count: activeCount, fill: "var(--color-active)" },
    { category: "inactive", count: inactiveCount, fill: "var(--color-inactive)" },
  ];

  const chartConfig = {
    count: {
      label: "Count",
    },
    total: {
      label: "Total",
      color: "#2563eb",
    },
    active: {
      label: "Active",
      color: "#22c55e",
    },
    inactive: {
      label: "Inactive",
      color: "#F97316",
    },
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip bg-gray-200 p-2 shadow-lg rounded">
          <p className="label text-black">{`${chartConfig[data.category].label}: ${data.count}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[200px]"
        >
          <PieChart className="pointor">
            <Tooltip content={<CustomTooltip />} />
            <Pie data={chartData} dataKey="count" nameKey="category">
              <LabelList
                dataKey="category"
                position="inside"
                stroke="none"
                formatter={(value) => chartConfig[value]?.label}
                fill="white" // Text inside the pie chart
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-xl text-black">
        <div className="flex items-center gap-2 font-bold leading-none">
          Daily Report
        </div>
      </CardFooter>
    </Card>
  );
};

export default DailyReport;
