import { useState } from 'react'
import { Link } from 'react-router-dom'
import { passportCategories, passportRanks, type Stamp } from '../data/passport'
import { passportCategoryLevels, passportStampDetails } from '../data/passportDetails'
import { usePlanner, useUI } from '../store'
import TripMap, { type MapPoint } from '../components/TripMap'

const CONFETTI = ['🎉', '✨', '🎊', '⭐', '🌟', '🥳']
const KIDS = [{ id: 'aira', name: 'Aira', emoji: '👧' }, { id: 'leo', name: 'Leo', emoji: '👦' }]

export default function Passport() {
  const passportDone = usePlanner((s) => s.passportDone)
  const togglePassport = usePlanner((s) => s.togglePassport)
  const passportGeo = usePlanner((s) => s.passportGeo)
  const setPassportGeo = usePlanner((s) => s.setPassportGeo)
  const kid = useUI((s) => s.passportKid)
  const setKid = useUI((s) => s.setPassportKid)
  const [celebrate, setCelebrate] = useState<Stamp | null>(null)
  const [selected, setSelected] = useState<Stamp | null>(null)
  const key = (stampId: string) => `${kid}:${stampId}`

  const allStamps = passportCategories.flatMap((c) => c.stamps)
  const total = allStamps.length
  const got = allStamps.filter((s) => passportDone[key(s.id)]).length
  const pct = Math.round((got / total) * 100)
  const rank = [...passportRanks].reverse().find((r) => got >= r.min) ?? passportRanks[0]
  const kidName = KIDS.find((k) => k.id === kid)?.name ?? ''
  const categoryProgress = passportCategories.map((cat) => {
    const cGot = cat.stamps.filter((s) => passportDone[key(s.id)]).length
    const levels = passportCategoryLevels[cat.id]
    const levelIndex = cGot === cat.stamps.length ? 2 : cGot >= Math.ceil(cat.stamps.length * 2 / 3) ? 1 : cGot >= Math.ceil(cat.stamps.length / 3) ? 0 : -1
    const nextTarget = levelIndex < 0 ? Math.ceil(cat.stamps.length / 3) : levelIndex === 0 ? Math.ceil(cat.stamps.length * 2 / 3) : cat.stamps.length
    return { cat, cGot, levels, levelIndex, nextTarget, pct: Math.round((cGot / cat.stamps.length) * 100) }
  })

  // Sellos con ubicación guardada → puntos para el mapa
  const stampPoints: MapPoint[] = allStamps
    .filter((s) => passportGeo[key(s.id)])
    .map((s) => { const g = passportGeo[key(s.id)]; return { lat: g.lat, lon: g.lng, emoji: s.emoji, label: s.label } })

  function sealStamp(stamp: Stamp) {
    const k = key(stamp.id)
    const wasOn = !!passportDone[k]
    if (wasOn) {
      setSelected(null)
      return
    }
    togglePassport(k)
    setSelected(null)
    setCelebrate(stamp)
    setTimeout(() => setCelebrate(null), 5000)
    // Guardamos dónde se consiguió el sello (si el peque da permiso de ubicación)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPassportGeo(k, { lat: pos.coords.latitude, lng: pos.coords.longitude, ts: Date.now() }),
        () => {},
        { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 },
      )
    }
  }

  const photoUrl = (stamp: Stamp) => {
    const q = passportStampDetails[stamp.id]?.photoQuery ?? `${stamp.label} real photo`
    return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(q)}`
  }

  return (
    <div className="fadein">
      <div className="page-head">
        <Link to="/resumen" className="back-link">‹ Resumen</Link>
        <h1>Pasaporte de Exploradores</h1>
        <div className="sub">Sellad cada cosa que viváis 🛂</div>
      </div>

      {/* Selector de niño */}
      <div className="pp-kids">
        {KIDS.map((k) => (
          <button key={k.id} className={`pp-kid ${kid === k.id ? 'on' : ''}`} onClick={() => setKid(k.id)}>{k.emoji} {k.name}</button>
        ))}
      </div>

      {/* Progreso + rango */}
      <div className="card pp-progress">
        <div className="pp-rank"><span className="pp-rank-emoji">{rank.emoji}</span><div><div className="pp-rank-label">{rank.label}</div><div className="pp-rank-count">{kidName}: {got} de {total} sellos · {pct}%</div></div></div>
        <div className="prog" style={{ marginTop: 10 }}><i style={{ width: `${pct}%`, background: 'var(--ok)' }} /></div>
      </div>

      <div className="card pp-achievements">
        <div className="ppa-head">
          <strong>🏅 Mis logros</strong>
          <span>{got}/{total}</span>
        </div>
        {categoryProgress.map(({ cat, cGot, levels, levelIndex, nextTarget, pct }) => (
          <div key={cat.id} className="ppa-row">
            <div className="ppa-line">
              <span>{cat.icon} {cat.title}</span>
              <b>{levelIndex >= 0 ? levels[levelIndex] : 'Sin rango aún'}</b>
            </div>
            <div className="ppa-bar"><i style={{ width: `${pct}%` }} /></div>
            <div className="ppa-next">{cGot}/{cat.stamps.length} · {cGot === cat.stamps.length ? 'nivel máximo conseguido' : `siguiente nivel en ${nextTarget}`}</div>
          </div>
        ))}
      </div>

      {/* Mapa de sellos: dónde consiguió cada sello */}
      <div className="section-title">🗺️ Mapa de sellos de {kidName}</div>
      {stampPoints.length > 0 ? (
        <div className="card tight" style={{ padding: 0, overflow: 'hidden' }}>
          <TripMap key={`pp-${kid}-${stampPoints.length}`} points={stampPoints} showRoute={false} height="240px" rounded={false} expandable fitPadding={40} />
        </div>
      ) : (
        <div className="pack-intro">Aún no hay sellos con ubicación. Cuando {kidName} consiga un sello y deis permiso de ubicación, aparecerá aquí en el mapa. 📍</div>
      )}

      {passportCategories.map((cat) => {
        const cGot = cat.stamps.filter((s) => passportDone[key(s.id)]).length
        return (
          <div key={cat.id}>
            <div className="section-title pack-head"><span>{cat.icon} {cat.title}</span><span className="pack-count">{cGot}/{cat.stamps.length}</span></div>
            <div className="pp-grid">
              {cat.stamps.map((s) => {
                const on = !!passportDone[key(s.id)]
                return (
                  <button key={s.id} className={`pp-stamp ${on ? 'on' : ''}`} onClick={() => setSelected(s)}>
                    <span className="pp-emoji">{s.emoji}</span>
                    <span className="pp-label">{s.label}</span>
                    {s.where && <span className="pp-where">{s.where}</span>}
                    {on && <span className="pp-check">✓</span>}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
      <div style={{ height: 12 }} />

      {selected && (
        <div className="pp-info-backdrop" onClick={() => setSelected(null)}>
          <div className="pp-info-card" onClick={(e) => e.stopPropagation()}>
            <button className="pp-info-x" onClick={() => setSelected(null)} aria-label="Cerrar">×</button>
            <div className="pp-info-emoji">{selected.emoji}</div>
            <h2>{selected.label}</h2>
            {selected.where && <div className="pp-info-where">📍 {selected.where}</div>}
            <p>{passportStampDetails[selected.id]?.what ?? selected.fact}</p>
            {passportStampDetails[selected.id]?.howToSpot && (
              <div className="pp-info-spot">🔎 <b>Pista de explorador:</b> {passportStampDetails[selected.id].howToSpot}</div>
            )}
            {selected.fact && <div className="pp-info-fact">🤓 ¿Sabías que…? {selected.fact}</div>}
            <button className="pp-seal-btn" onClick={() => sealStamp(selected)} disabled={!!passportDone[key(selected.id)]}>
              {passportDone[key(selected.id)] ? '✓ Sello conseguido' : '🎉 ¡Sellar!'}
            </button>
            <a className="pp-photo-btn" href={photoUrl(selected)} target="_blank" rel="noreferrer">
              🔍 Ver una foto de verdad
            </a>
          </div>
        </div>
      )}

      {/* Celebración al conseguir un sello */}
      {celebrate && (
        <div className="pp-celebrate" onClick={() => setCelebrate(null)}>
          <div className="ppc-card">
            <div className="ppc-emoji">{celebrate.emoji}</div>
            <div className="ppc-title">¡Sello conseguido!</div>
            <div className="ppc-label">{celebrate.label}</div>
            <div className="ppc-fact">🎁 Dato extra: {passportStampDetails[celebrate.id]?.rewardFact ?? celebrate.fact}</div>
            <a className="ppc-photo" href={photoUrl(celebrate)} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>Ver foto real</a>
          </div>
          <div className="ppc-confetti">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} style={{ left: `${(i * 7 + 3) % 100}%`, animationDelay: `${(i % 5) * 0.06}s` }}>{CONFETTI[i % CONFETTI.length]}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
