'use client'

import createGlobe from 'cobe'
import { useTheme } from 'next-themes'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
}

export function Cobe() {
  const theme = useTheme()
  const searchParams = useSearchParams()

  const [lat, setLat] = useState<string>('0')
  const [lon, setLon] = useState<string>('0')

  useEffect(() => {
    // First try to get lat/lon from search params
    const latParam = searchParams.get('lat')
    const lonParam = searchParams.get('lon')

    if (latParam && lonParam) {
      setLat(latParam)
      setLon(lonParam)
    } else {
      // If not found in search params, fall back to cookies
      const latCookie = getCookie('lat')
      const lonCookie = getCookie('lon')

      if (latCookie && lonCookie) {
        setLat(latCookie)
        setLon(lonCookie)
      }
    }
  }, [searchParams]) // Only rerun when searchParams change

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const locationToAngles = (lat: string, lon: string) => {
    if (!lat || !lon) return
    return [
      Math.PI - ((+lon * Math.PI) / 180 - Math.PI / 2),
      (+lat * Math.PI) / 180,
    ]
  }

  const focusRef = useRef([0, 0])

  useEffect(() => {
    if (!lat || !lon) return

    focusRef.current = locationToAngles(lat, lon) as number[]
  }, [lat, lon])

  useEffect(() => {
    let width = 0
    let currentPhi = 0
    let currentTheta = 0
    const doublePi = Math.PI * 2

    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)

    onResize()

    if (!canvasRef.current) return

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: theme.resolvedTheme === 'dark' ? 1 : 0,
      diffuse: 3,
      scale: 1,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [251 / 255, 200 / 255, 21 / 255],
      glowColor: [0.8, 0.8, 0.8],
      markers: [{ location: [+lat, +lon], size: 0.1 }],
      onRender: (state) => {
        state.phi = currentPhi
        state.theta = currentTheta
        const [focusPhi, focusTheta] = focusRef.current
        const distPositive = (focusPhi - currentPhi + doublePi) % doublePi
        const distNegative = (currentPhi - focusPhi + doublePi) % doublePi
        // Control the speed
        if (distPositive < distNegative) {
          currentPhi += distPositive * 0.08
        } else {
          currentPhi -= distNegative * 0.08
        }
        currentTheta = currentTheta * 0.92 + focusTheta * 0.08
        state.width = width * 2
        state.height = width * 2
      },
    })

    if (canvasRef.current) {
      canvasRef.current.style.opacity = '1'
    }

    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [lat, lon, theme])

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 900,
        aspectRatio: 1,
        margin: 'auto',
        position: 'relative',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          contain: 'layout paint size',
          opacity: 0,
          transition: 'opacity 1s ease',
        }}
      />
    </div>
  )
}
