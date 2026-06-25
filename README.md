# 🌏 Travel Planner · Familia Roque — Gran Viaje Asia 2026

PWA móvil instalable y **offline-first** para el viaje familiar de 23 días por Singapur → Borneo → Kuala Lumpur → Bali (12 Jul – 5 Ago 2026). Un clon especializado de lo mejor de Wanderlog (itinerario) + TripIt (alertas) para una familia multi-destino.

## Estado: v1 funcionando 🎉

| Fase | Estado |
|------|--------|
| 1 · Benchmarking | ✅ Completado |
| 1 · Spec de funcionalidades | ✅ Completado |
| 1 · Arquitectura PWA + modelo de datos | ✅ Completado |
| 2 · Carga de contenido del viaje | ✅ Completado (24 días, 9 legs, 7 hoteles, 22 tareas, 28 ítems de presupuesto, 12 restaurantes) |
| 3 · Planificación día a día al detalle | ✅ v1 (plan por franjas) — iterando |

## La app (v1)

PWA en **React + Vite + TypeScript**, offline-ready (vite-plugin-pwa) e instalable. Estado persistente con Zustand + localStorage (checks de tareas y reservas). 7 pantallas con navegación inferior móvil:

- **🏠 Hoy** — día activo según fecha real + countdown al viaje, plan por franjas, mañana, pendientes.
- **🗓️ Días** — itinerario de 23 días agrupado por destino, filtrable.
- **✈️ Vuelos** — 7 vuelos + 2 ferries con **modelado de trasbordo propio** (billetes separados, buffer, alertas) y transfers compuestos.
- **📋 Tareas** — pendientes por urgencia con deadlines y coste.
- **💶 Budget** — presupuesto por categoría, pagado vs. pendiente.
- **📍 Destinos** — fichas contextuales (moneda, transporte, enchufe, agua), alertas, restaurantes y emergencias.

### Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción (PWA)
npm run preview  # previsualizar el build
```

### Próximas mejoras (v2)

Offline robusto (IndexedDB + mapas PMTiles), sync multidispositivo, push real, modo niños, registro de gastos reales, import de reservas por email.

## Documentación

- [`docs/01-benchmarking.md`](docs/01-benchmarking.md) — "lo mejor de cada app", MVP vs avanzado, diferenciadores.
- [`docs/02-spec-funcionalidades.md`](docs/02-spec-funcionalidades.md) — visión, personas, feature set priorizado, entidades.
- [`docs/03-arquitectura-pwa.md`](docs/03-arquitectura-pwa.md) — stack, offline, modelo de datos TS, pantallas.

## El viaje

- **Familia Roque**: 2 adultos + Aira (9) + Leo (5).
- **Ruta**: BCN → Singapur → Borneo (Sepilok + Kinabatangan) → Kuala Lumpur → Bali (Ubud + Gili Air + Sanur) → BCN.
- **Presupuesto**: ~€12.800. 7 vuelos, ferries, transfers, lodge todo-incluido.
- Fuente canónica: docx Marco v1.0 + HTML (el Excel es versión anterior).
