import axiosInstance from '../axiosConfig'
import { Forecast5days } from '../types/forecast5days'

export const getForecast5days = async (
  lat: string,
  lon: string,
): Promise<Forecast5days> => {
  const res = await axiosInstance.get<Forecast5days>('/forecast', {
    params: { lat: lat, lon: lon, units: 'metric' },
  })
  return res.data
}
