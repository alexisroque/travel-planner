import { Link } from 'react-router-dom'
import type { Day } from '../types'
import { destById, destStyle, KIND_LABEL } from '../lib/utils'

export function Progress({ value }: { value: number }) {
  return (
    <div className="prog">
      <i style={{ width: `${value}%` }} />
    </div>
  )
}

export function Tip({ text }: { text: string }) {
  const warn = text.startsWith('⚠️')
  return <div className={`tip ${warn ? 'warn' : 'info'}`}>{text}</div>
}

const SLOT_LABEL: Record<string, string> = {
  morning: 'Mañana', midday: 'Mediodía', afternoon: 'Tarde', evening: 'Tarde-noche', night: 'Noche',
}

export function SlotRow({ icon, when, time, text }: { icon?: string; when: string; time?: string; text: string }) {
  return (
    <div className="slot">
      <div className="ic">{icon ?? '•'}</div>
      <div className="body">
        <div className="when">{time ?? SLOT_LABEL[when] ?? when}</div>
        <div className="txt">{text}</div>
      </div>
    </div>
  )
}

export function DayCard({ day }: { day: Day }) {
  const dest = destById(day.destinationId)
  return (
    <Link to={`/dia/${day.id}`} className="day-card" style={destStyle(day.destinationId)}>
      <div className="dc-top">
        <div className="dc-daynum">
          <span className="dc-pill">{day.dayNumber === null ? 'Salida' : `Día ${day.dayNumber}`}</span>
          <span>·&nbsp;{day.date} · {day.weekday} · {dest.emoji} {dest.name}</span>
        </div>
        <h3>{day.emoji} {day.title}</h3>
        <div className="dc-headline">{day.headline}</div>
      </div>
      <div className="dc-foot">
        <div className="dc-hotel">
          {day.accommodation ? <>🛏️ <span>{day.accommodation.name}</span></> : <>{KIND_LABEL[day.kind]}</>}
        </div>
        <div style={{ width: 70 }}><Progress value={day.progress} /></div>
      </div>
    </Link>
  )
}
