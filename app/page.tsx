import Forecast5days from '@/components/forecast-5-day'
import CurrentWeather from '@/components/current-weather'
import ForecastDaily from '@/components/forecast-daily'
import TodayHighlight from '@/components/today-hightlight'
import { Skeleton } from '@/components/ui/skeleton'
import { Suspense } from 'react'
import { Cobe } from '@/components/cobe'
import { cookies } from 'next/headers'
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
  const lat = cookies().get('lat')?.value ?? searchParams.lat
  const lon = cookies().get('lon')?.value ?? searchParams.lon

  if (!lat || !lon) {
    return (
      <div className="flex grow flex-col items-center justify-center">
        <p className="mt-7 text-4xl">No location selected</p>
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
        <CurrentWeather lat={lat} lon={lon} />
      </Suspense>

      <Suspense
        fallback={
          <Skeleton className="col-span-9 size-full rounded-md bg-muted" />
        }
      >
        <TodayHighlight lat={lat} lon={lon} />
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
