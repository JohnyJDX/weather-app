import { getForecast5days } from '@/services/forecast-5days'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { getWeatherIcon } from '@/utils/weatherIcon'
import { format } from 'date-fns'
import Card from './card'

const Forecast5days = async ({ lat, lon }: { lat: string; lon: string }) => {
  const forecast5days = await getForecast5days(lat, lon)

  return (
    <div className="col-span-12">
      <Carousel opts={{ dragFree: true }}>
        <CarouselContent>
          {forecast5days.list.map((forecast) => (
            <CarouselItem key={forecast.dt} className="basis-1/12">
              <Card className="p-2">
                <div className="flex select-none flex-col items-center">
                  <p className="text-center text-lg">
                    {format(new Date(forecast.dt * 1000), 'EEE d')}
                  </p>
                  <p className="text-center text-muted-foreground">
                    {format(new Date(forecast.dt * 1000), 'k:mm')}
                  </p>
                  {getWeatherIcon(forecast.weather[0].icon, 45)}
                  <p className="mt-2">{forecast.main.temp.toFixed(1)} °C</p>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default Forecast5days
