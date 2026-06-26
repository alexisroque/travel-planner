import { useState } from 'react'
import { trip } from '../data/trip'

interface Pos { lat: number; lon: number }

// Puntos conocidos del viaje (para situar al usuario por proximidad)
const KNOWN: { name: string; lat: number; lon: number }[] = [
  { name: 'Barcelona', lat: 41.3874, lon: 2.1686 },
  ...trip.destinations.filter((d) => d.coords).map((d) => ({ name: d.name, lat: d.coords!.lat, lon: d.coords!.lon })),
]

function haversine(a: Pos, b: Pos) {
  const R = 6371
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLon = ((b.lon - a.lon) * Math.PI) / 180
  const s = Math.sin(dLat / 2) ** 2 + Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(s))
}

export function useGeo() {
  const [pos, setPos] = useState<Pos | null>(null)
  const [state, setState] = useState<'idle' | 'asking' | 'ok' | 'denied'>('idle')

  function request() {
    if (!navigator.geolocation) { setState('denied'); return }
    setState('asking')
    navigator.geolocation.getCurrentPosition(
      (p) => { setPos({ lat: p.coords.latitude, lon: p.coords.longitude }); setState('ok') },
      () => setState('denied'),
      { timeout: 8000, maximumAge: 600000 },
    )
  }

  const nearest = pos
    ? KNOWN.map((k) => ({ k, d: haversine(pos, k) })).sort((a, b) => a.d - b.d)[0]
    : null

  return { pos, state, request, nearestName: nearest?.k.name, nearestKm: nearest ? Math.round(nearest.d) : undefined }
}
