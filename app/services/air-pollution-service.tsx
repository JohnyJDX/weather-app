import axiosInstance from '../axiosConfig'
import { AirPollution } from '../types/air-pollution'

export const getAirPollution = async (lat: string = '0', lon: string = '0') => {
  const res = await axiosInstance.get<AirPollution>('/air_pollution', {
    params: { lat: lat, lon: lon, units: 'metric' },
  })
  return res.data
}
