import { City } from '@/types/city'
import { cn } from '@/lib/utils'

interface LocationListProps {
  selectedLocation: number[]
  locations: City[]
  handleSelectLocation: (location: City) => void
}

const LocationList: React.FC<LocationListProps> = ({
  selectedLocation,
  locations,
  handleSelectLocation,
}) => (
  <ul className="flex flex-col p-2">
    {locations.map((location) => (
      <li
        className={cn(
          'cursor-pointer rounded-md p-2 transition-colors duration-200 hover:bg-muted',
          {
            'bg-muted':
              location.lat + location.lon ===
              selectedLocation[0] + selectedLocation[1],
          },
        )}
        key={location.lat + location.lon}
        onClick={() => {
          handleSelectLocation(location)
        }}
      >
        {`${location.name} - ${location.country}${location.state ? ` - ${location.state}` : ''}`}
      </li>
    ))}
  </ul>
)

export default LocationList
