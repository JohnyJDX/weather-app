import axiosInstance from '../axiosConfig'
import { WeatherResponse } from '../types/weather'

export const getCurrentWeather = async (
  lat: string = '0',
  lon: string = '0',
): Promise<WeatherResponse> => {
  const res = await axiosInstance.get<WeatherResponse>('/weather', {
    params: { lat: lat, lon: lon, units: 'metric' },
  })
  return res.data
}
