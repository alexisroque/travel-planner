import { trip } from '../data/trip'
import { destStyle } from '../lib/utils'

export default function Destinations() {
  const dests = trip.destinations.filter((d) => d.id !== 'travel')
  return (
    <>
      <div className="page-head">
        <h1>Destinos</h1>
        <div className="sub">Fichas contextuales · logística · emergencias</div>
      </div>

      {dests.map((d) => {
        const restaurants = trip.restaurants.filter((r) => r.destinationId === d.id)
        const acc = trip.accommodations.find((a) => a.destinationId === d.id)
        const L = d.logistics
        return (
          <div key={d.id} className="dest-card" style={destStyle(d.id)}>
            <div className="dest-head">
              <div className="dn">{d.emoji} {d.name}</div>
              <div className="dd">{d.dates}{d.nights ? ` · ${d.nights} noches` : ''}</div>
            </div>
            <div className="dest-body">
              <div className="summ">{d.summary}</div>

              {acc && (
                <div className="dest-kv" style={{ marginTop: 10 }}><span className="k">🛏️ Alojamiento</span><span>{acc.name}</span></div>
              )}
              {L.currency && <div className="dest-kv"><span className="k">💱 Moneda</span><span>{L.currency}</span></div>}
              {L.transport && <div className="dest-kv"><span className="k">🚕 Transporte</span><span>{L.transport}</span></div>}
              {L.plug && <div className="dest-kv"><span className="k">🔌 Enchufe</span><span>{L.plug}</span></div>}
              {L.water && <div className="dest-kv"><span className="k">💧 Agua</span><span>{L.water}</span></div>}
              {L.notes && <div className="dest-kv"><span className="k">ℹ️ Nota</span><span>{L.notes}</span></div>}

              {d.alerts.map((a, i) => <div key={i} className="dest-alert">⚠️ {a}</div>)}

              {restaurants.length > 0 && (
                <>
                  <div className="section-title" style={{ margin: '14px 0 4px' }}>🍽️ Dónde comer</div>
                  {restaurants.map((r) => (
                    <div key={r.id} className="dest-kv">
                      <span className="k">{r.name}</span>
                      <span>{r.specialty} · {r.priceApprox}{r.needsReservation ? ' · reservar' : ''}</span>
                    </div>
                  ))}
                </>
              )}

              {d.emergency && (
                <div className="tip info" style={{ marginTop: 12 }}>
                  🆘 {d.emergency.insurance}
                </div>
              )}
            </div>
          </div>
        )
      })}
      <div style={{ height: 12 }} />
    </>
  )
}
