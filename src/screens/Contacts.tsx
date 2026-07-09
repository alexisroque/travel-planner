import { Link } from 'react-router-dom'
import { contactAgenda } from '../data/contacts'
import { trip } from '../data/trip'
import { destStyle } from '../lib/utils'
import { gmapsUrl } from '../lib/places-helpers'

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

function whatsappHref(phone: string) {
  return `https://wa.me/${phone.replace(/\D/g, '')}`
}

export default function Contacts() {
  const hotelCount = contactAgenda.filter((c) => c.category.toLowerCase().includes('alojamiento') || c.category.toLowerCase().includes('lodge')).length

  return (
    <div className="fadein">
      <div className="page-head">
        <Link to="/resumen" className="back-link">‹ Resumen</Link>
        <h1>Agenda de contactos</h1>
        <div className="sub">{hotelCount} alojamientos · teléfonos, emails y direcciones a mano</div>
      </div>

      <div className="card contact-agenda">
        <div className="contact-intro">Contactos rápidos para llamar, escribir por WhatsApp o abrir la dirección sin buscar en las reservas.</div>
        {contactAgenda.map((c) => {
          const dest = c.destinationId ? trip.destinations.find((d) => d.id === c.destinationId) : undefined
          const acc = c.destinationId ? trip.accommodations.find((a) => a.destinationId === c.destinationId) : undefined
          const mapHref = acc?.coords ? gmapsUrl(c.mapName ?? c.name, dest?.name, acc.coords) : undefined

          return (
            <div key={c.id} className="contact-row" style={c.destinationId ? destStyle(c.destinationId) : undefined}>
              <div className="contact-top">
                <div className="contact-main">
                  <div className="contact-name">{dest?.emoji ? `${dest.emoji} ` : ''}{c.name}</div>
                  <div className="contact-meta">{c.dates ? `${c.dates} · ` : ''}{c.category}{c.ref ? ` · ${c.ref}` : ''}</div>
                </div>
                {c.destinationId && <span className="contact-dot" aria-hidden="true" />}
              </div>
              {c.note && <div className="contact-note">{c.note}</div>}
              <div className="contact-actions">
                {c.phone && <a href={phoneHref(c.phone)}>☎️ Llamar</a>}
                {c.whatsapp && c.phone && <a href={whatsappHref(c.phone)} target="_blank" rel="noreferrer">💬 WhatsApp</a>}
                {c.email && <a href={`mailto:${c.email}`}>✉️ Email</a>}
                {mapHref && <a href={mapHref} target="_blank" rel="noreferrer">🗺️ Dirección</a>}
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ height: 12 }} />
    </div>
  )
}
