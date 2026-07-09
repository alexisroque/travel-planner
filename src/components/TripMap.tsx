import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'

export interface MapPoint {
  lat: number
  lon: number
  n?: number | string
  label?: string
  emoji?: string
  color?: string
  key?: string // para hacer scroll a la actividad al hacer clic
  pinClass?: string
}
export interface MapAnchor { lat: number; lon: number; kind: 'hotel' | 'airport' | 'atm'; label: string; note?: string }

interface Props {
  points: MapPoint[]
  height?: number | string
  showRoute?: boolean
  routeColor?: string
  interactive?: boolean
  rounded?: boolean
  fitPadding?: number
  routeCount?: number // solo enrutar los primeros N puntos (el resto son pins sueltos)
  expandable?: boolean // botón de pantalla completa
  caption?: string // rótulo mostrado dentro del mapa
  extraPoints?: MapPoint[] // sitios "por explorar" cerca (otro color, no en la ruta)
  anchors?: MapAnchor[] // hotel / aeropuerto: iconos fijos destacados
  onPointClick?: (key: string) => void
  onExtraPointAction?: (key: string) => void
  extraActionLabel?: string
  highlight?: string | null // key de un punto a resaltar/centrar (clic desde la lista)
}

function spreadClosePoints(points: MapPoint[]) {
  const groups: { lat: number; lon: number; items: MapPoint[] }[] = []
  for (const p of points) {
    const g = groups.find((x) => Math.abs(x.lat - p.lat) < 0.006 && Math.abs(x.lon - p.lon) < 0.006)
    if (g) {
      g.items.push(p)
      g.lat = g.items.reduce((s, i) => s + i.lat, 0) / g.items.length
      g.lon = g.items.reduce((s, i) => s + i.lon, 0) / g.items.length
    } else {
      groups.push({ lat: p.lat, lon: p.lon, items: [p] })
    }
  }

  const display = new Map<MapPoint, { lat: number; lon: number }>()
  for (const g of groups) {
    if (g.items.length === 1) {
      display.set(g.items[0], { lat: g.items[0].lat, lon: g.items[0].lon })
      continue
    }
    const radius = 0.0012 + Math.min(g.items.length, 8) * 0.00008
    g.items.forEach((p, i) => {
      const angle = (Math.PI * 2 * i) / g.items.length - Math.PI / 2
      display.set(p, { lat: p.lat + Math.sin(angle) * radius, lon: p.lon + Math.cos(angle) * radius })
    })
  }
  return display
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Mapa Leaflet con marcadores numerados y ruta. Online (tiles CARTO Voyager).
export default function TripMap({ points, height = 200, showRoute = true, routeColor = '#1a1a2a', interactive = true, rounded = true, fitPadding = 40, routeCount, expandable = true, caption, extraPoints, anchors, onPointClick, onExtraPointAction, extraActionLabel = 'Añadir al itinerario', highlight }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Record<string, L.Marker>>({})
  const [full, setFull] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const valid = points.filter((p) => typeof p.lat === 'number' && typeof p.lon === 'number')
    const validExtra = (extraPoints ?? []).filter((p) => typeof p.lat === 'number' && typeof p.lon === 'number')
    if (valid.length === 0 && validExtra.length === 0) return
    const displayPos = spreadClosePoints([...valid, ...validExtra])

    const map = L.map(ref.current, {
      zoomControl: interactive,
      attributionControl: false,
      dragging: interactive,
      scrollWheelZoom: interactive,
      doubleClickZoom: interactive,
      touchZoom: interactive,
      tap: interactive,
    })
    mapRef.current = map
    markersRef.current = {}
    if (interactive) map.zoomControl.setPosition('bottomleft')

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map)
    L.control.attribution({ position: 'bottomright', prefix: false }).addAttribution('© OpenStreetMap · CARTO').addTo(map)

    const routePts = routeCount ? valid.slice(0, routeCount) : valid
    if (showRoute && routePts.length > 1) {
      L.polyline(routePts.map((p) => [p.lat, p.lon]), {
        color: routeColor, weight: 3, opacity: 0.55, dashArray: '1 8', lineCap: 'round',
      }).addTo(map)
    }

    const activatePoint = (p: MapPoint) => {
      if (onPointClick && p.key) onPointClick(p.key)
    }

    valid.forEach((p) => {
      const color = p.color ?? routeColor
      const inner = p.n !== undefined ? String(p.n) : (p.emoji ?? '')
      const icon = L.divIcon({
        className: 'map-pin-wrap',
        html: `<div class="map-pin ${p.pinClass ?? ''}" style="background:${color}">${inner}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      })
      const pos = displayPos.get(p) ?? p
      const zIndexOffset = p.pinClass?.includes('selected-day') ? 650 : p.pinClass?.includes('planned') ? 500 : p.pinClass?.includes('candidate') ? 180 : 0
      const m = L.marker([pos.lat, pos.lon], { icon, zIndexOffset }).addTo(map)
      if (p.label) m.bindPopup(`<b>${p.label}</b>`, { closeButton: false })
      if (onPointClick && p.key) {
        m.on('click', () => activatePoint(p))
        m.on('touchend', (ev) => {
          const original = (ev as L.LeafletMouseEvent).originalEvent
          if (original) L.DomEvent.preventDefault(original)
          activatePoint(p)
        })
      }
      if (p.key) markersRef.current[p.key] = m
    })

    // Anclas fijas destacadas: hotel, aeropuerto y cajeros
    ;(anchors ?? []).filter((a) => typeof a.lat === 'number').forEach((a) => {
      const emoji = a.kind === 'hotel' ? '🏨' : a.kind === 'airport' ? '✈️' : '🏧'
      const size = a.kind === 'atm' ? 28 : 34
      const icon = L.divIcon({
        className: 'map-pin-wrap',
        html: `<div class="map-anchor ${a.kind}">${emoji}</div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      })
      const popup = `<b>${emoji} ${a.label}</b>${a.note ? `<br><span style="color:#666">${a.note}</span>` : ''}`
      L.marker([a.lat, a.lon], { icon, zIndexOffset: a.kind === 'atm' ? 120 : 200 }).addTo(map).bindPopup(popup, { closeButton: false })
    })

    // Sitios "por explorar" cerca: pin secundario en otro color, fuera de la ruta
    validExtra.forEach((p) => {
      const inner = p.n !== undefined ? String(p.n) : (p.emoji ?? '+')
      const color = p.color ?? '#fff'
      const icon = L.divIcon({
        className: 'map-pin-wrap',
        html: `<div class="map-pin extra ${p.pinClass ?? ''}" style="background:${color}">${inner}</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })
      const pos = displayPos.get(p) ?? p
      const m = L.marker([pos.lat, pos.lon], { icon, zIndexOffset: -100 }).addTo(map)
      const hint = p.pinClass?.includes('day-context')
        ? 'Ya está en el itinerario del día seleccionado'
        : 'Está en Explorar — puedes añadirlo'
      const action = p.key && onExtraPointAction && !p.pinClass?.includes('day-context')
        ? `<br><button type="button" class="map-popup-action" data-key="${escapeHtml(p.key)}">${escapeHtml(extraActionLabel)}</button>`
        : ''
      if (p.label) m.bindPopup(`<b>${escapeHtml(p.label)}</b><br><span style="color:#888">${hint}</span>${action}`, { closeButton: false })
      if (p.key && onExtraPointAction) {
        m.on('popupopen', () => {
          const btn = m.getPopup()?.getElement()?.querySelector<HTMLButtonElement>('.map-popup-action')
          if (!btn) return
          btn.onclick = () => {
            onExtraPointAction(p.key as string)
            m.closePopup()
          }
        })
      }
    })

    const bounds = L.latLngBounds([...valid, ...validExtra].map((p) => [p.lat, p.lon] as [number, number]))
    map.fitBounds(bounds, { padding: [fitPadding, fitPadding], maxZoom: 14 })

    // Recalcular tamaño tras montar (evita tiles grises)
    setTimeout(() => map.invalidateSize(), 60)

    return () => {
      map.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(points), JSON.stringify(extraPoints), JSON.stringify(anchors), height, routeCount, onExtraPointAction, extraActionLabel])

  // Resaltar y centrar el punto seleccionado desde la lista
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    // Quitar énfasis previo de todos los pines
    Object.values(markersRef.current).forEach((m) => m.getElement()?.querySelector('.map-pin')?.classList.remove('pin-hi'))
    if (!highlight) return
    const m = markersRef.current[highlight]
    if (!m) return
    // Vuela y hace ZOOM IN al punto seleccionado (con guardas por si el mapa aún no está listo)
    try {
      const ll = m.getLatLng()
      if (!ll || Number.isNaN(ll.lat) || Number.isNaN(ll.lng)) return
      map.flyTo(ll, Math.max(map.getZoom(), 15), { animate: true, duration: 0.55 })
      m.openPopup()
      m.getElement()?.querySelector('.map-pin')?.classList.add('pin-hi')
    } catch { /* mapa aún no listo: ignorar */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlight])

  // Recalcular tamaño al entrar/salir de pantalla completa
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const valid = points.filter((p) => typeof p.lat === 'number' && typeof p.lon === 'number')
    const t = setTimeout(() => {
      map.invalidateSize()
      if (valid.length) map.fitBounds(L.latLngBounds(valid.map((p) => [p.lat, p.lon] as [number, number])), { padding: [full ? 60 : fitPadding, full ? 60 : fitPadding], maxZoom: 14 })
    }, 120)
    if (full) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { clearTimeout(t); document.body.style.overflow = '' }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [full])

  return (
    <div className={`trip-map-shell ${full ? 'full' : ''}`}>
      <div ref={ref} className={`trip-map ${rounded && !full ? 'rounded' : ''}`} style={{ height: full ? '100%' : height }} />
      {full && caption && <span className="map-cap map-cap-full">{caption}</span>}
      {expandable && (
        <button className={`map-expand ${full ? 'is-full' : ''}`} onClick={() => setFull((f) => !f)} aria-label={full ? 'Cerrar mapa' : 'Ampliar mapa'}>
          {full ? '✕ Cerrar' : '⤢'}
        </button>
      )}
    </div>
  )
}
