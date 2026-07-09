import { useLocation } from 'react-router-dom'
import { trip } from '../data/trip'
import { activeDay, destById } from '../lib/utils'
import { buildAgenda } from '../lib/agenda'
import { dayAnchors, dayAtms } from '../lib/anchors'
import { atmsByDest } from '../data/atms'
import { usePlanner, useUI } from '../store'
import TripMap, { type MapPoint, type MapAnchor } from './TripMap'
import { DEST_HEX } from './DayView'
import { passportCategories } from '../data/passport'
import { VIEW_LABEL, filteredExplorePlaces, type ExploreSort, type ExploreView } from '../lib/explore'
import { findPlaceInPlan } from '../lib/agenda'

// Mapa lateral persistente (iPad/desktop). Es contextual según la pestaña:
//  · Itinerario / Hoy / detalle de día → mapa del día (con scroll a la parada)
//  · Explorar → el destino y el filtro activos en esa pestaña
//  · Resumen → la ruta completa del viaje (todos los destinos)
export default function SideMap() {
  const { pathname } = useLocation()
  const mode = pathname.startsWith('/explorar') ? 'explore' : pathname.startsWith('/resumen') ? 'route' : pathname.startsWith('/pasaporte') ? 'passport' : 'day'

  const focusDayId = useUI((s) => s.focusDayId)
  const exploreDest = useUI((s) => s.exploreDest)
  const exploreView = useUI((s) => s.exploreView) as ExploreView
  const exploreSort = useUI((s) => s.exploreSort) as ExploreSort
  const exploreDayId = useUI((s) => s.exploreDayId)
  const setHighlight = useUI((s) => s.setHighlight)
  const passportKid = useUI((s) => s.passportKid)
  const highlight = useUI((s) => s.highlight)
  const passportGeo = usePlanner((s) => s.passportGeo)
  const { addedByDay, movedBase, hiddenBase, order, addPlace } = usePlanner((s) => ({
    addedByDay: s.addedByDay, movedBase: s.movedBase, hiddenBase: s.hiddenBase, order: s.order, addPlace: s.addPlace,
  }))

  // ===== Pasaporte: mapa de sellos conseguidos por el niño activo =====
  if (mode === 'passport') {
    const allStamps = passportCategories.flatMap((c) => c.stamps)
    const points: MapPoint[] = allStamps
      .map((s) => ({ s, g: passportGeo[`${passportKid}:${s.id}`] }))
      .filter((x) => x.g)
      .map(({ s, g }) => ({ lat: g!.lat, lon: g!.lng, emoji: s.emoji, label: s.label, color: '#1a1a2a' }))
    const kidName = passportKid === 'leo' ? 'Leo' : 'Aira'
    return (
      <div className="side-map-inner" style={{ ['--dest' as string]: '#1a1a2a' }}>
        <div className="side-map-head">🛂 Sellos de {kidName} · {points.length} con ubicación</div>
        <div className="side-map-canvas">
          {points.length > 0 ? (
            <TripMap key={`pp-side-${passportKid}-${points.length}`} points={points} showRoute={false} height="100%" rounded={false} expandable={false} fitPadding={50} />
          ) : (
            <div className="empty">Aún sin sellos con ubicación.<br />Al conseguir un sello y dar permiso de ubicación, aparecerá aquí.</div>
          )}
        </div>
        <div className="side-map-foot">El mapa de los sellos que {kidName} ha conseguido por el viaje 🌟</div>
      </div>
    )
  }

  // ===== Resumen: ruta completa del viaje =====
  if (mode === 'route') {
    const dests = trip.destinations.filter((d) => d.id !== 'travel' && d.coords)
    const points: MapPoint[] = dests.map((d, i) => ({ lat: d.coords!.lat, lon: d.coords!.lon, n: i + 1, label: d.name, color: DEST_HEX[d.colorVar] ?? '#1a1a2a' }))
    return (
      <div className="side-map-inner" style={{ ['--dest' as string]: '#1a1a2a' }}>
        <div className="side-map-head">🧭 La ruta · {dests.length} destinos</div>
        <div className="side-map-canvas">
          <TripMap key="route" points={points} height="100%" rounded={false} expandable={false} fitPadding={50} />
        </div>
        <div className="side-map-foot">La ruta completa, en orden · toca un destino</div>
      </div>
    )
  }

  // ===== Explorar: sigue el destino y el filtro activos =====
  if (mode === 'explore') {
    const dest = destById(exploreDest)
    const destColor = DEST_HEX[dest.colorVar] ?? '#1a1a2a'
    const filtered = filteredExplorePlaces(exploreDest, exploreView, exploreSort)
    const places = filtered.filter((p) => p.coords)
    const destDays = trip.days.filter((d) => d.destinationId === exploreDest && d.dayNumber !== null)
    const selectedDay = destDays.find((d) => d.id === exploreDayId) ?? destDays[0]
    const dayAgenda = selectedDay ? buildAgenda(selectedDay.id, { addedByDay, movedBase, hiddenBase, order }).filter((i) => i.coords) : []
    const typeClassFromCategory = (category: string) => /comida|restaurante/i.test(category) ? 'food' : 'activity'
    const points: MapPoint[] = places.map((p) => {
      const inPlan = findPlaceInPlan(p, { addedByDay, movedBase, hiddenBase })
      const isSelectedDay = inPlan?.dayId === selectedDay?.id
      const color = inPlan ? (inPlan.source === 'added' ? '#d4900a' : '#1a7a3a') : destColor
      return {
        lat: p.coords!.lat,
        lon: p.coords!.lon,
        n: filtered.findIndex((x) => x.id === p.id) + 1,
        label: `${p.name}${inPlan ? ` · en itinerario (${inPlan.source === 'added' ? 'añadido' : 'base'}${isSelectedDay ? ` · día ${selectedDay?.dayNumber}` : ''})` : ' · por decidir'}`,
        color,
        key: p.id,
        pinClass: `explore-pin ${p.must ? 'must' : p.kind === 'food' ? 'food' : 'activity'} ${inPlan ? `planned ${inPlan.source}` : 'candidate'} ${isSelectedDay ? 'selected-day' : ''}`,
      }
    })
    const contextPoints: MapPoint[] = dayAgenda
      .filter((i) => !places.some((p) => Math.abs(p.coords!.lat - i.coords!.lat) < 0.0005 && Math.abs(p.coords!.lon - i.coords!.lon) < 0.0005))
      .map((i, idx) => ({
        lat: i.coords!.lat,
        lon: i.coords!.lon,
        n: idx + 1,
        label: `${i.name} · ya programado ${selectedDay ? `día ${selectedDay.dayNumber}` : ''}`,
        color: i.kind === 'added' ? '#d4900a' : '#1a7a3a',
        pinClass: `explore-pin day-context ${typeClassFromCategory(i.category)} planned ${i.kind} selected-day`,
      }))
    const acc = trip.accommodations.find((a) => a.destinationId === exploreDest && a.coords)
    const anchors: MapAnchor[] = [
      ...(acc?.coords ? [{ lat: acc.coords.lat, lon: acc.coords.lon, kind: 'hotel' as const, label: acc.name }] : []),
      ...(atmsByDest[exploreDest] ?? []).map((a) => ({ lat: a.coords.lat, lon: a.coords.lon, kind: 'atm' as const, label: a.name, note: a.note })),
    ]
    return (
      <div className="side-map-inner" style={{ ['--dest' as string]: destColor }}>
        <div className="side-map-head">{dest.emoji} {dest.name.replace(/^.*— /, '')} · {VIEW_LABEL[exploreView]} ({filtered.length}{places.length !== filtered.length ? ` · ${places.length} en mapa` : ''})</div>
        <div className="side-map-canvas">
          {points.length > 0 ? (
            <TripMap
              key={`${exploreDest}-${exploreView}-${exploreSort}-${selectedDay?.id ?? 'no-day'}`}
              points={points}
              extraPoints={contextPoints}
              anchors={anchors}
              showRoute={false}
              height="100%"
              rounded={false}
              expandable={false}
              fitPadding={50}
              highlight={highlight}
              onPointClick={(key) => setHighlight(key)}
            />
          ) : (
            <div className="empty">Nada en esta categoría aquí.</div>
          )}
        </div>
        <div className="side-map-foot">Color: azul por decidir · verde en itinerario · dorado añadido. Icono: ⭐ imprescindible · 🎒 actividad · 🍽️ restaurante. Aro blanco = día {selectedDay?.dayNumber ?? 'seleccionado'}.</div>
      </div>
    )
  }

  // ===== Día (Hoy / Itinerario / detalle) =====
  const day = trip.days.find((d) => d.id === focusDayId) ?? activeDay(new Date())
  const dest = destById(day.destinationId)
  const destColor = DEST_HEX[dest.colorVar] ?? '#1a1a2a'
  const agenda = buildAgenda(day.id, { addedByDay, movedBase, hiddenBase, order })

  const points: MapPoint[] = agenda.filter((i) => i.coords).map((i, idx) => ({
    lat: i.coords!.lat, lon: i.coords!.lon, n: idx + 1, label: i.name,
    color: i.kind === 'added' ? '#d4900a' : destColor, key: i.key,
  }))
    const agendaKeys = new Set(agenda.filter((i) => i.coords).map((i) => `${i.coords!.lat.toFixed(3)},${i.coords!.lon.toFixed(3)}`))
    const extraPoints: MapPoint[] = trip.catalog
      .filter((p) => p.destinationId === day.destinationId && p.coords)
      .filter((p) => !agendaKeys.has(`${p.coords!.lat.toFixed(3)},${p.coords!.lon.toFixed(3)}`))
      .map((p) => ({
        lat: p.coords!.lat,
        lon: p.coords!.lon,
        n: '',
        label: p.name,
        color: destColor,
        key: p.id,
        pinClass: `explore-pin ${p.must ? 'must' : p.kind === 'food' ? 'food' : 'activity'} candidate`,
      }))

  function scrollToStop(key: string) {
    const el = document.getElementById(`stop-${key}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el?.classList.add('stop-flash')
    setTimeout(() => el?.classList.remove('stop-flash'), 1200)
  }

  return (
    <div className="side-map-inner" style={{ ['--dest' as string]: destColor }}>
      <div className="side-map-head">🗺️ {day.dayNumber === null ? 'Salida' : `Día ${day.dayNumber}`} · {day.date} · {dest.emoji} {day.title}</div>
      <div className="side-map-canvas">
        {points.length > 0 ? (
          <TripMap
            key={day.id}
            points={points}
            extraPoints={extraPoints}
            anchors={[...dayAnchors(day), ...dayAtms(day)]}
            height="100%"
            rounded={false}
            expandable={false}
            onPointClick={(key) => { setHighlight(key); scrollToStop(key) }}
            onExtraPointAction={(placeId) => addPlace(day.id, placeId)}
            extraActionLabel={`Añadir al día ${day.dayNumber ?? ''}`.trim()}
            highlight={highlight}
          />
        ) : (
          <div className="empty">Sin mapa para este día.</div>
        )}
      </div>
      <div className="side-map-foot">Números = itinerario · azul por decidir · ⭐ imprescindible · 🎒 actividad · 🍽️ restaurante · popup para añadir al día</div>
    </div>
  )
}
