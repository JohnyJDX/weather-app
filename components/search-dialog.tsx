'use client'
import { getLocations } from '@/app/services/geocoding-service'
import { City } from '@/app/types/city'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { debounce } from 'lodash'
import { useRouter } from 'next/navigation'
import React from 'react'
import LocationList from './location-list'
import { CommandDialog } from './ui/command'
import { Input } from './ui/input'
import { Skeleton } from './ui/skeleton'

const SearchDialog = () => {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')
  const [value, setValue] = React.useState('')
  const [selectedLocation, setSelectedLocation] = React.useState<number[]>([])
  const router = useRouter()

  const debouncedSetValue = React.useCallback(
    debounce((newValue: string) => setValue(newValue), 500),
    [],
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    debouncedSetValue(e.target.value)
  }

  const { data: locations = [], isLoading: isLoadingLocations } = useQuery({
    queryKey: ['location', value],
    queryFn: () => getLocations(value),
    enabled: !!value,
  })

  const handleSelectLocation = (location: City) => {
    setSelectedLocation([location.lat, location.lon])
    router.push(
      `/?lat=${location.lat}&lon=${location.lon}&name=${location.name}`,
    )
    setOpen(false)
  }

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const LoadingSkeleton = () => (
    <ul className="flex flex-col p-2">
      {[...Array(5)].map((_, index) => (
        <li key={index} className="p-2">
          <Skeleton className="h-8 w-full rounded-md bg-muted" />
        </li>
      ))}
    </ul>
  )

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64',
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search city...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘ / Ctrl</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Input
          className="h-12 text-base focus-visible:ring-0"
          placeholder="Search city..."
          value={inputValue}
          onChange={handleInputChange}
        />
        {isLoadingLocations ? (
          <LoadingSkeleton />
        ) : locations.length === 0 ? (
          <div className="flex h-36 items-center justify-center p-2">
            No results
          </div>
        ) : (
          <LocationList
            selectedLocation={selectedLocation}
            locations={locations}
            handleSelectLocation={handleSelectLocation}
          />
        )}
      </CommandDialog>
    </>
  )
}

export default SearchDialog
