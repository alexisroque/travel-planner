import { trip } from '../data/trip'
import { activeDay, daysUntilTrip, destById } from './utils'

export interface BriefItem { icon: string; title: string; sub?: string; to?: string; warn?: boolean }
export interface Brief {
  mode: 'pre' | 'flight' | 'arrival' | 'inDest'
  locationLine: string
  headline: string
  items: BriefItem[]
}

// País + app de transporte por destino (para el tip "descárgate Grab/Gojek")
const COUNTRY: Record<string, { c: string; app: string }> = {
  sin: { c: 'Singapur', app: 'Grab' },
  sepilok: { c: 'Malasia', app: 'Grab' }, kinabatangan: { c: 'Malasia', app: 'Grab' }, kl: { c: 'Malasia', app: 'Grab' },
  ubud: { c: 'Indonesia', app: 'Gojek / Grab' }, gili: { c: 'Indonesia', app: 'Gojek / Grab' }, sanur: { c: 'Indonesia', app: 'Gojek / Grab' },
}

export function todayBrief(now: Date, isTaskDone: (id: string, fallback: boolean) => boolean): Brief {
  const until = daysUntilTrip(now)
  const today = activeDay(now)
  const idx = trip.days.findIndex((d) => d.id === today.id)
  const prev = trip.days[idx - 1]
  const dest = destById(today.destinationId)
  const pending = trip.tasks.filter((t) => !isTaskDone(t.id, t.done))

  // ---------- PRE-VIAJE ----------
  if (until > 0) {
    const flight = trip.legs[0]
    const items: BriefItem[] = []
    items.push({ icon: '✈️', title: `Lo siguiente: vuelo ${flight.number}`, sub: `${flight.from}→${flight.to} · 12 Jul · sal de casa a las 9:00`, to: '/vuelos' })
    if (until <= 16) {
      const checkin = pending.find((t) => t.id === 't18')
      if (checkin) items.push({ icon: '📱', title: 'Pronto: check-in online AirAsia', sub: 'Se abre 14 días antes (28 Jun) · asientos gratis', to: '/pendientes', warn: true })
    }
    const grp = (u: string) => pending.filter((t) => t.urgency === u)
    grp('urgent').forEach((t) => items.push({ icon: t.icon ?? '⚠️', title: t.title.split('—')[0].trim(), sub: t.cost, to: '/pendientes', warn: true }))
    const reservas = grp('soon')
    if (reservas.length) items.push({ icon: '🎟️', title: `Reservar (${reservas.length})`, sub: reservas.map((t) => t.title.replace(/ —.*| · .*/,'').replace(/Tickets |Reservar /,'')).slice(0, 6).join(' · '), to: '/pendientes' })
    const comprar = grp('buy')
    if (comprar.length) items.push({ icon: '🛒', title: `Comprar (${comprar.length})`, sub: comprar.map((t) => t.title.split('—')[0].replace(/^[^ ]+ /, '').trim()).join(' · '), to: '/pendientes' })
    const semana = grp('week')
    if (semana.length) items.push({ icon: '🧳', title: `Antes de salir (${semana.length})`, sub: semana.map((t) => t.title.split('—')[0].split('·')[0].trim()).join(' · '), to: '/pendientes' })
    return { mode: 'pre', locationLine: '📍 Estás en Barcelona', headline: `Faltan ${until} días para volar`, items }
  }

  // ---------- DÍA DE VUELO ----------
  if (today.kind === 'travel') {
    const items: BriefItem[] = []
    const firstLeg = (today.legIds ?? []).map((id) => trip.legs.find((l) => l.id === id))[0]
    const firstStop = today.stops?.[0]
    if (firstStop?.time) items.push({ icon: '⏰', title: `Sal a las ${firstStop.time}`, sub: firstLeg ? `Vuelo ${firstLeg.number} ${firstLeg.depart} · ${firstLeg.from}→${firstLeg.to}` : today.headline })
    items.push({ icon: '🚗', title: 'Reserva el transporte al aeropuerto', sub: 'Pide taxi/Grab con margen. Equipaje listo la noche anterior.' })
    const checkin = pending.find((t) => /check-in/i.test(t.title))
    if (checkin) items.push({ icon: '📱', title: 'Haz el check-in online', sub: 'Selecciona asientos juntos', to: '/pendientes', warn: true })
    today.quickTips?.forEach((q) => items.push({ icon: q.startsWith('⚠️') ? '⚠️' : '💡', title: q.replace(/^⚠️\s*/, ''), warn: q.startsWith('⚠️') }))
    return { mode: 'flight', locationLine: today.id === 'd0' ? '📍 Estás en Barcelona · hoy vuelas' : '✈️ Día de vuelos', headline: today.title, items }
  }

  // ---------- LLEGADA A NUEVO DESTINO ----------
  const isArrival = prev && prev.destinationId !== today.destinationId
  if (isArrival) {
    const items: BriefItem[] = []
    const prevCountry = prev ? COUNTRY[prev.destinationId]?.c : undefined
    const here = COUNTRY[today.destinationId]
    if (here && here.c !== prevCountry) items.push({ icon: '📲', title: `Descárgate ${here.app}`, sub: `App de taxis/transporte en ${here.c}. Instálala antes de necesitarla.`, warn: true })
    items.push({ icon: '🛏️', title: 'Check-in y deja las maletas', sub: today.accommodation?.name })
    if (today.transport) items.push({ icon: '🚕', title: 'Cómo llegar del aeropuerto/puerto', sub: today.transport })
    const firstStop = today.stops?.find((s) => s.category !== 'Aeropuerto' && s.category !== 'Hotel')
    if (firstStop) items.push({ icon: firstStop.emoji ?? '📍', title: `Primer plan: ${firstStop.name}`, sub: firstStop.note })
    items.push({ icon: '😌', title: 'Sin prisa', sub: 'Aclimataos al ritmo y al calor antes de cargar el día.' })
    return { mode: 'arrival', locationLine: `📍 Llegáis a ${dest.name}`, headline: today.title, items }
  }

  // ---------- DÍA EN DESTINO ----------
  const items: BriefItem[] = []
  const stops = (today.stops ?? []).filter((s) => s.category !== 'Hotel')
  stops.slice(0, 3).forEach((s, i) => items.push({ icon: i === 0 ? '👉' : '↓', title: `${i === 0 ? 'Primero' : 'Luego'}: ${s.emoji ?? ''} ${s.name}`, sub: [s.time, s.note].filter(Boolean).join(' · ') }))
  today.quickTips?.slice(0, 2).forEach((q) => items.push({ icon: q.startsWith('⚠️') ? '⚠️' : '💡', title: q.replace(/^⚠️\s*/, ''), warn: q.startsWith('⚠️') }))
  return { mode: 'inDest', locationLine: `📍 ${dest.name}`, headline: today.title, items }
}
