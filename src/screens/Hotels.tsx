import { Link } from 'react-router-dom'
import { trip } from '../data/trip'
import { destById, destStyle } from '../lib/utils'
import { gmapsUrl } from '../lib/places-helpers'

const STATUS_LABEL: Record<string, string> = { booked: 'Reservado', paid: 'Pagado', pending: 'Pendiente' }

export default function Hotels() {
  const accs = trip.accommodations
  const totalNights = accs.reduce((s, a) => s + a.nights, 0)

  return (
    <div className="fadein">
      <div className="page-head">
        <Link to="/resumen" className="back-link">‹ Resumen</Link>
        <h1>Alojamientos</h1>
        <div className="sub">{accs.length} hoteles · {totalNights} noches · todos reservados</div>
      </div>

      {accs.map((a) => {
        const dest = destById(a.destinationId)
        return (
          <div key={a.id} className="hotel-card" style={destStyle(a.destinationId)}>
            <div className="hc-head">
              <span className="hc-dest">{dest.emoji} {dest.name}</span>
              <span className={`badge ${a.status}`}>{STATUS_LABEL[a.status] ?? a.status}</span>
            </div>
            <div className="hc-name">🏨 {a.name}</div>
            <div className="hc-dates">📅 {a.checkIn} → {a.checkOut} · {a.nights} {a.nights === 1 ? 'noche' : 'noches'}</div>
            {a.roomType && <div className="hc-kv"><span className="k">🛏️ Habitación</span><span>{a.roomType}</span></div>}
            {a.price && <div className="hc-kv"><span className="k">💶 Precio</span><span>{a.price}</span></div>}
            {a.ref && <div className="hc-kv"><span className="k">🔖 Reserva</span><span>{a.ref}</span></div>}
            {a.note && <div className="hc-note">ℹ️ {a.note}</div>}
            {a.coords && (
              <a className="hc-maps" href={gmapsUrl(a.name, dest.name, a.coords)} target="_blank" rel="noreferrer">🗺️ Abrir en Google Maps</a>
            )}
          </div>
        )
      })}
      <div style={{ height: 12 }} />
    </div>
  )
}
