import { useState } from 'react'
import { trip } from '../data/trip'
import { destById } from '../lib/utils'
import { DEST_HEX } from '../components/DayView'
import DayPicker from '../components/DayPicker'
import { usePlanner } from '../store'
import type { Place } from '../types'

export default function Explore() {
  const dests = trip.destinations.filter((d) => d.id !== 'travel')
  const [destId, setDestId] = useState(dests[0].id)
  const [picker, setPicker] = useState<Place | null>(null)

  const addedByDay = usePlanner((s) => s.addedByDay)
  const addPlace = usePlanner((s) => s.addPlace)
  const removePlace = usePlanner((s) => s.removePlace)

  const dest = destById(destId)
  const places = trip.catalog.filter((p) => p.destinationId === destId).sort((a, b) => a.rank - b.rank)

  const dayForPlace = (placeId: string) =>
    Object.entries(addedByDay).find(([, ids]) => ids.includes(placeId))?.[0]
  const dayLabel = (dayId: string) => {
    const d = trip.days.find((x) => x.id === dayId)
    return d ? `Día ${d.dayNumber ?? 0} · ${d.date}` : ''
  }

  return (
    <div className="fadein">
      <div className="page-head" style={{ paddingBottom: 4 }}>
        <h1>Explorar</h1>
        <div className="sub">Lo mejor de cada destino · añade al día que quieras</div>
      </div>

      <div className="pill-row">
        {dests.map((d) => (
          <button key={d.id} className={`pill ${destId === d.id ? 'active' : ''}`}
            style={destId === d.id ? { background: DEST_HEX[d.colorVar], borderColor: DEST_HEX[d.colorVar] } : undefined}
            onClick={() => setDestId(d.id)}>
            {d.emoji} {d.name.replace(/^.*— /, '')}
          </button>
        ))}
      </div>

      <div className="section-title" style={{ ['--dest' as string]: DEST_HEX[dest.colorVar] }}>
        {dest.emoji} {dest.name} · top {places.length}
      </div>

      {places.map((p) => {
        const assigned = dayForPlace(p.id)
        return (
          <div key={p.id} className="place-card" style={{ ['--dest' as string]: DEST_HEX[dest.colorVar], ['--dest-l' as string]: `var(${dest.colorVar}-l)` }}>
            <div className="pc-rank">{p.rank}</div>
            <div className="pc-body">
              <div className="pc-top">
                <span className="pc-name">{p.emoji} {p.name}</span>
              </div>
              <div className="pc-meta">
                <span className="sc-cat">{p.category}</span>
                {p.hours && <span>🕒 {p.hours}</span>}
                {p.price && <span>💶 {p.price}</span>}
                {p.booking && <span className="badge pending">reserva</span>}
              </div>
              <div className="pc-blurb">{p.blurb}</div>
              {p.kids && <div className="pc-kids">👧🧒 {p.kids}</div>}
              <div className="pc-actions">
                {assigned ? (
                  <>
                    <span className="pc-assigned">✓ {dayLabel(assigned)}</span>
                    <button className="pc-btn ghost" onClick={() => setPicker(p)}>Cambiar</button>
                    <button className="pc-btn ghost danger" onClick={() => removePlace(assigned, p.id)}>Quitar</button>
                  </>
                ) : (
                  <button className="pc-btn add" onClick={() => setPicker(p)}>➕ Añadir al día</button>
                )}
              </div>
            </div>
          </div>
        )
      })}
      <div style={{ height: 12 }} />

      {picker && (
        <DayPicker
          title={`${picker.emoji} ${picker.name}`}
          sub={`¿Qué día lo hacéis? · ${dest.emoji} ${dest.name}`}
          destId={picker.destinationId}
          onPick={(dayId) => addPlace(dayId, picker.id)}
          onClose={() => setPicker(null)}
        />
      )}
    </div>
  )
}
