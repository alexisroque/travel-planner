import { trip } from '../data/trip'
import type { Place } from '../types'

export type ExploreView = 'all' | 'must' | 'activity' | 'food' | 'kids'
export type ExploreSort = 'rank' | 'zone' | 'price' | 'alpha' | 'pop'

export const EXPLORE_VIEWS: { key: ExploreView; label: string }[] = [
  { key: 'all', label: '🗂️ Todo' },
  { key: 'must', label: '⭐ Imprescindibles' },
  { key: 'activity', label: '🎒 Actividades' },
  { key: 'food', label: '🍽️ Restaurantes' },
  { key: 'kids', label: '🧒 Ideal niños' },
]

export const EXPLORE_SORTS: { key: ExploreSort; label: string }[] = [
  { key: 'rank', label: 'Recomendado' },
  { key: 'pop', label: 'Popularidad' },
  { key: 'zone', label: 'Zona' },
  { key: 'price', label: 'Precio' },
  { key: 'alpha', label: 'A-Z' },
]

export const VIEW_LABEL = Object.fromEntries(EXPLORE_VIEWS.map((v) => [v.key, v.label])) as Record<ExploreView, string>

const priceNum = (p: Place) => {
  if (!p.price) return 9999
  if (/gratis/i.test(p.price)) return 0
  const m = /(\d+)/.exec(p.price)
  return m ? +m[1] : 9999
}

const SORTERS: Record<ExploreSort, (a: Place, b: Place) => number> = {
  rank: (a, b) => a.rank - b.rank,
  pop: (a, b) => (b.rating ?? 0) - (a.rating ?? 0) || a.rank - b.rank,
  zone: (a, b) => (a.zone ?? '').localeCompare(b.zone ?? '') || a.rank - b.rank,
  price: (a, b) => priceNum(a) - priceNum(b) || a.rank - b.rank,
  alpha: (a, b) => a.name.localeCompare(b.name),
}

export function matchExploreView(p: Place, view: ExploreView) {
  return view === 'all' ? true : view === 'must' ? !!p.must : view === 'food' ? p.kind === 'food' : view === 'kids' ? !!p.forKids : p.kind === 'activity'
}

export function placesForDestination(destId: string) {
  return trip.catalog.filter((p) => p.destinationId === destId)
}

export function filteredExplorePlaces(destId: string, view: ExploreView, sort: ExploreSort) {
  return placesForDestination(destId)
    .filter((p) => matchExploreView(p, view))
    .sort(SORTERS[sort])
}
