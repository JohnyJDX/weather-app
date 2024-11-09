import { getAirPollution } from '@/app/services/air-pollution-service'
import { getСurrentWeather } from '@/app/services/current-weather-service'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import {
  Droplet,
  Eye,
  Sunrise,
  Sunset,
  Thermometer,
  Waves,
  Wind,
} from 'lucide-react'
import Card from './card'
import NumberTicker from './ui/number-ticker'
import GradualSpacing from './ui/gradual-spacing'

const TodayHightlight = async ({ lat, lon }: { lat: string; lon: string }) => {
  const airPollution = await getAirPollution(lat, lon)
  const weatherData = await getСurrentWeather(lat, lon)

  return (
    <Card className="col-span-9 p-4 sm:col-span-12 lg:col-span-9">
      <div className="flex items-start">
        <GradualSpacing
          duration={0.2}
          className="mb-2 scroll-m-20 text-left text-2xl font-semibold tracking-tight"
          text="Today Hightlight"
        />
      </div>
      <div className="flex grid-cols-4 flex-col gap-4 md:grid">
        <div className="col-span-2 rounded-md border bg-muted p-3">
          <div className="flex items-center justify-between">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-muted-foreground">
              Air Quality Index
            </h3>
            <span
              className={cn('rounded px-1 text-sm text-muted', {
                'bg-green-400': airPollution.list[0].main.aqi === 1,
                'bg-yellow-400': airPollution.list[0].main.aqi === 2,
                'bg-orange-400': airPollution.list[0].main.aqi === 3,
                'bg-red-400': airPollution.list[0].main.aqi === 4,
                'bg-red-800': airPollution.list[0].main.aqi === 5,
              })}
            >
              {airPollution.list[0].main.aqi === 1
                ? 'Good'
                : airPollution.list[0].main.aqi === 2
                  ? 'Fair'
                  : airPollution.list[0].main.aqi === 3
                    ? 'Moderate'
                    : airPollution.list[0].main.aqi === 4
                      ? 'Poor'
                      : 'Very Poor'}
            </span>
          </div>
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex shrink-0">
              <Wind size={50} />
            </div>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm text-muted-foreground">PM2.5</p>
                <NumberTicker
                  className="text-2xl tracking-tight sm:text-3xl"
                  value={airPollution.list[0].components.pm2_5}
                  decimalPlaces={2}
                />
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm text-muted-foreground">SO2</p>
                <NumberTicker
                  className="text-2xl tracking-tight sm:text-3xl"
                  value={airPollution.list[0].components.so2}
                  decimalPlaces={2}
                />
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm text-muted-foreground">NO2</p>
                <NumberTicker
                  className="text-2xl tracking-tight sm:text-3xl"
                  value={airPollution.list[0].components.no2}
                  decimalPlaces={2}
                />
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm text-muted-foreground">O2</p>
                <NumberTicker
                  className="text-2xl tracking-tight sm:text-3xl"
                  value={airPollution.list[0].components.o3}
                  decimalPlaces={2}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 rounded-md border bg-muted p-3">
          <div className="col-span-2 flex h-full flex-col justify-between gap-3 rounded-md bg-muted p-2">
            <h3 className="scroll-m-20 text-left text-xl font-semibold tracking-tight text-muted-foreground">
              Sunrise and Sunset
            </h3>
            <div className="flex flex-wrap justify-evenly gap-4">
              <div className="">
                <div className="flex gap-4">
                  <Sunrise size={50} />
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-sm text-muted-foreground">Sunrise</p>
                    <p className="text-3xl">
                      {format(new Date(weatherData.sys.sunrise * 1000), 'H:mm')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex gap-4">
                  <Sunset size={50} />
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-sm text-muted-foreground">Sunset</p>
                    <p className="text-3xl">
                      {format(new Date(weatherData.sys.sunset * 1000), 'H:mm')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 rounded-md border bg-muted p-3">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-muted-foreground">
            Humidity
          </h3>
          <div className="flex items-center justify-between gap-2">
            <Droplet className="size-8" />
            <p className="text-3xl md:text-xl lg:text-xl xl:text-2xl">
              <NumberTicker value={weatherData.main.humidity} />%
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 rounded-md border bg-muted p-3">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-muted-foreground">
            Pressure
          </h3>
          <div className="flex items-center justify-between gap-2">
            <Waves className="size-8" />
            <p className="text-3xl md:text-xl lg:text-xl xl:text-2xl">
              <NumberTicker value={weatherData.main.pressure} />
              hPa
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 rounded-md border bg-muted p-3">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-muted-foreground">
            Visibility
          </h3>
          <div className="flex items-center justify-between gap-2">
            <Eye className="size-8" />
            <p className="text-3xl md:text-xl lg:text-xl xl:text-2xl">
              <NumberTicker value={weatherData.visibility / 1000} />
              km
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 rounded-md border bg-muted p-3">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-muted-foreground">
            Feel like
          </h3>
          <div className="flex items-center justify-between gap-2">
            <Thermometer className="size-8" />
            <p className="text-3xl md:text-xl lg:text-xl xl:text-2xl">
              <NumberTicker
                value={weatherData.main.feels_like}
                decimalPlaces={1}
              />
              °C
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default TodayHightlight
