import { Link } from 'react-router-dom'
import { trip } from '../data/trip'
import type { Leg } from '../types'

const TYPE_ICON: Record<string, string> = { flight: '✈️', ferry: '⛴️', transfer: '🚗', train: '🚆', bus: '🚌' }

function LegCard({ leg }: { leg: Leg }) {
  return (
    <div className="leg">
      <div className="lg-main">
        <div style={{ fontSize: '1.4em' }}>{TYPE_ICON[leg.type]}</div>
        <div className="lg-route">
          <div className="lg-cities">{leg.from} → {leg.to}</div>
          <div className="lg-times">{leg.date} · {leg.depart}{leg.arrive ? ` → ${leg.arrive}` : ''} · {leg.duration}</div>
        </div>
        <div className="lg-num">
          <b>{leg.number ?? leg.type}</b>
          {leg.carrier}
          <div style={{ marginTop: 4 }}><span className={`badge ${leg.status}`}>{leg.status === 'paid' ? 'Pagado' : leg.status === 'pending' ? 'Pendiente' : leg.status}</span></div>
        </div>
      </div>
      {leg.ref && <div className="lg-sub">Ref: {leg.ref}{leg.price ? ` · ${leg.price}` : ''}</div>}
      {leg.connectionInfo && <div className="lg-sub">🔗 {leg.connectionInfo}</div>}
      {leg.subLegs?.map((s, i) => (
        <div key={i} className="lg-sub">{TYPE_ICON[s.mode]} {s.from} → {s.to}{s.note ? ` · ${s.note}` : ''}</div>
      ))}
      {leg.warnings.map((w, i) => (
        <div key={i} className={`lg-warn ${w.includes('rasbordo') || w.includes('conexión') || w.includes('PENDIENTE') ? 'transfer' : ''}`}>{w}</div>
      ))}
    </div>
  )
}

export default function Flights() {
  // Detectar grupos de trasbordo propio
  const rendered: string[] = []
  const items: JSX.Element[] = []

  trip.legs.forEach((leg) => {
    if (rendered.includes(leg.id)) return
    if (leg.selfTransferGroup) {
      const group = trip.legs.filter((l) => l.selfTransferGroup === leg.selfTransferGroup)
      group.forEach((l) => rendered.push(l.id))
      items.push(
        <div key={leg.selfTransferGroup}>
          <div className="self-transfer-band">⚠️ Trasbordo propio · billetes separados</div>
          {group.map((l) => <LegCard key={l.id} leg={l} />)}
        </div>,
      )
    } else {
      rendered.push(leg.id)
      items.push(<LegCard key={leg.id} leg={leg} />)
    }
  })

  const flights = trip.legs.filter((l) => l.type === 'flight').length
  const ferries = trip.legs.filter((l) => l.type === 'ferry').length

  return (
    <>
      <div className="page-head">
        <Link to="/resumen" className="back-link">‹ Resumen</Link>
        <h1>Vuelos & Transporte</h1>
        <div className="sub">{flights} vuelos · {ferries} ferries · trasbordos modelados</div>
      </div>
      {items}
      <div className="tip warn" style={{ margin: '14px' }}>
        ⚠️ El trasbordo SIN→KUL→SDK son billetes separados (Kiwi): si AK704 se retrasa, AK5194 no espera. 4h de margen en KLIA2. Recoger equipaje y re-check-in.
      </div>
      <div style={{ height: 12 }} />
    </>
  )
}
