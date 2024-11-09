import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSun,
  CloudSunRain,
  Cloudy,
  Snowflake,
  Sun,
} from 'lucide-react'
export const getWeatherIcon = (
  iconCode: string,
  iconSize = 120,
  customClassName?: string,
): JSX.Element => {
  const iconProps = { size: iconSize, className: customClassName }

  switch (iconCode) {
    case '01d':
    case '01n':
      return <Sun {...iconProps} />
    case '02d':
    case '02n':
      return <CloudSun {...iconProps} />
    case '03d':
    case '03n':
      return <Cloud {...iconProps} />
    case '04d':
    case '04n':
      return <Cloudy {...iconProps} />
    case '09d':
    case '09n':
      return <CloudRain {...iconProps} />
    case '10d':
    case '10n':
      return <CloudSunRain {...iconProps} />
    case '11d':
    case '11n':
      return <CloudLightning {...iconProps} />
    case '13d':
    case '13n':
      return <Snowflake {...iconProps} />
    case '50d':
    case '50n':
      return <CloudFog {...iconProps} />
    default:
      return <Cloud {...iconProps} />
  }
}
