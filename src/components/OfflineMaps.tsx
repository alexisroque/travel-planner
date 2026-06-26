import { useState } from 'react'
import { trip } from '../data/trip'
import { usePlanner } from '../store'
import { countRegionTiles, downloadRegion } from '../lib/offlineMaps'

export default function OfflineMaps() {
  const dests = trip.destinations.filter((d) => d.id !== 'travel' && d.coords)
  const mapPacks = usePlanner((s) => s.mapPacks)
  const setMapPack = usePlanner((s) => s.setMapPack)
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [busy, setBusy] = useState<string | null>(null)
  const online = navigator.onLine

  async function dl(destId: string) {
    if (busy) return
    setBusy(destId)
    setProgress((p) => ({ ...p, [destId]: 0 }))
    try {
      const total = await downloadRegion(destId, (done, t) => setProgress((p) => ({ ...p, [destId]: t ? done / t : 0 })))
      setMapPack(destId, total, Date.now())
    } finally {
      setBusy(null)
      setProgress((p) => ({ ...p, [destId]: 1 }))
    }
  }

  async function dlAll() {
    for (const d of dests) await dl(d.id)
  }

  return (
    <div className="card offline-maps">
      {!online && <div className="om-warn">📴 Sin conexión: conéctate al WiFi para descargar mapas.</div>}
      <div className="om-intro">Descarga el mapa de cada zona con WiFi para usarlo sin cobertura (imprescindible en Borneo). Solo el mapa; el plan ya funciona offline.</div>
      {dests.map((d) => {
        const pack = mapPacks[d.id]
        const prog = progress[d.id]
        const isBusy = busy === d.id
        const tiles = countRegionTiles(d.id)
        return (
          <div key={d.id} className="om-row">
            <div className="om-body">
              <span className="om-name">{d.emoji} {d.name}</span>
              <span className="om-meta">
                {isBusy ? `Descargando… ${Math.round((prog ?? 0) * 100)}%`
                  : pack ? `✓ Descargado · ${pack.tiles} teselas`
                  : `~${tiles} teselas`}
              </span>
              {isBusy && <span className="om-bar"><i style={{ width: `${Math.round((prog ?? 0) * 100)}%` }} /></span>}
            </div>
            <button className={`om-btn ${pack ? 'done' : ''}`} disabled={!online || !!busy} onClick={() => dl(d.id)}>
              {isBusy ? '…' : pack ? 'Actualizar' : 'Descargar'}
            </button>
          </div>
        )
      })}
      <button className="om-all" disabled={!online || !!busy} onClick={dlAll}>⬇️ Descargar todas las zonas</button>
    </div>
  )
}
