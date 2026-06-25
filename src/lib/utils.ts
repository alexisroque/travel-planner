import { trip } from '../data/trip'
import type { Destination, Day } from '../types'

export function destById(id: string): Destination {
  return trip.destinations.find((d) => d.id === id) ?? trip.destinations[0]
}

// Estilo CSS con variables de color del destino
export function destStyle(destId: string): React.CSSProperties {
  const d = destById(destId)
  return {
    // @ts-expect-error CSS custom props
    '--dest': `var(${d.colorVar})`,
    '--dest-l': `var(${d.colorVar}-l)`,
  }
}

// Día "activo" según la fecha real. Antes del viaje → día 0; durante → día correspondiente; después → último.
const DAY_DATES: Record<string, string> = {} // id -> ISO
;(function build() {
  // El viaje es 2026. Mapear date+weekday a ISO aproximado por el orden.
  const isoByNumber: string[] = []
  // 12 Jul 2026 = día 0
  const start = new Date(Date.UTC(2026, 6, 12))
  trip.days.forEach((d, i) => {
    const dt = new Date(start)
    dt.setUTCDate(start.getUTCDate() + i)
    DAY_DATES[d.id] = dt.toISOString().slice(0, 10)
    isoByNumber.push(DAY_DATES[d.id])
  })
})()

export function dayIso(dayId: string): string {
  return DAY_DATES[dayId] ?? ''
}

export function activeDay(today: Date = new Date()): Day {
  const iso = today.toISOString().slice(0, 10)
  const days = trip.days
  if (iso < dayIso(days[0].id)) return days[0]
  const found = days.find((d) => dayIso(d.id) === iso)
  if (found) return found
  if (iso > dayIso(days[days.length - 1].id)) return days[days.length - 1]
  // dentro del rango pero sin match exacto (no debería) → primero
  return days[0]
}

export function daysUntilTrip(today: Date = new Date()): number {
  const start = new Date(Date.UTC(2026, 6, 12))
  const t = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()))
  return Math.round((start.getTime() - t.getTime()) / 86400000)
}

export const eur = (n: number) => '€' + n.toLocaleString('es-ES')

export const KIND_LABEL: Record<string, string> = {
  travel: 'Día de viaje',
  exploration: 'Exploración',
  activation: 'Activación',
  rest: 'Descanso',
}
