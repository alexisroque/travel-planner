import { useParams, Link, useNavigate } from 'react-router-dom'
import { trip } from '../data/trip'
import { destById, destStyle, KIND_LABEL } from '../lib/utils'
import { usePlanner } from '../store'
import { Progress, SlotRow, Tip } from '../components/common'

export default function DayDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isStatusDone = usePlanner((s) => s.isStatusDone)
  const toggleStatus = usePlanner((s) => s.toggleStatus)

  const idx = trip.days.findIndex((d) => d.id === id)
  const day = trip.days[idx]
  if (!day) return <div className="empty">Día no encontrado. <Link to="/itinerario">Ver itinerario</Link></div>
  const dest = destById(day.destinationId)
  const legs = (day.legIds ?? []).map((lid) => trip.legs.find((l) => l.id === lid)).filter(Boolean)
  const prev = trip.days[idx - 1]
  const next = trip.days[idx + 1]

  return (
    <div style={destStyle(day.destinationId)}>
      <button className="back" onClick={() => navigate(-1)}>← Volver</button>

      <div className="card" style={{ borderLeft: '5px solid var(--dest)' }}>
        <div className="dc-daynum" style={{ marginBottom: 4 }}>
          <span className="dc-pill">{day.dayNumber === null ? 'Salida' : `Día ${day.dayNumber}`}</span>
          <span>·&nbsp;{day.date} · {day.weekday} · {dest.emoji} {dest.name}</span>
        </div>
        <h2 style={{ fontSize: '1.3em', fontWeight: 800, letterSpacing: '-.3px' }}>{day.emoji} {day.title}</h2>
        <div className="dc-headline" style={{ marginTop: 5 }}>{day.headline}</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
          <span className="badge free">{KIND_LABEL[day.kind]}</span>
          {day.accommodation && <span className={`badge ${day.accommodation.status}`}>🛏️ {day.accommodation.name}</span>}
        </div>
        <div style={{ marginTop: 12 }}>
          <div className="prog-label"><span>Preparación del día</span><span>{day.progress}%</span></div>
          <Progress value={day.progress} />
        </div>
      </div>

      {day.statusItems.length > 0 && (
        <>
          <div className="section-title">Reservas y estado</div>
          <div className="card">
            {day.statusItems.map((s, i) => {
              const on = isStatusDone(day.id, i, s.done)
              return (
                <button key={i} className={`check ${on ? 'on' : ''}`} style={{ width: '100%', textAlign: 'left' }} onClick={() => toggleStatus(day.id, i)}>
                  <span className="box">{on ? '✓' : ''}</span>
                  <span className="ct">{s.label}</span>
                </button>
              )
            })}
          </div>
        </>
      )}

      <div className="section-title">Plan del día</div>
      <div className="card">
        {day.slots.map((s, i) => (
          <SlotRow key={i} icon={s.icon} when={s.key} time={s.time} text={s.text} />
        ))}
      </div>

      {day.transport && <div className="transport" style={{ margin: '0 14px' }}>🚗 {day.transport}</div>}
      {day.tip && <div style={{ margin: '0 14px' }}><Tip text={day.tip} /></div>}

      {legs.length > 0 && (
        <>
          <div className="section-title">Transporte de este día</div>
          {legs.map((l) => l && (
            <div key={l.id} className="leg">
              <div className="lg-main">
                <div className="lg-route">
                  <div className="lg-cities">{l.from} → {l.to}</div>
                  <div className="lg-times">{l.depart}{l.arrive ? ` → ${l.arrive}` : ''} · {l.duration}</div>
                </div>
                <div className="lg-num"><b>{l.number ?? l.type}</b>{l.carrier}</div>
              </div>
              {l.warnings.map((w, i) => (
                <div key={i} className={`lg-warn ${w.includes('rasbordo') || w.includes('conexión') ? 'transfer' : ''}`}>{w}</div>
              ))}
            </div>
          ))}
        </>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 16px 8px', gap: 10 }}>
        {prev ? <Link to={`/dia/${prev.id}`} className="pill">← {prev.date}</Link> : <span />}
        {next ? <Link to={`/dia/${next.id}`} className="pill">{next.date} →</Link> : <span />}
      </div>
    </div>
  )
}
