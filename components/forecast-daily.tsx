import { getForecast5days } from '@/app/services/forecast-5days'
import Card from './card'
import SummaryChart from './summary-chart'

const ForecastDaily = async ({ lat, lon }: { lat: string; lon: string }) => {
  const forecast5days = await getForecast5days(lat, lon)
  return (
    <Card className="col-span-12 p-4">
      <SummaryChart forecast5days={forecast5days} />
    </Card>
  )
}

export default ForecastDaily
