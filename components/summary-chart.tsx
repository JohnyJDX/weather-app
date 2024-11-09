'use client'

import { Forecast5days } from '@/app/types/forecast5days'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

const chartConfig = {
  temp: {
    label: 'Temperature',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

interface ForecastDailyProps {
  forecast5days: Forecast5days
}
const SummaryChart: React.FC<ForecastDailyProps> = ({ forecast5days }) => {
  const [chartData, setChartData] = useState<{ time: string; temp: number }[]>(
    [],
  )

  useEffect(() => {
    if (forecast5days && forecast5days.list) {
      const data = forecast5days.list.map((forecast) => ({
        time: format(new Date(forecast.dt * 1000), 'EEE HH:mm'),
        temp: Math.round(forecast.main.temp),
      }))
      setChartData(data)
    }
  }, [forecast5days])

  return (
    <ChartContainer config={chartConfig} className="h-60 w-full">
      <AreaChart
        accessibilityLayer
        data={chartData.slice(0, 14)}
        margin={{
          top: 20,
          left: 31,
          right: 25,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="time" tickMargin={8} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="w-[180px]"
              formatter={(value, name) => (
                <>
                  <div
                    className="size-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                    style={
                      {
                        '--color-bg': `var(--color-${name})`,
                      } as React.CSSProperties
                    }
                  />
                  {chartConfig[name as keyof typeof chartConfig]?.label || name}
                  <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                    {value}
                    <span className="font-normal text-muted-foreground">
                      °C
                    </span>
                  </div>
                </>
              )}
            />
          }
          cursor={false}
          defaultIndex={1}
        />
        <Area
          dot={{ strokeWidth: 2 }}
          label={{
            fill: 'hsl(var(--foreground))',
            fontSize: 14,
            position: 'top',
            formatter: (value: number) => `${value}°C`,
          }}
          animationDuration={1500}
          animationEasing="ease-out"
          animationBegin={500}
          dataKey="temp"
          type="natural"
          fill="var(--color-temp)"
          fillOpacity={0.4}
          stroke="var(--color-temp)"
        />
      </AreaChart>
    </ChartContainer>
  )
}

export default SummaryChart
