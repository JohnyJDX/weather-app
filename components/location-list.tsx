import { City } from '@/types/city'
import { cn } from '@/lib/utils'
import ReactCountryFlag from 'react-country-flag'

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
          'cursor-pointer space-x-2 rounded-md p-2 transition-colors duration-200 hover:bg-muted',
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
        <span>
          {`${location.name} ${location.state ? ` - ${location.state}` : ''}`}
        </span>
        <ReactCountryFlag
          countryCode={location.country}
          svg
          style={{
            width: '1.5em',
            height: '1.5em',
          }}
        />
      </li>
    ))}
  </ul>
)

export default LocationList
