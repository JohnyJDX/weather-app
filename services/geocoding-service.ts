import axios from 'axios'
import { City } from '../types/city'

export const getLocations = async (city: string): Promise<City[]> => {
  const res = await axios.get<City[]>(
    'https://api.openweathermap.org/geo/1.0/direct',
    {
      params: {
        q: city,
        limit: 10,
        appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
      },
    },
  )
  return res.data
}
