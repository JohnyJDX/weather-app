import axios from 'axios'
import { env } from 'process'

const axiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: env.OPENWEATHER_API_KEY,
  },
})

export default axiosInstance
