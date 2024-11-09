import Forecast5days from '@/components/forecast-5-day'
import CurrnetWeather from '@/components/current-weather'
import ForecastDaily from '@/components/forecast-daily'
import TodayHightlight from '@/components/today-hightlight'
import { Skeleton } from '@/components/ui/skeleton'
import { Suspense } from 'react'
import { Cobe } from '@/components/cobe'
interface SearchParams {
  lat?: string
  lon?: string
  name?: string
}

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { lat, lon } = searchParams

  if (!lat || !lon) {
    return (
      <div className="flex grow flex-col items-center justify-center">
        <p className="text-2xl">No location selected</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4 sm:grid sm:grid-cols-12">
      <Suspense
        fallback={
          <Skeleton className="col-span-3 size-full rounded-md bg-muted" />
        }
      >
        <CurrnetWeather lat={lat} lon={lon} />
      </Suspense>

      <Suspense
        fallback={
          <Skeleton className="col-span-9 size-full rounded-md bg-muted" />
        }
      >
        <TodayHightlight lat={lat} lon={lon} />
      </Suspense>

      <Suspense
        fallback={
          <Skeleton className="col-span-12 size-full rounded-md bg-muted" />
        }
      >
        <Forecast5days lat={lat} lon={lon} />
      </Suspense>

      <Suspense
        fallback={
          <Skeleton className="col-span-12 size-full rounded-md bg-muted" />
        }
      >
        <ForecastDaily lat={lat} lon={lon} />
      </Suspense>

      <div className="col-span-12">
        <Cobe />
      </div>
    </div>
  )
}
