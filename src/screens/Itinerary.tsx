import { useState } from 'react'
import { trip } from '../data/trip'
import { destById } from '../lib/utils'
import { DayCard } from '../components/common'

export default function Itinerary() {
  const [filter, setFilter] = useState<string>('all')
  const destsInOrder = trip.destinations.filter((d) => d.id !== 'travel')
  const days = filter === 'all' ? trip.days : trip.days.filter((d) => d.destinationId === filter)

  // Agrupar por destino para los encabezados de tramo
  let lastDest = ''
  return (
    <>
      <div className="page-head">
        <h1>Itinerario</h1>
        <div className="sub">{trip.stats.days} días · {trip.stats.destinations} países · {trip.stats.nights} noches</div>
      </div>

      <div className="pill-row">
        <button className={`pill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Todos</button>
        {destsInOrder.map((d) => (
          <button key={d.id} className={`pill ${filter === d.id ? 'active' : ''}`} onClick={() => setFilter(d.id)}>
            {d.emoji} {d.name.replace(/^.*— /, '')}
          </button>
        ))}
      </div>

      {days.map((day) => {
        const dest = destById(day.destinationId)
        const showHeader = filter === 'all' && dest.id !== lastDest && dest.id !== 'travel'
        if (dest.id !== 'travel') lastDest = dest.id
        return (
          <div key={day.id}>
            {showHeader && (
              <div className="section-title">{dest.emoji} {dest.name} · {dest.dates}{dest.nights ? ` · ${dest.nights}N` : ''}</div>
            )}
            <DayCard day={day} />
          </div>
        )
      })}
      <div style={{ height: 12 }} />
    </>
  )
}
