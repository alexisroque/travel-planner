import { trip } from '../data/trip'

// Descarga de tiles para uso sin conexión. Precargamos las teselas del área de
// cada destino con la MISMA URL que pide Leaflet (mismo subdominio y zoom), de
// modo que el service worker (CacheFirst 'map-tiles') las guarde y el mapa
// funcione offline después — imprescindible en Borneo (sin cobertura).

interface Tile { z: number; x: number; y: number }
interface Bounds { minLat: number; maxLat: number; minLon: number; maxLon: number }

const MAX_TILES = 800 // tope por región para no saturar el caché (3000 entradas)

function lon2x(lon: number, z: number) { return Math.floor(((lon + 180) / 360) * 2 ** z) }
function lat2y(lat: number, z: number) {
  const r = (lat * Math.PI) / 180
  return Math.floor(((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * 2 ** z)
}

// Mismo subdominio que elige Leaflet: 'abcd'[(x+y) % 4]
function tileUrl({ z, x, y }: Tile) {
  const sub = 'abcd'[Math.abs(x + y) % 4]
  return `https://${sub}.basemaps.cartocdn.com/rastertiles/voyager/${z}/${x}/${y}.png`
}

function tilesIn(b: Bounds, minZ: number, maxZ: number): Tile[] {
  const out: Tile[] = []
  for (let z = minZ; z <= maxZ; z++) {
    const x0 = lon2x(b.minLon, z), x1 = lon2x(b.maxLon, z)
    const y0 = lat2y(b.maxLat, z), y1 = lat2y(b.minLat, z) // lat invertida en Y
    for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++)
      for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++)
        out.push({ z, x, y })
  }
  return out
}

// Recoge todas las coordenadas conocidas de un destino (alojamiento, paradas de
// sus días y sitios del catálogo) y devuelve un bbox con margen.
export function destBounds(destId: string): Bounds | null {
  const pts: { lat: number; lon: number }[] = []
  const dest = trip.destinations.find((d) => d.id === destId)
  if (dest?.coords) pts.push(dest.coords)
  trip.accommodations.filter((a) => a.destinationId === destId && a.coords).forEach((a) => pts.push(a.coords!))
  trip.days.filter((d) => d.destinationId === destId).forEach((d) => (d.stops ?? []).forEach((s) => s.coords && pts.push(s.coords)))
  trip.catalog.filter((p) => p.destinationId === destId && p.coords).forEach((p) => pts.push(p.coords!))
  if (pts.length === 0) return null
  const lats = pts.map((p) => p.lat), lons = pts.map((p) => p.lon)
  const pad = 0.03
  return { minLat: Math.min(...lats) - pad, maxLat: Math.max(...lats) + pad, minLon: Math.min(...lons) - pad, maxLon: Math.max(...lons) + pad }
}

// Elige el rango de zoom más detallado que quepa bajo el tope de teselas.
export function planTiles(b: Bounds): Tile[] {
  const minZ = 10
  for (let maxZ = 16; maxZ >= minZ; maxZ--) {
    const t = tilesIn(b, minZ, maxZ)
    if (t.length <= MAX_TILES) return t
  }
  return tilesIn(b, minZ, minZ)
}

export function countRegionTiles(destId: string): number {
  const b = destBounds(destId)
  return b ? planTiles(b).length : 0
}

// Descarga con concurrencia limitada; informa del progreso 0..1.
export async function downloadRegion(destId: string, onProgress?: (done: number, total: number) => void): Promise<number> {
  const b = destBounds(destId)
  if (!b) return 0
  const tiles = planTiles(b)
  let done = 0
  const queue = [...tiles]
  const CONCURRENCY = 6

  async function worker() {
    while (queue.length) {
      const t = queue.shift()!
      try { await fetch(tileUrl(t), { mode: 'cors', cache: 'reload' }) } catch { /* sin red: se reintenta otro día */ }
      done++
      onProgress?.(done, tiles.length)
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker))
  return tiles.length
}
