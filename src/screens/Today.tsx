import { Link } from 'react-router-dom'
import { trip } from '../data/trip'
import { activeDay, daysUntilTrip, destById, destStyle, dayIso, eur } from '../lib/utils'
import { usePlanner } from '../store'
import { DayCard, Progress, SlotRow, Tip } from '../components/common'

export default function Today() {
  const now = new Date()
  const today = activeDay(now)
  const until = daysUntilTrip(now)
  // Antes de salir mostramos la primera parada real (Singapur) en el hero; ya en ruta, el destino del día.
  const heroDest = until > 0 ? destById('sin') : destById(today.destinationId)
  const dest = heroDest
  const totalBudget = trip.budget.reduce((s, b) => s + b.amount, 0)
  const isStatusDone = usePlanner((s) => s.isStatusDone)
  const toggleStatus = usePlanner((s) => s.toggleStatus)

  const pendingTasks = trip.tasks.filter((t) => t.urgency === 'urgent' || t.urgency === 'soon')
  const idx = trip.days.findIndex((d) => d.id === today.id)
  const nextDay = trip.days[idx + 1]

  const heroLabel = until > 0
    ? `Faltan ${until} días para el viaje`
    : until === 0
      ? '¡Hoy empieza el viaje!'
      : `Hoy · ${today.date} ${today.weekday}`

  return (
    <>
      <div className="hero" style={{ ...destStyle(heroDest.id), background: `var(${heroDest.colorVar})` }}>
        <h1>{trip.name}</h1>
        <div className="big">{until > 0 ? `${dest.emoji} ${dest.name}` : `${dest.emoji} ${dest.name}`}</div>
        <div className="meta">{until > 0 ? `Primera parada · ${trip.subtitle}` : trip.subtitle}</div>
        <div className="countdown">
          {until > 0 ? (
            <div className="cd"><div className="n">{until}</div><div className="l">días para salir</div></div>
          ) : (
            <div className="cd"><div className="n">{today.dayNumber ?? 0}</div><div className="l">de {trip.stats.days} días</div></div>
          )}
          <div className="cd"><div className="n">{trip.stats.flights}</div><div className="l">vuelos</div></div>
          <div className="cd"><div className="n">{eur(totalBudget)}</div><div className="l">presupuesto</div></div>
        </div>
      </div>

      <div className="section-title">{heroLabel}</div>
      <div className="card tight" style={destStyle(today.destinationId)}>
        <div className="dc-daynum" style={{ marginBottom: 4 }}>
          <span className="dc-pill">{today.dayNumber === null ? 'Salida' : `Día ${today.dayNumber}`}</span>
          <span>·&nbsp;{today.date} · {today.weekday}</span>
        </div>
        <h3 style={{ fontSize: '1.15em', fontWeight: 700 }}>{today.emoji} {today.title}</h3>
        <div className="dc-headline" style={{ marginTop: 4 }}>{today.headline}</div>
        {today.accommodation && (
          <div className="dc-hotel" style={{ marginTop: 8, fontSize: '.82em' }}>🛏️ <span>{today.accommodation.name}{today.accommodation.note ? ` · ${today.accommodation.note}` : ''}</span></div>
        )}
        <div style={{ marginTop: 12 }}>
          <div className="prog-label"><span>Preparación del día</span><span>{today.progress}%</span></div>
          <Progress value={today.progress} />
        </div>
      </div>

      {today.statusItems.length > 0 && (
        <div className="card">
          {today.statusItems.map((s, i) => {
            const on = isStatusDone(today.id, i, s.done)
            return (
              <button key={i} className={`check ${on ? 'on' : ''}`} style={{ width: '100%', textAlign: 'left' }} onClick={() => toggleStatus(today.id, i)}>
                <span className="box">{on ? '✓' : ''}</span>
                <span className="ct">{s.label}</span>
              </button>
            )
          })}
        </div>
      )}

      <div className="card">
        {today.slots.map((s, i) => (
          <SlotRow key={i} icon={s.icon} when={s.key} time={s.time} text={s.text} />
        ))}
        {today.transport && <div className="transport">🚗 {today.transport}</div>}
        {today.tip && <Tip text={today.tip} />}
      </div>

      <Link to={`/dia/${today.id}`} className="section-title" style={{ display: 'block', color: 'var(--sa)' }}>Ver día completo →</Link>

      {nextDay && (
        <>
          <div className="section-title">Mañana</div>
          <DayCard day={nextDay} />
        </>
      )}

      {until > 0 && pendingTasks.length > 0 && (
        <>
          <div className="section-title">Lo que falta por cerrar</div>
          <Link to="/pendientes" className="card tight" style={{ display: 'block' }}>
            <strong>{pendingTasks.length} tareas pendientes</strong>
            <div style={{ color: 'var(--muted)', fontSize: '.85em', marginTop: 3 }}>
              {pendingTasks.slice(0, 3).map((t) => t.title.split('—')[0].trim()).join(' · ')}…
            </div>
          </Link>
        </>
      )}

      <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '.72em', padding: '18px' }}>
        Familia Roque · {trip.startDate.slice(8, 10)} Jul — 5 Ago 2026 · día activo {dayIso(today.id)}
      </div>
    </>
  )
}
