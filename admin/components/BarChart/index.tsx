import "chart.js/auto";
import { ChartArea, ChartData } from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { ChartJSOrUndefined } from "react-chartjs-2/dist/types";
import { useIntl } from "react-intl";

interface BarChartProps {
  data: Record<string, number>;
}

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, "#0377a5");
  gradient.addColorStop(1, "#6fd6ff");

  return gradient;
}

export default function BarChart({ data }: BarChartProps) {
  const intl = useIntl();

  const chartRef = useRef<ChartJSOrUndefined<"bar", number[], string>>();
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        borderRadius: 10,
        // backgroundColor: "#6fd6ff",
      },
    ],
  });

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = chartRef.current;

    const gradient = createGradient(chart.ctx, chart.chartArea);

    setChartData({
      ...chartData,
      datasets: chartData.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: gradient,
      })),
    });
  }, []);

  return (
    <Bar
      ref={chartRef}
      data={chartData}
      options={{
        animation: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#9c9c9c",
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      }}
    />
  );
}
