"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";

const EveningShift = ({ totalEveningEmployees, totalInactiveEvening }) => {
  // Filter out categories with a count of 0
  const chartData = [
    { category: "active", count: totalEveningEmployees, fill: "var(--color-active)" },
    { category: "inactive", count: totalInactiveEvening, fill: "var(--color-inactive)" },
  ].filter(data => data.count > 0);

  const chartConfig = {
    count: {
      label: "Count",
    },
    active: {
      label: "Active",
      color: "#22c55e",
    },
    inactive: {
      label: "Inactive",
      color: "#f97316",
    },
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip bg-white p-2 shadow-lg rounded">
          <p className="label">{`${chartConfig[data.category].label}: ${
            data.count
          }`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <Card className="flex flex-col">
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[200px]"
          >
            <PieChart className="pointer">
              <Tooltip content={<CustomTooltip />} />
              <Pie data={chartData} dataKey="count" nameKey="category" outerRadius={80} fill="#8884d8">
                <LabelList
                  dataKey="category"
                  position={chartData.length === 1 ? "center" : "inside"}
                  stroke="none"
                  formatter={(value) => chartConfig[value]?.label}
                  fill="white" 
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-xl text-black">
          <div className="flex items-center gap-2 font-bold leading-none">
            Evening Report
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EveningShift;
