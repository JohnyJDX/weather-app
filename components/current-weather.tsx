import { getСurrentWeather } from '@/app/services/current-weather-service'
import Card from '@/components/card'
import { getWeatherIcon } from '@/utils/weatherIcon'
import { format } from 'date-fns'
import { Calendar, MapPin } from 'lucide-react'
import NumberTicker from './ui/number-ticker'
import GradualSpacing from './ui/gradual-spacing'

const CurrnetWeather = async ({ lat, lon }: { lat: string; lon: string }) => {
  const weatherData = await getСurrentWeather(lat, lon)

  return (
    <Card className="col-span-3 p-4 sm:col-span-12 lg:col-span-3">
      <div className="h-fit space-y-1">
        <GradualSpacing
          duration={0.2}
          className="scroll-m-20 text-center text-2xl font-semibold tracking-tight"
          text="Current weather"
        />
        <div className="flex flex-col items-center">
          {getWeatherIcon(weatherData.weather[0].icon, 110)}
          <div className="ml-5 text-6xl font-bold">
            <NumberTicker value={weatherData.main.temp} decimalPlaces={1} />
            &deg;<sup>c</sup>
          </div>
        </div>

        <p className="border-b pb-2 text-center capitalize">
          {weatherData.weather[0].description}
        </p>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <p className="pt-0.5 text-sm text-muted-foreground">
              {format(new Date(weatherData.dt * 1000), 'E d, MMM')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <p className="pt-0.5 text-sm text-muted-foreground">
              {weatherData.name}, {weatherData.sys.country}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default CurrnetWeather
