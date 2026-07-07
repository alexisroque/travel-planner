import type { Climate, Stop } from '../types'

// Coordenadas, clima y sol por destino (normales de julio-agosto).
export const destGeo: Record<string, { coords?: { lat: number; lon: number }; climate?: Climate; sun?: { rise: string; set: string } }> = {
  sin: { coords: { lat: 1.2897, lon: 103.8501 }, sun: { rise: '07:05', set: '19:11' }, climate: { tempDay: 31, tempNight: 26, label: 'Cálido y muy húmedo', advice: 'Chubascos posibles. Hidratarse, buscar AC al mediodía.' } },
  sepilok: { coords: { lat: 5.8740, lon: 117.9460 }, sun: { rise: '05:58', set: '18:20' }, climate: { tempDay: 32, tempNight: 24, label: 'Selva húmeda, lluvias', advice: 'Manga larga al amanecer/anochecer. DEET siempre.' } },
  kinabatangan: { coords: { lat: 5.5170, lon: 118.2950 }, sun: { rise: '05:55', set: '18:22' }, climate: { tempDay: 32, tempNight: 24, label: 'Tropical húmedo', advice: 'Aguas bajas en julio = mejor fauna. Bolsas estancas en barca.' } },
  kl: { coords: { lat: 3.1539, lon: 101.7120 }, sun: { rise: '07:08', set: '19:25' }, climate: { tempDay: 32, tempNight: 25, label: 'Cálido, chubascos tarde', advice: 'Tormentas a media tarde. Aprovechar mañanas y malls con AC.' } },
  ubud: { coords: { lat: -8.5069, lon: 115.2625 }, sun: { rise: '06:30', set: '18:08' }, climate: { tempDay: 29, tempNight: 22, label: 'Seco, noches frescas', advice: 'Estación seca en Bali. Mañanas frescas, sol fuerte al mediodía.' } },
  gili: { coords: { lat: -8.3560, lon: 116.0840 }, sun: { rise: '06:25', set: '18:05' }, climate: { tempDay: 30, tempNight: 25, label: 'Seco y soleado', advice: 'Sol intenso sobre el agua. Protector biodegradable y sombra.' } },
  sanur: { coords: { lat: -8.6878, lon: 115.2620 }, sun: { rise: '06:31', set: '18:09' }, climate: { tempDay: 29, tempNight: 24, label: 'Seco, brisa marina', advice: 'Época seca. Brisa agradable. Sol fuerte 11-15h.' } },
}

type Enrich = { stops?: Stop[]; highlights?: string[]; quickTips?: string[] }

// Plan "de máximos" como guía experto en familias y Sudeste Asiático.
// Cada día incluye desayuno/comida/cena y actividades sin huecos muertos.
export const dayEnrich: Record<string, Enrich> = {
  d0: {
    highlights: ['✈️ Vuelo BCN→SIN', '🌙 Nocturno 13h15'],
    quickTips: ['Estar en T1 BCN a las 9:00 (vuelo 11:40).', 'Cenad ligero a bordo e intentad dormir: aterrizáis a las 6:55.'],
    stops: [
      { n: 1, name: 'Aeropuerto BCN-El Prat (T1)', category: 'Aeropuerto', emoji: '🛫', coords: { lat: 41.2974, lon: 2.0833 }, time: '09:00', hours: 'Vuelo 11:40 · estar en T1 a las 09:00', note: 'Facturación SQ387 (sale a las 11:40, ~2h de margen). Agua vacía para rellenar tras el control.', transitToNext: { mode: 'flight', note: 'SQ387 BCN 11:40 → SIN 06:55+1 · 13h15 non-stop' } },
      { n: 2, name: 'Changi Airport (T3)', category: 'Aeropuerto', emoji: '🛬', coords: { lat: 1.3564, lon: 103.9876 }, time: '06:55+1', note: 'Inmigración rápida. Día 1 empieza aquí.' },
    ],
  },

  // ===================== SINGAPUR =====================
  d1: {
    highlights: ['🌳 Botanic Gardens', '🏖️ Sentosa (Palawan)', '✨ Wings of Time'],
    quickTips: [
      'Llegada directa al hotel: el Jewel (Rain Vortex) de Changi lo veréis a la VUELTA, con la escala de 6.5h.',
      'Check-in real del hotel a las ~14:00 — por la mañana solo dejáis maletas. La siesta antes de Sentosa es el reset del jet lag.',
      '✨ Wings of Time en la playa de Sentosa: pases 19:40 y 20:40 (~18 SGD). 🌇 Atardece a las 19:11. Hoy todo en el oeste/sur, sin cruzar a Marina Bay.',
    ],
    stops: [
      { n: 1, name: 'Llegada Changi → Grab al hotel', category: 'Aeropuerto', emoji: '🛬', coords: { lat: 1.3564, lon: 103.9876 }, time: '06:55', note: 'Inmigración y directos al hotel para no perder la mañana. Hoy no paramos en el aeropuerto: el Jewel y su Rain Vortex los disfrutaréis a la vuelta, con la escala larga.',
        transitToNext: { mode: 'car', min: 25, note: 'Grab al hotel', line: 'Grab / taxi', board: 'Punto Grab/taxis en T3', alight: 'Holiday Inn Orchard', fare: '~25 SGD (~17€) los 4', tip: "Alternativa barata: MRT (East-West verde, cambio en Tanah Merah → North-South roja hasta Orchard), ~45-60 min y ~2 SGD/persona, pero con maletas es incómodo." } },
      { n: 2, name: 'Holiday Inn Orchard', category: 'Hotel', emoji: '🛏️', coords: { lat: 1.3048, lon: 103.8318 }, time: '09:30', note: 'Dejar maletas en recepción (check-in a las 14:00). Aseo, agua y a por la mañana.', status: 'booked',
        transitToNext: { mode: 'car', min: 12, note: 'Grab al Botanic Gardens', fare: '~8 SGD', tip: 'También MRT línea Downtown (azul) hasta Botanic Gardens, ~10 min.' } },
      { n: 3, name: 'Singapore Botanic Gardens + Orchid Garden', category: 'Naturaleza', emoji: '🌳', coords: { lat: 1.3138, lon: 103.8159 }, time: '10:30', hours: 'Abre 5:00 · Orchid Garden ~5 SGD', note: 'Patrimonio UNESCO, gratis. Mañana suave y a la sombra: lago de cisnes, ardillas, césped donde corren los niños y el jardín de orquídeas. Ideal con jet lag sin quedarse parados.',
        guide: {
          intro: 'Es el único jardín tropical del mundo declarado Patrimonio UNESCO, y para los de Singapur es "su" parque de toda la vida: aquí nació el caucho del sudeste asiático y se cruza la orquídea nacional. Entráis gratis; solo se paga el jardín de orquídeas, que es justo lo que merece la pena.',
          time: '2–2½ h', bestTime: 'A primera hora (abre a las 5:00): fresco, luz bonita y sin grupos.',
          route: [
            'Entra por Tanglin Gate (la parte histórica) y baja al Swan Lake, el lago de los cisnes negros.',
            'Sigue al Bandstand, el templete blanco entre árboles centenarios — la foto clásica del jardín.',
            'Sube al National Orchid Garden (la única parte de pago): la mayor exposición de orquídeas del mundo, con la "VIP Orchid Garden" de flores dedicadas a reyes y famosos.',
            'Termina hacia el norte en el Jacob Ballas Children\'s Garden y Palm Valley para que los peques corran antes de comer.',
          ],
          tips: [
            'Solo el Orchid Garden cuesta (~5–15 SGD adultos, niños <12 gratis); el resto del parque es gratis.',
            'Llega en MRT (líneas Downtown azul / Circle amarilla, parada "Botanic Gardens") justo en la Bukit Timah Gate, al lado del jardín infantil.',
            'Hay fuentes de agua para rellenar y refugios de lluvia por todo el parque; no necesitas comprar nada dentro.',
          ],
          family: [
            'Jacob Ballas Children\'s Garden: el mejor jardín infantil de Asia, GRATIS y para menores de 14 — casa en el árbol, toboganes, zonas de agua para mojarse y huerto. Aquí sueltan el "wow".',
            'Buscad los cisnes negros del Swan Lake y las ardillas y varanos (lagartos grandes) que corretean sueltos — contádselo como una mini-safari urbana.',
            'En el Orchid Garden, retadles a encontrar la orquídea "Vanda Miss Joaquim", la flor nacional de Singapur.',
          ],
          eat: [
            { name: 'Adam Road Food Centre', dish: 'nasi lemak de Selera Rasa, mee rebus', note: 'Hawker famoso y de locales a 5 min de la Bukit Timah Gate. Barato, con aire libre y muy limpio (nota NEA a la vista). La mejor opción local al salir.' },
            { name: 'Casa Verde (dentro del jardín)', note: 'Solo si llueve o no queréis moveros: cómodo pero más occidental y caro. Mejor el hawker de Adam Road.' },
          ],
        },
        transitToNext: { mode: 'walk', min: 5, note: 'Dentro de los jardines' } },
      { n: 4, name: 'Comida: Adam Road Food Centre', category: 'Comida', emoji: '🍜', coords: { lat: 1.3236, lon: 103.8140 }, time: '13:00', note: 'Hawker auténtico y de locales, pegado a la Bukit Timah Gate del jardín. Nasi lemak de Selera Rasa (el favorito hasta de la realeza malaya), mee rebus, rojak y zumos frescos. Barato, limpio y eligen ellos. Nada de pizza: comida de verdad de Singapur.',
        transitToNext: { mode: 'car', min: 12, note: 'Vuelta al hotel' } },
      { n: 5, name: 'Holiday Inn — check-in + siesta', category: 'Hotel', emoji: '😴', coords: { lat: 1.3048, lon: 103.8318 }, time: '14:30', note: 'Check-in real, maletas a la habitación. Siesta o piscina 2h: ESTE es el reset del jet lag antes de la tarde en la playa.', status: 'booked',
        transitToNext: { mode: 'car', min: 20, note: 'Grab a Sentosa (Beach Station)', fare: '~15 SGD los 4', tip: 'MRT alternativo: roja Orchard→Dhoby Ghaut, morada (NE) hasta HarbourFront y Sentosa Express (~4 SGD). Con niños cansados, Grab directo compensa.' } },
      { n: 6, name: 'Sentosa — Playa Palawan', category: 'Playa', emoji: '🏖️', alt: 'A', coords: { lat: 1.2496, lon: 103.8226 }, time: '16:30', note: 'Tarde de playa: agua calmada, hamacas, puente colgante al islote del "punto más al sur de Asia continental". Plan tranquilo y al aire libre, perfecto tras el vuelo.',
        guide: {
          intro: 'Sentosa es la isla de ocio de Singapur — los locales vienen el finde a "isla" sin salir de la ciudad. Palawan es la playa más familiar: agua sin olas, arena traída y ese puente colgante que lleva al punto más al sur del Asia continental. Con jet lag, es el plan perfecto de tarde: aire libre, sombra y nada de prisa.',
          time: '2–3 h de playa + show al anochecer', bestTime: 'De 16:30 en adelante: baja el sol y se está fresco.',
          route: [
            'Entra a Sentosa por el Sentosa Express (monorraíl desde VivoCity) o en Grab directo a Beach Station.',
            'Coge el Beach Shuttle (tranvía gratis) hasta Palawan Beach.',
            'Cruza el puente colgante a los dos torreones del "Southernmost Point of Continental Asia" — la foto obligada.',
            'Vuelta a la arena: hamacas, castillo de arena y baño tranquilo hasta la cena.',
          ],
          tips: [
            'Entrar a Sentosa a pie por el Boardwalk es baratísimo y las playas y el tranvía de playa son GRATIS: no hace falta pagar atracciones para disfrutar el día.',
            'Lleva los bañadores puestos desde el hotel y una bolsa estanca; hay duchas y aseos en Beach Station.',
            'Si aprieta el sol o la lluvia, tienes el plan B cubierto (S.E.A. Aquarium) a un paso — es la opción "B" de este mismo hueco.',
          ],
          family: [
            'El puente colgante se balancea un poco: para los peques es media aventura. Subid a los torreones a ver el mar.',
            'Explicadles que están literalmente en el punto más al sur del continente asiático, ¡a un pasito del ecuador!',
          ],
          eat: [
            { name: 'Malaysian Food Street (Resorts World Sentosa)', dish: 'Hainanese chicken rice, char kway teow, laksa', note: 'Puestos malayos clásicos con aire acondicionado, dentro de la isla. Tourist-friendly y sabor local, sin desviarse.' },
            { name: 'Coastes / FOC Sentosa (Siloso Beach)', note: 'Cena con los pies casi en la arena, camino del show de Wings of Time.' },
          ],
        },
        transitToNext: { mode: 'walk', min: 10, note: 'Beach tram / paseo a Beach Station' } },
      { n: 7, name: 'S.E.A. Aquarium', category: 'Naturaleza', emoji: '🐠', alt: 'B', coords: { lat: 1.2580, lon: 103.8208 }, time: '16:30', hours: '~30€/adulto', note: 'Plan cubierto y con AC en la misma Sentosa por si aprieta el calor o la lluvia: uno de los acuarios mayores del mundo, túnel de tiburones y manta rayas. Encanta a Leo y Aira.',
        guide: {
          intro: 'Uno de los acuarios más grandes del mundo, con más de 100.000 animales. Su joya es el "Open Ocean", una ventana gigante donde pasan mantas y tiburones — hipnotiza. Es el plan perfecto de aire acondicionado si el calor o la lluvia aprietan.',
          time: '1½–2 h', bestTime: 'Media tarde: escapas del calor y llegas al show nocturno después.',
          route: [
            'Sigue el recorrido marcado: empieza por los naufragios y peces de arrecife.',
            'Detente en el gran panel del "Open Ocean": siéntate en el suelo con los peques y esperad a que pasen las mantas gigantes.',
            'Termina en el túnel de tiburones y la zona de medusas iluminadas.',
          ],
          tips: [
            'Compra la entrada ONLINE (Klook): más barata y sin cola.',
            'Combínalo con la Playa Palawan (opción A del mismo hueco) si el día acompaña: playa primero, acuario si refresca.',
          ],
          family: [
            'Reto: encontrar a "Nemo" (pez payaso) y "Dory" (pez cirujano azul) entre los arrecifes.',
            'En el panel gigante, contad juntos cuántas mantas pasan — a Leo le encantará.',
          ],
          eat: [
            { name: 'Malaysian Food Street (Resorts World)', dish: 'chicken rice, char kway teow', note: 'Hawker con AC en el mismo complejo, sin salir de Sentosa.' },
          ],
        },
        transitToNext: { mode: 'walk', min: 10, note: 'Beach tram a Beach Station' } },
      { n: 8, name: 'Cena en Sentosa (Beach Station / FOC)', category: 'Comida', emoji: '🍤', coords: { lat: 1.2497, lon: 103.8186 }, time: '18:30', note: 'Cena con los pies casi en la arena: chiringuitos de Siloso (Coastes, FOC Sentosa) o food court de Beach Station. Sin prisa hasta el show.',
        transitToNext: { mode: 'walk', min: 6, note: 'Al anfiteatro de Wings of Time' } },
      { n: 9, name: 'Wings of Time — show de luz y agua', category: 'Show', emoji: '✨', coords: { lat: 1.2487, lon: 103.8169 }, time: '19:40', hours: '~18 SGD · 19:40 y 20:40', note: 'Show nocturno sobre el mar: chorros de agua, láser, fuego y música en la playa de Sentosa. Cierre redondo del primer día. Grab de vuelta al hotel.' },
    ],
  },
  d2: {
    highlights: ['🌿 Cloud Forest', '🏮 Chinatown', '🌳 Garden Rhapsody + Spectra'],
    quickTips: [
      'Día concentrado en la bahía: Gardens by the Bay, Chinatown y Marina Bay están a 1-2 paradas de MRT (línea azul Downtown). Cero traslados largos.',
      '🌳 Garden Rhapsody (19:45 y 20:45) y 💧 Spectra (20:00 y 21:00) son GRATIS y están cruzando la pasarela: dan tiempo a ver los dos.',
      'Mañana (15 Jul) vuelos a Borneo: dejad la maleta lista esta noche (mochila pequeña aparte).',
    ],
    stops: [
      { n: 1, name: 'Desayuno: Ya Kun Kaya Toast', category: 'Comida', emoji: '🍞', coords: { lat: 1.3040, lon: 103.8320 }, time: '08:15', note: 'Kaya toast con huevo pasado por agua y kopi — desayuno singapurense clásico cerca del hotel.',
        transitToNext: { mode: 'train', min: 20, note: 'MRT a Gardens by the Bay', line: 'Downtown (azul)', alight: 'Bayfront', fare: '~1,5 SGD' } },
      { n: 2, name: 'Cloud Forest + Flower Dome', category: 'Naturaleza', emoji: '🌿', coords: { lat: 1.2816, lon: 103.8636 }, time: '09:00', hours: 'Abre 9:00', note: 'Cascada interior con AC. Pasarela entre la niebla. Reservar online. Combo con Flower Dome. Empezad pronto para escapar del calor del mediodía.', status: 'pending',
        guide: {
          intro: 'Gardens by the Bay es la carta de presentación futurista de Singapur: dos domos climatizados y los famosos "Supertrees". El Cloud Forest tiene la cascada interior más alta del mundo dentro de una montaña de niebla. Con el calor de fuera, entrar aquí es un respiro literal.',
          time: '2–2½ h los dos domos', bestTime: 'Nada más abrir (9:00): fresco y sin los grupos, que llegan a media mañana.',
          route: [
            'Entra primero al Cloud Forest: te recibe la cascada de 35 m. Coge el ascensor ARRIBA del todo y baja a pie por la pasarela entre la niebla — así es cuesta abajo.',
            'Cruza al Flower Dome (el invernadero de flores más grande del mundo): jardines por regiones y baobabs. Más tranquilo, para bajar el ritmo.',
            'Fuera, guarda los Supertrees para volver al anochecer: aquí mismo es el show Garden Rhapsody y la cena en Satay by the Bay (ya en el plan de la tarde).',
          ],
          tips: [
            'Compra el combo de los dos domos ONLINE (Klook) antes de ir: más barato y te saltas la cola de taquilla.',
            'Lleva una capa fina: dentro está a ~23° y con el calor de fuera se agradece.',
            'El OCBC Skyway (pasarela entre Supertrees, ~12 SGD) se disfruta mejor al atardecer, no ahora.',
          ],
          family: [
            'La cascada del Cloud Forest y el ascensor de cristal los dejan boquiabiertos nada más entrar.',
            'Explicadles que los Supertrees son árboles "de mentira" que recogen agua de lluvia y energía del sol — de noche se iluminan y "cantan".',
          ],
          eat: [
            { name: 'Satay by the Bay', dish: 'satay, fideos, marisco hawker', note: 'Hawker dentro de los propios jardines: os pilla de camino y es donde cenaréis antes del show. Local y barato.' },
          ],
        },
        transitToNext: { mode: 'walk', min: 12, note: 'Paseo por el waterfront hasta el Merlion', tip: 'Cruzando la pasarela del helix y por delante de Marina Bay Sands.' } },
      { n: 3, name: 'Marina Bay Sands + Merlion Park', category: 'Mirador', emoji: '🦁', coords: { lat: 1.2868, lon: 103.8545 }, time: '11:30', note: 'Foto con el Merlion, vistas al hotel-barco y paseo por el waterfront de la bahía. El corazón postalero de Singapur.',
        guide: {
          intro: 'Marina Bay es la postal de Singapur: el Merlion (medio león, medio pez, símbolo de la ciudad) escupiendo agua frente al hotel-barco Marina Bay Sands. Un paseo corto que conecta lo antiguo (el río) con lo nuevo (los rascacielos).',
          time: '1–1½ h de paseo', bestTime: 'Media mañana para las fotos; al anochecer para el show Spectra (ya en el plan de noche).',
          route: [
            'Empieza en Merlion Park: la foto clásica "bebiendo" del chorro del Merlion, con Marina Bay Sands detrás.',
            'Bordea el paseo de la bahía (Jubilee Bridge) hacia el Esplanade (el edificio "durian").',
            'Cruza el puente helicoidal (Helix Bridge) hasta Marina Bay Sands: mira dentro al vestíbulo y las tiendas con su canal interior.',
          ],
          tips: [
            'Hay DOS Merlions pegados: el grande y su "cría" detrás — buscad los dos.',
            'A mediodía pega mucho el sol y hay poca sombra: gorra, agua y crema. Guarda el mirador (SkyPark) o el show para cuando refresque.',
            'Del Merlion a Chinatown hay 10 min en MRT (línea roble/Downtown) o un Grab corto: encaja con la comida de Maxwell.',
          ],
          family: [
            'Cuéntales la leyenda: un príncipe vio un león al llegar a la isla y la llamó "Singapura" (ciudad del león); el pez recuerda que era un pueblo de pescadores.',
            'Foto divertida: colocarse para "beber" o "recoger" el chorro de agua del Merlion.',
          ],
          eat: [
            { name: 'Makansutra Gluttons Bay', dish: 'char kway teow, BBQ stingray, satay', note: 'Hawker icónico junto al agua, a 5 min andando por el paseo. Local, barato y con vistas a la bahía.' },
            { name: 'Satay Street — Lau Pa Sat', dish: 'satay a la brasa', note: 'A un paseo hacia el CBD; brutal de noche cuando cortan la calle. Buen plan si acabáis por la zona.' },
          ],
        },
        transitToNext: { mode: 'train', min: 12, note: 'MRT a Chinatown', line: 'Downtown (azul)', board: 'Bayfront', alight: 'Chinatown', fare: '~1,5 SGD', freq: 'cada 3-5 min' } },
      { n: 4, name: 'Comida: Maxwell — Tian Tian Chicken Rice', category: 'Comida', emoji: '🍜', coords: { lat: 1.2807, lon: 103.8447 }, time: '13:00', note: 'El chicken rice nº1 de Singapur en el hawker más famoso, en plena Chinatown. Rápido, barato y eligen ellos.',
        transitToNext: { mode: 'walk', min: 4, note: 'Subiendo a las calles de farolillos' } },
      { n: 5, name: 'Chinatown — Buddha Tooth + Sri Mariamman', category: 'Cultura', emoji: '🏮', coords: { lat: 1.2815, lon: 103.8443 }, time: '14:30', note: 'Templo del Diente de Buda (4 plantas, gratis), el templo hindú Sri Mariamman y las calles de farolillos y puestos. Colorido y muy fotogénico para los niños.',
        guide: {
          intro: 'El Chinatown de Singapur mezcla templos chinos, hindúes y una mezquita en cuatro calles — la mejor foto del "crisol" de la ciudad. Y es donde mejor y más barato se come: dos de los hawkers más famosos del mundo están aquí.',
          time: '1½–2 h', bestTime: 'Por la tarde; al caer el sol se encienden los farolillos y es más fresco.',
          route: [
            'Empieza comiendo en el Maxwell Food Centre (Tian Tian chicken rice) — llegas con hambre y evitas el pico de mediodía.',
            'Sube al Buddha Tooth Relic Temple: 4 plantas gratis, sala roja y dorada impresionante y una azotea con jardín y una rueda de oración gigante.',
            'Camina por Pagoda St y Trengganu St (calles de farolillos y puestos de recuerdos) hasta el Sri Mariamman, el templo hindú más antiguo, con su torre de dioses de colores.',
            'Termina en Chinatown Complex si quieres el pollo Michelin de Hawker Chan o un postre.',
          ],
          tips: [
            'En los templos: hombros y rodillas cubiertos y quitarse los zapatos donde se indique. Se entra gratis; deja un pequeño donativo si quieres.',
            'Regatea con cariño en los puestos de Pagoda St (imanes, abanicos, camisetas): es parte del juego.',
            'Evita las "tiendas de suvenir" genéricas para comer; el sabor de verdad está en los hawkers (Maxwell / Chinatown Complex).',
          ],
          family: [
            'En el Buddha Tooth, buscad la rueda de oración dorada de la azotea y hacedla girar (pide un deseo).',
            'En el Sri Mariamman, retadles a contar cuántos dioses y animales de colores hay en la torre de la entrada (¡hay decenas!).',
          ],
          eat: [
            { name: 'Tian Tian (Maxwell Food Centre)', dish: 'Hainanese chicken rice', note: 'El chicken rice nº1, dentro del recorrido. Bib Gourmand, ~5 SGD. Ya está en el plan como comida.' },
            { name: 'Hawker Chan', dish: 'soya sauce chicken rice', note: 'Pollo en salsa de soja con estrella Michelin, a 2 min. El más barato del mundo con estrella.' },
          ],
        },
        transitToNext: { mode: 'train', min: 12, note: 'MRT de vuelta al hotel a descansar', line: 'North-East (morada) + roja', alight: 'Orchard', fare: '~1,5 SGD' } },
      { n: 6, name: 'Holiday Inn — ducha y descanso', category: 'Hotel', emoji: '😴', coords: { lat: 1.3048, lon: 103.8318 }, time: '16:00', note: 'Pausa para refrescarse antes de la noche de shows. Aprovechad para dejar la maleta casi lista (mañana vuelos a Borneo).', status: 'booked',
        transitToNext: { mode: 'train', min: 18, note: 'MRT de vuelta a Gardens by the Bay', line: 'roja + Downtown (azul)', board: 'Orchard', alight: 'Bayfront', fare: '~1,5 SGD' } },
      { n: 7, name: 'Cena: Satay by the Bay + OCBC Skyway', category: 'Comida', emoji: '🍢', coords: { lat: 1.2812, lon: 103.8669 }, time: '18:30', hours: 'Skyway ~12 SGD', note: 'Cena en el hawker de los jardines (satay, fideos) y subida a la pasarela OCBC Skyway entre los Supertrees con la puesta de sol (~19:11).',
        transitToNext: { mode: 'walk', min: 5, note: 'Al césped del Supertree Grove' } },
      { n: 8, name: 'Garden Rhapsody — show de luz', category: 'Show', emoji: '🌳', coords: { lat: 1.2820, lon: 103.8645 }, time: '19:45', hours: 'Gratis · 19:45 y 20:45', note: 'Luz y sonido bajo los Supertrees, tumbados en el césped. Acabado el show, paseo cruzando la bahía hacia Marina Bay Sands.',
        transitToNext: { mode: 'walk', min: 15, note: 'Paseo por la pasarela del helix hasta el Event Plaza de MBS' } },
      { n: 9, name: 'Spectra — show de agua y luz (MBS)', category: 'Show', emoji: '💧', coords: { lat: 1.2834, lon: 103.8607 }, time: '21:00', hours: 'Gratis · 20:00 y 21:00', note: 'Cierre de Singapur: agua, láser y música frente a Marina Bay Sands, sentados junto al agua. Grab de vuelta y a dormir.' },
    ],
  },

  // ===================== SIN → BORNEO =====================
  d3: {
    highlights: ['✈️ Trasbordo propio KUL', '⚠️ T4 sin MRT', '🦧 Noche en Sepilok'],
    quickTips: [
      '⚠️ AirAsia sale de T4 Changi (sin MRT) — Grab directo a "Changi Airport Terminal 4".',
      'Trasbordo propio KLIA2: recoger maletas y re-check-in. 4h de margen — comer sin prisa allí.',
      'Cambiad algo de efectivo a ringgit (MYR) en KLIA2 para el Grab/cena en Sandakan.',
    ],
    stops: [
      { n: 1, name: 'Changi Terminal 4', category: 'Aeropuerto', emoji: '⚠️', coords: { lat: 1.3386, lon: 103.9830 }, time: '08:30', note: 'Desayuno rápido en el hotel y Grab a T4 (sin MRT). Facturar AK704.',
        transitToNext: { mode: 'flight', min: 80, note: 'AK704 SIN→KUL · 10:10 → 11:30 (1h20)' } },
      { n: 2, name: 'KLIA2 — escala + comida', category: 'Aeropuerto', emoji: '🔁', coords: { lat: 2.7456, lon: 101.6865 }, time: '11:30', note: '4h de trasbordo propio: recoger maletas, re-check-in AK5194. Comer en el food court de KLIA2 (nasi lemak, Old Town White Coffee).',
        transitToNext: { mode: 'flight', min: 155, note: 'AK5194 KUL→SDK · 15:30 → 19:05 (2h35)' } },
      { n: 3, name: 'Sandakan Airport', category: 'Aeropuerto', emoji: '🛬', coords: { lat: 5.9009, lon: 118.0594 }, time: '19:05', note: 'Grab al hotel en Sepilok (~25 min).',
        transitToNext: { mode: 'car', min: 25, note: 'Grab a Sepilok', fare: '~30-40 MYR' } },
      { n: 4, name: 'Cena en Sepilok + Sepilok Jungle Resort', category: 'Hotel', emoji: '🛏️', coords: { lat: 5.8740, lon: 117.9450 }, time: '20:00', note: 'Check-in. Cena en el restaurante del resort (junto al lago, ranas y luciérnagas). A dormir: mañana orangutanes a las 10:00.', status: 'booked' },
    ],
  },

  // ===================== BORNEO — SEPILOK =====================
  d4: {
    highlights: ['🦧 Orangutanes', '🐻 Osos de sol', '🐒 Proboscis al atardecer'],
    quickTips: [
      'Feeding orangutanes 10:00. Llegar 30 min antes; guardar mochilas (los macacos roban).',
      'Sun Bear a 5 min andando del Orangutan Centre — se hacen juntos.',
      'Labuk Bay: feeding tarde 16:30, mejor luz y menos calor.',
    ],
    stops: [
      { n: 1, name: 'Desayuno en el resort', category: 'Comida', emoji: '🍳', coords: { lat: 5.8740, lon: 117.9450 }, time: '08:00', note: 'Desayuno tropical en el lodge. Ropa fresca, repelente DEET y gorra.',
        transitToNext: { mode: 'walk', min: 5, note: 'Al Orangutan Centre' } },
      { n: 2, name: 'Sepilok Orangutan Centre', category: 'Naturaleza', emoji: '🦧', coords: { lat: 5.8740, lon: 117.9492 }, time: '09:30', hours: 'Feeding 10:00', note: 'Plataforma de alimentación: orangutanes en semilibertad llegando por las cuerdas. Nursery con crías tras cristal.', status: 'pending',
        guide: {
          intro: 'Sepilok es el centro de rehabilitación de orangutanes más famoso del mundo: aquí reeducan a huérfanos para devolverlos a la selva. No es un zoo — son animales semisalvajes que vienen (o no) a la plataforma. Verlos columpiarse por las cuerdas a un metro es de los momentos del viaje.',
          time: '2–3 h (con el Sun Bear al lado)', bestTime: 'Feeding de las 10:00: llega 30–40 min antes para sitio en primera fila.',
          route: [
            'Deja mochila y comida en las taquillas: los orangutanes y macacos roban (es obligatorio).',
            'Ve primero a la Nursery (guardería): crías tras un cristal aprendiendo a trepar — puro "wow".',
            'A las 10:00, a la plataforma de alimentación del bosque: llegan por las cuerdas a por fruta.',
            'Combina con el Sun Bear Conservation Centre de al lado (los osos más pequeños del mundo) y, si hay tiempo, el Rainforest Discovery Centre.',
          ],
          tips: [
            'Compra la entrada e incluye el permiso de cámara. Nada de flash ni tocar/dar comida.',
            'Puede que NO aparezcan (buena señal: significa que encuentran comida solos en la selva). La Nursery casi siempre tiene actividad.',
            'Repelente antes de entrar y ropa clara; hay pasarelas de madera que pueden resbalar con lluvia.',
          ],
          family: [
            'Contadles que "orang hutan" significa "persona del bosque" en malayo, y que comparten el 97% de su ADN con nosotros.',
            'En la Nursery, jugad a encontrar la cría más pequeña y ver cómo aprende a trepar como un bebé humano.',
          ],
          eat: [
            { name: 'Cafés del centro / lodge de Sepilok', note: 'Se come en el propio centro o en el lodge, sin desplazarse. Sencillo pero de paso.' },
            { name: 'Sim Sim Seafood (Sandakan)', dish: 'marisco sobre el agua', note: 'Si volvéis por Sandakan, el mejor marisco de la zona.' },
          ],
        },
        transitToNext: { mode: 'walk', min: 5 } },
      { n: 3, name: 'Bornean Sun Bear Centre', category: 'Naturaleza', emoji: '🐻', coords: { lat: 5.8732, lon: 117.9480 }, time: '11:00', hours: '~6€', note: 'El único centro del mundo de osos de sol. Pequeños y trepadores, encantan a los niños.',
        transitToNext: { mode: 'walk', min: 8, note: 'Al restaurante' } },
      { n: 4, name: 'Comida: Sepilok Bistro / lodge', category: 'Comida', emoji: '🍛', coords: { lat: 5.8745, lon: 117.9460 }, time: '12:30', note: 'Arroz nasi goreng, fideos, fruta. Después, descanso/piscina en el resort (calor de mediodía).',
        transitToNext: { mode: 'car', min: 35, note: 'Grab a Labuk Bay', fare: '~40 MYR' } },
      { n: 5, name: 'Labuk Bay Proboscis Sanctuary', category: 'Naturaleza', emoji: '🐒', coords: { lat: 5.9667, lon: 118.1500 }, time: '16:00', hours: 'Feeding 16:30', note: 'Monos narigudos endémicos sobre el manglar. Las narices enormes hacen reír. Plataforma A para fotos.',
        guide: {
          intro: 'Una reserva privada en el manglar donde ver de cerca al mono narigudo (proboscis), que SOLO vive en Borneo. Con sus narices enormes y barrigas, son de los animales más divertidos del viaje — llegan en grupo a las plataformas de alimentación.',
          time: '1½ h (una sesión de feeding)', bestTime: 'Feeding de las 16:30: llega 20-30 min antes para sitio en la plataforma A.',
          route: [
            'Ve a la Plataforma A (la principal) para el feeding de la tarde: es donde mejor se ven y fotografían.',
            'Espera en silencio: van llegando por los árboles y bajan a por la fruta.',
            'Si hay tiempo, la Plataforma B suele tener también macacos de cola larga (plateados).',
          ],
          tips: [
            'Cámara con zoom y nada de flash. No se les da comida ni se les toca.',
            'Vigila mochilas y gafas con los macacos plateados, que son más ladrones que los narigudos.',
            'Repelente: es manglar y al atardecer salen mosquitos.',
          ],
          family: [
            'Contadles que el macho tiene la nariz enorme para hacer más ruido y atraer a las hembras — se ríen seguro.',
            'Reto: distinguir al "jefe" del grupo (el de nariz y barriga más grandes).',
          ],
          eat: [
            { name: 'Comidas en el lodge de Sepilok', note: 'Se vuelve a cenar al lodge; sin desviarse. En ruta a Sandakan, marisco de Sim Sim.' },
          ],
        },
        transitToNext: { mode: 'car', min: 35, note: 'Vuelta a Sepilok' } },
      { n: 6, name: 'Cena en el resort', category: 'Comida', emoji: '🍽️', coords: { lat: 5.8740, lon: 117.9450 }, time: '19:30', note: 'Cena tranquila. Preparar mochila: mañana Rainforest Discovery al alba y transfer a Sukau.' },
    ],
  },
  d5: {
    highlights: ['🌳 Canopy walkway', '🚤 Primer crucero', '🦎 Night walk'],
    quickTips: [
      'Rainforest Discovery abre 8:00 — ir temprano por las aves y el fresco.',
      'Transfer a Sukau ~2h, incluido (SeekSophie). Bolsas estancas a mano para la barca.',
      'A partir de aquí, poca/ninguna cobertura: descargad mapas y avisad en casa.',
    ],
    stops: [
      { n: 1, name: 'Rainforest Discovery Centre', category: 'Naturaleza', emoji: '🌳', coords: { lat: 5.8780, lon: 117.9420 }, time: '07:30', hours: 'Abre 8:00 · ~8€', note: 'Canopy walkway a 26m por selva virgen. Torres para cálaos y águilas. Leo en hombros.',
        guide: {
          intro: 'El mejor sitio de Sepilok para "ver" la selva desde dentro: una pasarela suspendida a 26 m entre las copas, con torres de observación. Al amanecer es cuando cantan y vuelan las aves — un plan tranquilo antes de los orangutanes.',
          time: '1½–2 h', bestTime: 'Nada más abrir (8:00): la actividad de aves y el fresco están al amanecer.',
          route: [
            'Sube a la primera torre de observación para las vistas sobre el dosel.',
            'Recorre el canopy walkway (pasarela) buscando cálaos, ardillas voladoras y aves.',
            'Baja a los senderos junto al lago si os quedan ganas antes de ir al centro de orangutanes.',
          ],
          tips: [
            'Binoculares y paciencia: la fauna del dosel está alta y camuflada.',
            'Repelente y calzado cerrado; las pasarelas resbalan con rocío/lluvia.',
          ],
          family: [
            'Estáis literalmente a la altura de las copas: preguntadles qué animal creen que vive "en el ático" de la selva.',
            'Leo en hombros para las barandillas altas de la pasarela.',
          ],
          eat: [
            { name: 'Desayuno en el lodge de Sepilok', note: 'Volvéis a desayunar/comer al lodge, a un paso. Sin desviarse.' },
          ],
        },
        transitToNext: { mode: 'walk', min: 10, note: 'Desayuno en el resort' } },
      { n: 2, name: 'Desayuno + check-out Sepilok', category: 'Comida', emoji: '🍳', coords: { lat: 5.8740, lon: 117.9450 }, time: '10:00', note: 'Desayuno tardío, últimas compras (repelente, agua) y check-out.',
        transitToNext: { mode: 'car', min: 120, note: 'Transfer incluido a Sukau (~2h)' } },
      { n: 3, name: 'Sukau Greenview Lodge', category: 'Hotel', emoji: '🛏️', coords: { lat: 5.5170, lon: 118.2950 }, time: '14:00', note: 'Check-in 2× Twin Deluxe. Pasarela de madera sobre el río Kinabatangan. Almuerzo incluido.', status: 'booked',
        transitToNext: { mode: 'boat', min: 5, note: 'Al embarcadero' } },
      { n: 4, name: 'Crucero río (tarde)', category: 'Naturaleza', emoji: '🚤', coords: { lat: 5.5200, lon: 118.3050 }, time: '15:30', note: 'Primer safari fluvial: proboscis, macacos, cocodrilos, cálaos. Guía Orang Sungai. Calibrar prismáticos.',
        guide: {
          intro: 'El Kinabatangan es el "Amazonas de Borneo": el río con más fauna del sudeste asiático. En una lancha pequeña, con guía local Orang Sungai (gente del río), vais buscando animales en las orillas. Cada salida es distinta — es safari de verdad, no está garantizado, y por eso emociona.',
          time: '2–3 h por crucero', bestTime: 'Amanecer (6:00) y última hora de tarde (15:30): cuando la fauna sale a las orillas.',
          route: [
            'Salida en lancha desde el embarcadero del lodge; sentaos repartidos para ver a ambas orillas.',
            'El guía navega despacio pegado a la vegetación buscando movimiento en las copas.',
            'Fijaos en las ramas altas (monos y cálaos) y en los troncos de las orillas (varanos, cocodrilos).',
            'Volvéis al lodge al caer el sol — llevad linterna para el night walk opcional.',
          ],
          tips: [
            'Binoculares imprescindibles (uno por adulto): la fauna suele estar lejos. Cámara con zoom.',
            'Ropa de colores apagados, manga larga y repelente: al atardecer salen los mosquitos.',
            'Silencio y movimientos lentos: hablar espanta a los animales. Haz caso al guía, que "lee" el río.',
            'Bolsa estanca para el móvil/cámara: puede salpicar o caer un chaparrón.',
          ],
          family: [
            'Convertidlo en un juego de "quién ve primero": narigudos (esos monos de nariz enorme y barriga), cálaos, cocodrilos y, con suerte, elefantes pigmeos.',
            'Contadles que el mono narigudo (proboscis) solo vive en Borneo y que su nariz gigante le sirve para hacer más ruido y presumir.',
          ],
          eat: [
            { name: 'Pensión completa en el lodge (Sukau)', note: 'No hay restaurantes en el río: el lodge da todas las comidas entre cruceros. Aquí el foodie es comer rodeados de jungla.' },
          ],
        },
        transitToNext: { mode: 'boat', min: 5 } },
      { n: 5, name: 'Cena en el lodge + night walk', category: 'Naturaleza', emoji: '🦎', coords: { lat: 5.5170, lon: 118.2950 }, time: '19:30', note: 'Cena incluida y paseo nocturno con frontal: ranas, insectos palo, ojos de cocodrilo. Aventura de exploradores.' },
    ],
  },
  d6: {
    highlights: ['🌅 Crucero amanecer', '🐘 Elefantes pigmeos', '🌟 Luciérnagas'],
    quickTips: [
      'Amanecer 06:00 = mejor hora para elefantes pigmeos y orangutanes. Madrugón que vale la pena.',
      'Mediodía de calor: descanso en la pasarela. Manga larga al atardecer (mosquitos).',
      'Prismáticos siempre encima.',
    ],
    stops: [
      { n: 1, name: 'Crucero del amanecer', category: 'Naturaleza', emoji: '🌅', coords: { lat: 5.5180, lon: 118.2900 }, time: '06:00', note: 'Niebla sobre el río, silencio total. La mejor sesión: elefantes pigmeos en las orillas si hay suerte.',
        transitToNext: { mode: 'boat', min: 5, note: 'Al lodge a desayunar' } },
      { n: 2, name: 'Desayuno en el lodge', category: 'Comida', emoji: '🍳', coords: { lat: 5.5170, lon: 118.2950 }, time: '08:30', note: 'Desayuno incluido. Tiempo libre en la pasarela; los niños exploran con el guía.',
        transitToNext: { mode: 'boat', min: 5 } },
      { n: 3, name: 'Mini-trek por la jungla / Oxbow lake', category: 'Naturaleza', emoji: '🥾', alt: 'A', coords: { lat: 5.5230, lon: 118.2980 }, time: '11:00', note: 'Paseo guiado por la selva o al lago en herradura buscando aves, monos e insectos. Para los más aventureros.',
        transitToNext: { mode: 'boat', min: 5, note: 'Comida en el lodge' } },
      { n: 4, name: 'Mañana tranquila en el lodge', category: 'Actividad', emoji: '🌴', alt: 'B', coords: { lat: 5.5170, lon: 118.2950 }, time: '11:00', note: 'Si aprieta el calor o los niños están cansados tras el amanecer: hamaca, pasarela sobre el río y descanso antes del crucero de la tarde.',
        transitToNext: { mode: 'boat', min: 5, note: 'Comida en el lodge' } },
      { n: 5, name: 'Comida en el lodge', category: 'Comida', emoji: '🍛', coords: { lat: 5.5170, lon: 118.2950 }, time: '13:00', note: 'Almuerzo incluido. Siesta en la habitación o hamaca.',
        transitToNext: { mode: 'boat', min: 5 } },
      { n: 5, name: 'Crucero de la tarde', category: 'Naturaleza', emoji: '🚤', coords: { lat: 5.5230, lon: 118.3100 }, time: '15:30', note: 'Segunda sesión: distinta luz y fauna. Proboscis, cálaos, cocodrilos.',
        transitToNext: { mode: 'boat', min: 5 } },
      { n: 6, name: 'Cena + crucero de luciérnagas', category: 'Naturaleza', emoji: '🌟', coords: { lat: 5.5160, lon: 118.2960 }, time: '20:00', note: 'Cena incluida y crucero opcional de luciérnagas: árboles parpadeando como un árbol de Navidad natural.' },
    ],
  },
  d7: {
    highlights: ['🌅 Crucero amanecer', '🦇 Gomantong Cave', '🌿 Último día de río'],
    quickTips: [
      'Gomantong: salida de millones de murciélagos al atardecer (~18:00) — el momento clave.',
      'Llevar ropa que no importe manchar (cae guano) y calzado cerrado.',
      'Última noche en la selva: preparar mochilas para el aeropuerto mañana.',
    ],
    stops: [
      { n: 1, name: 'Crucero del amanecer', category: 'Naturaleza', emoji: '🌅', coords: { lat: 5.5180, lon: 118.2900 }, time: '06:00', note: 'Tercer amanecer en el río. El guía ajusta la ruta según avistamientos. Última caza de elefantes pigmeos.',
        transitToNext: { mode: 'boat', min: 5 } },
      { n: 2, name: 'Desayuno + mañana libre', category: 'Comida', emoji: '🍳', coords: { lat: 5.5170, lon: 118.2950 }, time: '08:30', note: 'Desayuno incluido. Relax en la pasarela, fotos, lectura. Comida en el lodge a mediodía.',
        transitToNext: { mode: 'boat', min: 5 } },
      { n: 3, name: 'Crucero de la tarde', category: 'Naturaleza', emoji: '🚤', coords: { lat: 5.5230, lon: 118.3100 }, time: '15:30', note: 'Último crucero vespertino del Kinabatangan, luz dorada. Despedida del río.',
        transitToNext: { mode: 'car', min: 45, note: 'Furgoneta a Gomantong' } },
      { n: 4, name: 'Gomantong Cave', category: 'Naturaleza', emoji: '🦇', coords: { lat: 5.5333, lon: 118.0667 }, time: '18:00', note: 'Cueva gigante: salida en espiral de millones de murciélagos al atardecer, con águilas cazándolos. Serpientes en la entrada.',
        transitToNext: { mode: 'car', min: 45, note: 'Vuelta al lodge' } },
      { n: 5, name: 'Cena en el lodge', category: 'Comida', emoji: '🍽️', coords: { lat: 5.5170, lon: 118.2950 }, time: '20:00', note: 'Cena incluida, última noche. Mochilas listas: mañana crucero de despedida y aeropuerto.' },
    ],
  },
  d8: {
    highlights: ['🌅 Crucero despedida', '✈️ SDK→KL', '🍢 Jalan Alor'],
    quickTips: [
      'Transfer al aeropuerto 09:00, vuelo 14:10 (2h30 de margen).',
      'KLIA Ekspres al centro: 28 min, MYR 55/adulto · 25/niño <12.',
      'Llegáis a KL con energía: cena de celebración en Jalan Alor.',
    ],
    stops: [
      { n: 1, name: 'Crucero del amanecer (add-on)', category: 'Naturaleza', emoji: '🌅', coords: { lat: 5.5180, lon: 118.2900 }, time: '06:00', note: 'Último abrazo al río. Niebla y silencio.',
        transitToNext: { mode: 'boat', min: 5, note: 'Desayuno + check-out' } },
      { n: 2, name: 'Desayuno + transfer a Sandakan', category: 'Comida', emoji: '🍳', coords: { lat: 5.5170, lon: 118.2950 }, time: '08:00', note: 'Check-out Sukau, foto con los guías. Transfer incluido al aeropuerto (salida 09:00, llegada 11:30).',
        transitToNext: { mode: 'car', min: 150, note: 'Transfer SeekSophie a SDK' } },
      { n: 3, name: 'Comida: English Tea House (Sandakan)', category: 'Comida', emoji: '🫖', coords: { lat: 5.8420, lon: 118.1170 }, time: '12:00', note: 'Si da tiempo, almuerzo colonial con vistas a la bahía. Si no, comer en el aeropuerto SDK.',
        transitToNext: { mode: 'flight', min: 180, note: 'MH2711 SDK→KUL · 14:10 → 17:10 (3h)' } },
      { n: 4, name: 'Star Suites KLCC', category: 'Hotel', emoji: '🛏️', coords: { lat: 3.1577, lon: 101.7120 }, time: '18:00', note: 'KLIA Ekspres a KL Sentral + Grab al hotel. Suite con vistas a las torres.', status: 'booked',
        transitToNext: { mode: 'walk', min: 12, note: 'A Jalan Alor' } },
      { n: 5, name: 'Cena: Jalan Alor', category: 'Comida', emoji: '🍢', coords: { lat: 3.1457, lon: 101.7090 }, time: '20:00', note: 'Calle de street food: satay, char kway teow, dim sum, zumos. Celebrar la semana de Borneo.' },
    ],
  },

  // ===================== KUALA LUMPUR =====================
  d9: {
    highlights: ['😴 Mañana de piscina', '🦜 KL Bird Park', '⛲ Fuentes KLCC'],
    quickTips: [
      'Día suave tras 5 días de selva: piscina del hotel por la mañana.',
      'KL Bird Park: el aviario libre más grande del mundo, con AC natural de selva.',
      'Las torres Petronas iluminadas + show de fuentes del KLCC Park por la noche (gratis).',
    ],
    stops: [
      { n: 1, name: 'Desayuno + piscina del hotel', category: 'Hotel', emoji: '🏊', coords: { lat: 3.1577, lon: 101.7120 }, time: '09:00', note: 'Recuperación: desayuno tranquilo y piscina con vistas a las Petronas.',
        transitToNext: { mode: 'car', min: 20, note: 'Grab a Lake Gardens', fare: '~12 MYR' } },
      { n: 2, name: 'KL Bird Park (Lake Gardens)', category: 'Naturaleza', emoji: '🦜', coords: { lat: 3.1430, lon: 101.6869 }, time: '10:30', hours: '9:00–18:00 · ~15€/ad', note: 'Aviario libre gigantesco: loros, cálaos, flamencos. Los niños dan de comer a las aves.',
        transitToNext: { mode: 'walk', min: 8, note: 'Almuerzo en el parque' } },
      { n: 3, name: 'Comida: Hornbill Restaurant', category: 'Comida', emoji: '🍛', coords: { lat: 3.1432, lon: 101.6875 }, time: '13:00', note: 'Restaurante dentro del Bird Park, con aves alrededor. Curry, fideos, ensaladas.',
        transitToNext: { mode: 'car', min: 20, note: 'Grab al hotel' } },
      { n: 4, name: 'Descanso / Suria KLCC', category: 'Compras', emoji: '🛍️', coords: { lat: 3.1580, lon: 101.7120 }, time: '15:30', note: 'Siesta o el centro comercial Suria (AC) bajo las Petronas si hace falta ropa.',
        transitToNext: { mode: 'walk', min: 5, note: 'Al KLCC Park' } },
      { n: 5, name: 'KLCC Park + show de fuentes', category: 'Parque', emoji: '⛲', coords: { lat: 3.1590, lon: 101.7140 }, time: '19:00', note: 'Playground y piscina de chapoteo; show de fuentes Lake Symphony al anochecer con las torres iluminadas.',
        transitToNext: { mode: 'walk', min: 12, note: 'A cenar' } },
      { n: 6, name: 'Cena: Jalan Alor', category: 'Comida', emoji: '🍢', coords: { lat: 3.1457, lon: 101.7090 }, time: '20:30', note: 'O Lot 10 Hutong (food court con AC) si prefieren tranquilidad.' },
    ],
  },
  d10: {
    highlights: ['🏙️ Petronas', '🐠 Aquaria KLCC', '🗼 KL Tower'],
    quickTips: [
      '⚠️ Petronas se agota — comprar online con fecha y hora. Cerrado los lunes.',
      'Mirador en altura a elegir UNO: OPCIÓN A subir a la Skybridge de las Petronas; OPCIÓN B subir a la KL Tower (mejores vistas DE las torres + suelo de cristal). Hacer las dos es pagar dos veces lo mismo.',
      'La foto exterior de las Petronas y el KLCC Park los disfrutáis igual, elijáis A o B.',
    ],
    stops: [
      { n: 1, name: 'Petronas: foto + subir a la Skybridge', category: 'Mirador', emoji: '🏙️', alt: 'A', coords: { lat: 3.1578, lon: 101.7117 }, time: '09:30', hours: 'Reserva online', note: 'OPCIÓN A de mirador: Skybridge + observatorio de las torres más icónicas de Asia. Llegar 15 min antes del turno.', status: 'pending',
        guide: {
          intro: 'Las Torres Petronas fueron los edificios más altos del mundo (1998–2004) y siguen siendo EL símbolo de KL: dos torres gemelas de acero inspiradas en el arte islámico, unidas por un puente a 170 m. La subida te lleva a ese Skybridge y al observatorio de arriba.',
          time: '1–1½ h la visita · foto exterior aparte', bestTime: 'Primer turno de la mañana (reserva online): mejor luz y menos cola.',
          route: [
            'Reserva ONLINE tu franja horaria: las entradas del día se agotan pronto.',
            'La visita sube primero al Skybridge (piso 41) y luego al observatorio (piso 86).',
            'Para la foto CLÁSICA de las dos torres enteras, ve al parque KLCC (detrás): a ras de suelo no caben en el encuadre.',
          ],
          tips: [
            'Si no subís, la alternativa (opción B) es verlas de noche iluminadas desde el parque con el show de la fuente — gratis y espectacular.',
            'Dentro está el centro comercial Suria KLCC con AC, aseos y comida: buen punto de encuentro.',
          ],
          family: [
            'Contadles que se tardó 6 años en construirlas y que dos equipos compitieron, uno por torre.',
            'En el parque KLCC hay zona de juegos y una fuente/piscina infantil para que se refresquen.',
          ],
          eat: [
            { name: 'Madam Kwan\'s (Suria KLCC)', dish: 'nasi lemak, nasi bojari', note: 'Malayo cómodo con AC en el propio centro comercial, al pie de las torres.' },
          ],
        },
        transitToNext: { mode: 'walk', min: 8, note: 'A Suria KLCC' } },
      { n: 2, name: 'Comida: Madam Kwan\'s (Suria)', category: 'Comida', emoji: '🍽️', coords: { lat: 3.1580, lon: 101.7125 }, time: '12:30', note: 'Nasi lemak y laksa con vistas a las torres. Clásico familiar.',
        transitToNext: { mode: 'walk', min: 6, note: 'Bajo las torres' } },
      { n: 3, name: 'Aquaria KLCC', category: 'Naturaleza', emoji: '🐠', coords: { lat: 3.1533, lon: 101.7136 }, time: '14:00', hours: '10:00–20:00', note: 'Túnel de cristal con tiburones y rayas sobre la cabeza. Refugio del calor. (Esto se hace elijáis A o B.)', status: 'pending',
        transitToNext: { mode: 'car', min: 12, note: 'Grab a KL Tower (si eliges B) o al hotel' } },
      { n: 4, name: 'KL Tower — Sky Deck & Sky Box', category: 'Mirador', emoji: '🗼', alt: 'B', coords: { lat: 3.1528, lon: 101.7039 }, time: '17:30', hours: '~25€', note: 'OPCIÓN B de mirador: mirador abierto y cajas de cristal voladizas, con la mejor vista DE las Petronas al atardecer (~19:25). Elige esto O la Skybridge, no ambas.',
        transitToNext: { mode: 'car', min: 10, note: 'Grab a Bukit Bintang' } },
      { n: 5, name: 'Cena: Lot 10 Hutong', category: 'Comida', emoji: '🍜', coords: { lat: 3.1466, lon: 101.7110 }, time: '20:00', note: 'Los mejores puestos hawker de Malasia bajo un techo con AC. Para todos los gustos.' },
    ],
  },
  d11: {
    highlights: ['🙏 Batu Caves', '🍛 Nasi lemak Kampung Baru', '⚗️ Petrosains / 💦 Sunway'],
    quickTips: [
      'Batu Caves a las 8:00: 272 escalones de colores, antes del calor y los grupos. Gratis.',
      'Brunch a la vuelta en Kampung Baru, el pueblo malayo pegado a KLCC: el nasi lemak más auténtico de KL y de camino al hotel (nada de cruzar la ciudad).',
      'Tarde a elegir: OPCIÓN A Petrosains (ciencia interactiva, AC) o OPCIÓN B Sunway Lagoon (parque acuático). Quita la que descartes con la ✕. Si vais a Waterbom en Bali, la A da más variedad.',
    ],
    stops: [
      { n: 1, name: 'Batu Caves', category: 'Templo', emoji: '🙏', coords: { lat: 3.2379, lon: 101.6840 }, time: '08:00', hours: 'Gratis', note: 'Estatua dorada de 43m y escalera arcoíris a la cueva-templo. Macacos por todos lados. Llegar pronto, antes del calor y los grupos.',
        guide: {
          intro: 'Batu Caves es el templo hindú más importante fuera de la India: una estatua dorada de 43 m del dios Murugan y 272 escalones de colores que suben a una cueva de piedra caliza con santuarios dentro. Gratis, espectacular y muy fotogénico — la estampa de KL.',
          time: '1½–2 h', bestTime: 'A las 8:00, nada más abrir: fresco, luz suave y sin los autobuses de turistas.',
          route: [
            'Foto con la estatua dorada de Murugan y la escalera arcoíris de fondo.',
            'Sube los 272 escalones sin prisa (hay barandilla) — parad a mirar atrás las vistas.',
            'Arriba, la Temple Cave: santuarios hindúes bajo una bóveda abierta al cielo con monos y palomas.',
            'Si os quedáis con ganas, la Dark Cave / Ramayana Cave (esta última, de pago, con figuras de colores) están al lado.',
          ],
          tips: [
            'Hombros y rodillas cubiertos para entrar (llevad un pañuelo/sarong); en la entrada alquilan si hace falta.',
            '⚠️ Macacos MUY atrevidos: no lleves comida ni bolsas abiertas a la vista, agarra bien gafas y móvil. No los mires fijamente ni les des de comer.',
            'Súbelo pronto: a media mañana el sol pega de lleno en la escalera y se llena.',
          ],
          family: [
            'Reto de contar los 272 escalones subiendo (y buscar las estatuas de colores en cada tramo).',
            'Explicadles que es un templo vivo: mucha gente sube a rezar, así que hablamos bajito y respetamos.',
            'Ojo con los monos: divertidos de ver, pero se les mira desde lejos y no se les toca.',
          ],
          eat: [
            { name: 'Puestos indios al pie de Batu Caves', dish: 'thosai, teh tarik, banana leaf', note: 'Puestos vegetarianos del sur de India junto a la entrada: desayuno barato y auténtico sin moverse.' },
          ],
        },
        transitToNext: { mode: 'car', min: 25, note: 'Grab de vuelta hacia KLCC', fare: '~25 MYR', tip: 'Kampung Baru está de camino al hotel, no hay que desviarse.' } },
      { n: 2, name: 'Brunch: Nasi Lemak Kampung Baru', category: 'Comida', emoji: '🍛', coords: { lat: 3.1665, lon: 101.7045 }, time: '10:15', note: 'El nasi lemak más auténtico de KL (Nasi Lemak Antarabangsa y puestos del barrio), en el pueblo malayo de casas de madera pegado a las Petronas. Al lado del hotel.',
        transitToNext: { mode: 'car', min: 12, note: 'Al hotel a descansar / a la tarde elegida', fare: '~10 MYR' } },
      { n: 3, name: 'Petrosains Discovery Centre', category: 'Actividad', emoji: '⚗️', alt: 'A', coords: { lat: 3.1581, lon: 101.7122 }, time: '13:00', hours: '~10€ · en Suria KLCC', note: 'Museo de ciencia interactivo dentro de las Petronas: experimentos, dinosaurios, simulador. Con AC, 3-4h, ideal 5-9 años. Variedad sin repetir parque acuático.', status: 'pending',
        transitToNext: { mode: 'walk', min: 8, note: 'Al hotel (al lado) a descansar' } },
      { n: 4, name: 'Sunway Lagoon', category: 'Parque', emoji: '💦', alt: 'B', coords: { lat: 3.0707, lon: 101.6075 }, time: '13:00', hours: '10:00–18:00 · ~80€', note: 'Multiparque: agua + atracciones + wildlife. Medio día largo. ⚠️ Solapa con Waterbom (Bali): elige solo si quieres dos parques acuáticos.', status: 'pending',
        transitToNext: { mode: 'car', min: 35, note: 'Grab al hotel a descansar' } },
      { n: 5, name: 'Cena cerca del hotel: Jalan Alor', category: 'Comida', emoji: '🍢', coords: { lat: 3.1457, lon: 101.7090 }, time: '20:00', note: 'Cena de street food a 10 min del hotel (Bukit Bintang): satay, char kway teow, zumos. El nasi lemak ya lo habéis bordado en el brunch.' },
    ],
  },
  d12: {
    highlights: ['🛍️ Central Market', '✈️ KL→Bali', '🌴 Llegada a Ubud'],
    quickTips: [
      '⚠️ KLIA2 (AirAsia) ≠ KLIA1. Salir del hotel a las 13:00 (2h15 de margen).',
      'Transfer privado DPS→Ubud pre-reservado (~1.5h). Bali va 1h por delante de Malasia.',
      'Cambiad algo de efectivo a rupias (IDR) o sacad en cajero del aeropuerto DPS.',
    ],
    stops: [
      { n: 1, name: 'Central Market + Merdeka Square', category: 'Compras', emoji: '🛍️', coords: { lat: 3.1457, lon: 101.6957 }, time: '09:30', note: 'Mañana de artesanía, batik y souvenirs (con AC) y paseo por Merdeka Square. Último vistazo a KL.',
        transitToNext: { mode: 'walk', min: 6, note: 'Andando al museo (opcional) o a comer' } },
      { n: 2, name: 'Opcional: National Textile Museum', category: 'Cultura', emoji: '🏛️', coords: { lat: 3.1480, lon: 101.6940 }, time: '10:45', hours: 'Gratis · al lado del Central Market', note: 'OPCIONAL, solo si os sobra tiempo antes del vuelo: el museo del batik y los tejidos malayos, en un edificio colonial precioso y a 5 min andando. Como preferís lo auténtico, no le dedicamos un día propio: queda aquí como relleno del día de aeropuerto.',
        transitToNext: { mode: 'car', min: 10, note: 'Grab a Bukit Bintang a comer' } },
      { n: 3, name: 'Comida: Lot 10 Hutong', category: 'Comida', emoji: '🍜', coords: { lat: 3.1466, lon: 101.7110 }, time: '12:00', note: 'Comida rápida y rica antes del aeropuerto. Check-out del hotel y maletas.',
        transitToNext: { mode: 'car', min: 50, note: 'Grab a KLIA2', fare: '~75 MYR', tip: 'Salir 13:00. KLIA2 es la terminal de AirAsia (≠ KLIA).' } },
      { n: 4, name: 'KLIA2', category: 'Aeropuerto', emoji: '🛫', coords: { lat: 2.7456, lon: 101.6865 }, time: '13:50', note: 'Facturar AK398. Vuelo 16:05.',
        transitToNext: { mode: 'flight', min: 190, note: 'AK398 KUL→DPS · 16:05 → 19:15 (3h10)' } },
      { n: 4, name: 'Transfer DPS → Green Field Hotel Ubud', category: 'Hotel', emoji: '🚗', coords: { lat: -8.5060, lon: 115.2620 }, time: '21:00', note: 'Transfer privado pre-reservado (~1.5h). Llegada ~21:00 (hora Bali). Cena ligera en el hotel o warung cercano.', status: 'booked' },
    ],
  },

  // ===================== UBUD =====================
  d13: {
    highlights: ['🌾 Tegallalang + columpios', '🐒 Monkey Forest', '🦆 Bebek betutu'],
    quickTips: [
      'Tegallalang a las 8:00, antes de los buses. Coche privado con conductor todo el día (~35-40€).',
      '⚠️ Monkey Forest: sin comida ni gafas/bolsos colgando — los macacos roban.',
      'Reservad Murni\'s la noche anterior y pedid el bebek betutu (24h de antelación).',
    ],
    stops: [
      { n: 1, name: 'Desayuno en el hotel', category: 'Comida', emoji: '🍳', coords: { lat: -8.5060, lon: 115.2620 }, time: '07:15', note: 'Desayuno temprano; conductor a las 7:45.',
        transitToNext: { mode: 'car', min: 25, note: 'Coche privado a Tegallalang' } },
      { n: 2, name: 'Tegallalang Rice Terraces', category: 'Naturaleza', emoji: '🌾', coords: { lat: -8.4318, lon: 115.2797 }, time: '08:00', hours: '~2€', note: 'Arrozales UNESCO al fresco de la mañana. Paseo entre bancales escalonados, antes de que lleguen los buses.',
        guide: {
          intro: 'Los arrozales de Tegallalang son la postal de Bali: bancales verdes escalonados regados por el "subak", el sistema de riego balinés de hace 1.000 años declarado UNESCO. Al amanecer, con la niebla y sin gente, son mágicos.',
          time: '1–1½ h', bestTime: 'A las 8:00: fresco, verde intenso y antes de que lleguen los autobuses (y del calor).',
          route: [
            'Empieza arriba, por los miradores de la carretera (foto panorámica de los bancales).',
            'Baja por los senderos entre las terrazas hasta el fondo del valle y sube por el otro lado.',
            'De camino verás los famosos columpios y el cartel "Bali" — la zona enlaza con el Bali Swing.',
          ],
          tips: [
            'Hay pequeños "donativos" (~10–20k IDR) que piden algunos tramos y columpios privados: lleva efectivo suelto.',
            'Calzado que agarre: los escalones de barro resbalan. Baja con calma con los peques.',
            'Los cafés del borde (Tis Café, D\'Tukad) tienen las mejores vistas para un zumo/kopi.',
          ],
          family: [
            'Explicadles el "subak": los balineses comparten el agua ladera abajo, campo por campo, en comunidad — llevan mil años haciéndolo.',
            'Buscad los patos y espantapájaros entre los arrozales y las ofrendas (canang sari) de flores.',
          ],
          eat: [
            { name: 'Cafés con vistas de Tegallalang (Tis Café, D\'Tukad)', dish: 'nasi/mie goreng, zumos', note: 'Comer mirando los bancales, sin moverse. Algo más turístico pero la vista lo vale.' },
            { name: 'Nasi Ayam Kedewatan Ibu Mangku', dish: 'pollo betutu con nasi campur', note: 'De camino de vuelta a Ubud: pollo betutu de institución, local y barato.' },
          ],
        },
        transitToNext: { mode: 'car', min: 10, note: 'Al Bali Swing (misma zona de Tegallalang)' } },
      { n: 3, name: 'Bali Swing', category: 'Actividad', emoji: '🌴', coords: { lat: -8.4480, lon: 115.2540 }, time: '09:30', hours: '~30€', note: 'Columpios gigantes sobre la jungla y los arrozales (con arnés para los niños), aquí mismo en la zona de Tegallalang. Fotos y adrenalina suave. El columpio lo hacemos HOY; la cascada queda para mañana.',
        guide: {
          intro: 'Los columpios gigantes de Bali sobre el valle de la jungla son puro Instagram… pero también una experiencia divertidísima en familia. Vas atado con arnés y te lanzan sobre los arrozales. Hay columpios a distintas alturas para elegir según el valiente.',
          time: '1½–2 h', bestTime: 'Temprano (9:30): menos cola para cada columpio y mejor luz para las fotos.',
          route: [
            'Al llegar te ponen el arnés de seguridad y eliges columpio por altura (los hay suaves para los peques).',
            'Empieza por uno bajo para coger confianza y ve subiendo.',
            'Aprovecha los "nidos" y plataformas para fotos entre turno y turno.',
            'Muchos parques incluyen vestidos volando y cafetería con vistas: remátalo con un zumo.',
          ],
          tips: [
            'Reserva online un paquete (incluye varios columpios): sale mejor que pagar suelto y evitas sorpresas de precio.',
            'Hay peso mínimo/edad para los columpios grandes: Leo (4) irá en los suaves o acompañado — pregunta al llegar.',
            'Sujeta bien móvil y gafas; deja lo demás en las taquillas. Un adulto abajo para fotos/vídeo.',
          ],
          family: [
            'Los arneses hacen que sea seguro: explícaselo a Leo antes para que vaya tranquilo y disfrute.',
            'Turno de "el más valiente": que cada uno elija su altura — se lo pasan en grande animándose.',
          ],
          eat: [
            { name: 'Cafetería del propio parque / Tegallalang', dish: 'zumos, snacks, nasi goreng', note: 'Se come ahí mismo con vistas al valle; la zona es la misma de los arrozales.' },
          ],
        },
        transitToNext: { mode: 'car', min: 15, note: 'De vuelta hacia Ubud, a comer entre arrozales' } },
      { n: 4, name: 'Comida: Sari Organik', category: 'Comida', emoji: '🥗', coords: { lat: -8.4900, lon: 115.2620 }, time: '12:00', note: 'Comida orgánica con vistas a los arrozales (se llega por un sendero bonito). Zumos frescos.',
        transitToNext: { mode: 'car', min: 15, note: 'Al Monkey Forest' } },
      { n: 5, name: 'Sacred Monkey Forest', category: 'Naturaleza', emoji: '🐒', coords: { lat: -8.5188, lon: 115.2585 }, time: '14:30', hours: '9:00–18:00 · ~5€', note: '700 macacos entre templos cubiertos de musgo y un río. Mágico (y respetuoso con las normas).',
        guide: {
          intro: 'Un bosque sagrado en pleno Ubud con tres templos hindúes cubiertos de musgo, un puente sobre un barranco y ~1.200 macacos de cola larga viviendo libres. Es precioso y salvaje a la vez: los monos mandan aquí, y hay que saber comportarse.',
          time: '1–1½ h', bestTime: 'Temprano o última hora: a mediodía hace calor y los monos están más revoltosos.',
          route: [
            'Entra por la avenida principal de árboles gigantes hasta el templo central (Pura Dalem Agung).',
            'Baja al puente y la fuente del "dragón" sobre el barranco — el rincón más fotogénico.',
            'Sal por la zona del río y las estatuas de musgo.',
          ],
          tips: [
            '⚠️ NADA de comida, bolsas abiertas, gafas colgando ni móvil en la mano suelto: los macacos roban al vuelo. Guárdalo todo cerrado.',
            'No los mires fijamente a los ojos (lo leen como amenaza) ni los toques; no compres plátanos para darles.',
            'Ropa que se pueda ensuciar; el suelo es de selva.',
          ],
          family: [
            'Explica a Aira y Leo las reglas ANTES de entrar: manos vacías, tranquilos y sin chillar. Así lo viven como una aventura segura.',
            'Buscad las crías agarradas a las madres — pero siempre desde la distancia.',
          ],
          eat: [
            { name: 'Bebek Bengil (Dirty Duck)', dish: 'pato crujiente', note: 'Justo al lado del bosque, con vistas a arrozales. Kid-friendly.' },
            { name: 'Warungs de Jl. Monkey Forest', dish: 'nasi/mie goreng, sate', note: 'La calle que sube al centro está llena de warungs locales de paso.' },
          ],
        },
        transitToNext: { mode: 'walk', min: 8, note: 'Al mercado y centro' } },
      { n: 6, name: 'Ubud Art Market + Palacio', category: 'Compras', emoji: '🧺', coords: { lat: -8.5069, lon: 115.2625 }, time: '16:00', note: 'Artesanía, telas y recuerdos; el Palacio Real de Ubud al lado. Helado o café.',
        transitToNext: { mode: 'car', min: 10, note: 'Al hotel a refrescarse' } },
      { n: 7, name: 'Cena: Murni\'s Warung', category: 'Comida', emoji: '🦆', coords: { lat: -8.5040, lon: 115.2550 }, time: '19:30', hours: 'Reservar', note: 'Bebek betutu (pato ahumado 24h) junto al puente Campuhan. Pedir con antelación.', status: 'pending' },
    ],
  },
  d14: {
    highlights: ['🌿 Campuhan al alba', '🙏 Tirta Empul', '💦 Cascada Tegenungan'],
    quickTips: [
      'Campuhan Ridge al amanecer (~6:30): fresco, sombra y vacío. Según energía de Leo.',
      'Tirta Empul antes de las 11:00; llevar sarong (se alquila) para participar en la purificación.',
      'Tarde de baño en la cascada Tegenungan (el Bali Swing ya lo hicisteis ayer en Tegallalang, así no repetimos). Última noche en Ubud.',
    ],
    stops: [
      { n: 1, name: 'Campuhan Ridge Walk', category: 'Naturaleza', emoji: '🌿', coords: { lat: -8.5050, lon: 115.2530 }, time: '06:45', hours: 'Gratis', note: 'Loma de hierba entre valles al amanecer. Paseo suave y bonito antes del calor.',
        guide: {
          intro: 'Un sendero por una loma de hierba entre dos valles verdes, a un paso del centro de Ubud y GRATIS. Al amanecer, con la niebla y el fresco, es el paseo más bonito y tranquilo de la zona — ideal para empezar el día antes de que apriete el calor.',
          time: '1–1½ h ida y vuelta', bestTime: 'Al amanecer (6:45–7:30): fresco, luz dorada y casi para vosotros solos.',
          route: [
            'Empieza junto al templo Gunung Lebah (puente de Campuhan) y sube a la cresta.',
            'Camina por la loma de hierba (~1,5 km) con valles a ambos lados hasta los cafés del final.',
            'Vuelta por el mismo camino, o sigue a los warungs de Bangkiang Sidem para desayunar.',
          ],
          tips: [
            'Ve pronto: a partir de las 9:00 pega el sol de lleno (no hay sombra) y sube gente.',
            'Zapatillas cómodas y agua; el firme es de cemento/hierba, fácil pero sin sombra.',
          ],
          family: [
            'Paseo llano y seguro, apto para Leo caminando. Buscad libélulas y flores entre la hierba alta.',
          ],
          eat: [
            { name: 'Cafés del final de la cresta / centro de Ubud', dish: 'desayuno, kopi, pisang goreng', note: 'Desayuno con vistas al valle o de vuelta en el centro, a un paseo.' },
          ],
        },
        transitToNext: { mode: 'car', min: 10, note: 'Desayuno en el hotel' } },
      { n: 2, name: 'Desayuno en el hotel', category: 'Comida', emoji: '🍳', coords: { lat: -8.5060, lon: 115.2620 }, time: '08:30', note: 'Desayuno sin prisa. Conductor a las 9:30.',
        transitToNext: { mode: 'car', min: 30, note: 'Coche privado a Tirta Empul' } },
      { n: 3, name: 'Tirta Empul + Gunung Kawi', category: 'Templo', emoji: '🙏', coords: { lat: -8.4156, lon: 115.3153 }, time: '10:00', hours: '~4€', note: 'Templo de manantiales sagrados; los balineses se purifican bajo las fuentes. A 5 min, los santuarios tallados en roca de Gunung Kawi entre arrozales.',
        transitToNext: { mode: 'car', min: 25, note: 'A comer' } },
      { n: 4, name: 'Comida: Warung Biah Biah', category: 'Comida', emoji: '🍲', coords: { lat: -8.5060, lon: 115.2600 }, time: '13:00', note: 'Cocina balinesa auténtica y barata, favorita de locales.',
        transitToNext: { mode: 'car', min: 15, note: 'A la clase de cocina o al hotel' } },
      { n: 5, name: 'Cascada Tegenungan', category: 'Naturaleza', emoji: '💦', coords: { lat: -8.5746, lon: 115.2889 }, time: '15:00', hours: '~1€', note: 'Cascada accesible con poza para chapotear (escaleras hasta la base). El baño refrescante tras la mañana de templos. Volvéis a Ubud por la zona sur.',
        guide: {
          intro: 'Una de las pocas cascadas de Bali que NO está en la montaña, así que se llega fácil desde Ubud. Cae con fuerza sobre una poza donde te puedes bañar entre la jungla — el chapuzón perfecto para refrescar a la familia por la tarde.',
          time: '1–1½ h', bestTime: 'Media tarde entre semana: menos gente que a mediodía.',
          route: [
            'Desde el aparcamiento, mirador arriba para la foto panorámica de la cascada.',
            'Baja las escaleras hasta la base (unos 5-10 min): abajo está la poza para bañarse.',
            'Chapuzón cerca del salto (con cuidado de la corriente) y de vuelta arriba a secarse.',
          ],
          tips: [
            'Llevad bañador puesto y chanclas de agua: las rocas resbalan y hay que bajar/subir escaleras.',
            'Bolsa estanca para el móvil; el rocío de la cascada lo moja todo.',
            'La bajada cansa a la vuelta (escaleras): dosifica con Leo.',
          ],
          family: [
            'Poza poco profunda en los bordes para que Leo chapotee vigilado; Aira puede acercarse más al salto con un adulto.',
            'Juego: sentir la "lluvia" de la cascada de lejos antes de meterse.',
          ],
          eat: [
            { name: 'Warungs con vista a la cascada', dish: 'nasi goreng, zumos, coco', note: 'Arriba, junto al mirador, para reponer tras el baño sin moverse.' },
          ],
        },
        transitToNext: { mode: 'car', min: 25, note: 'A cenar en Ubud centro' } },
      { n: 6, name: 'Cena: Bebek Bengil (Dirty Duck)', category: 'Comida', emoji: '🦆', coords: { lat: -8.5147, lon: 115.2625 }, time: '19:30', note: 'Pato crujiente entre arrozales. Última cena en Ubud; preparar maletas para Gili.' },
    ],
  },

  // ===================== UBUD → GILI =====================
  d15: {
    highlights: ['🚐 Door-to-door', '⛵ Padang Bai→Gili', '🐢 Primer baño con tortugas'],
    quickTips: [
      '⚠️ Reservar Bluewater Express ya — temporada alta. Pickup en el hotel a las 7:00.',
      'Es un FAST BOAT, no un ferry lento: travesía ~1.5-2h desde Padang Bai (el puerto más cercano a Gili). El "puerta a puerta" es mayor por el traslado en minivan. Antimareos para Leo y dry bag a mano.',
      'En Gili no hay coches: maletas en cidomo (carro) o a pie desde el embarcadero.',
    ],
    stops: [
      { n: 1, name: 'Desayuno + check-out Ubud', category: 'Comida', emoji: '🍳', coords: { lat: -8.5060, lon: 115.2620 }, time: '07:00', note: 'Desayuno (o picnic) y pickup de Bluewater en el hotel. Mochilas listas la noche anterior.',
        transitToNext: { mode: 'car', min: 75, note: 'Minivan Bluewater a Padang Bai (incluido, ~1-1.5h)' } },
      { n: 2, name: 'Puerto Padang Bai', category: 'Puerto', emoji: '⚓', coords: { lat: -8.5300, lon: 115.5100 }, time: '08:30', note: 'Embarque del fast boat. Antimareos 30 min antes.',
        transitToNext: { mode: 'ferry', min: 105, note: 'Fast boat 09:00 · Padang Bai→Gili Air (~1.5-2h)' } },
      { n: 3, name: 'Manta Dive Gili Air + comida', category: 'Hotel', emoji: '🏝️', coords: { lat: -8.3560, lon: 116.0840 }, time: '11:00', note: 'Check-in frente al mar. Comida en la playa (poké, pescado). Sin coches, ritmo isla.', status: 'booked',
        transitToNext: { mode: 'walk', min: 8, note: 'A la costa norte' } },
      { n: 4, name: 'Snorkel + sunset', category: 'Playa', emoji: '🐢', coords: { lat: -8.3490, lon: 116.0820 }, time: '16:00', note: 'Primer snorkel con tortugas desde la orilla y atardecer (~18:05) en el lado oeste.',
        transitToNext: { mode: 'walk', min: 5 } },
      { n: 5, name: 'Cena en la playa', category: 'Comida', emoji: '🍤', coords: { lat: -8.3560, lon: 116.0850 }, time: '19:30', note: 'Pescado a la brasa con los pies en la arena. Cielo estrellado sin contaminación lumínica.' },
    ],
  },
  d16: {
    highlights: ['🐢 Tortugas', '🤿 Snorkel 3 Gilis', '🚴 Vuelta en bici'],
    quickTips: [
      'Tortugas desde la orilla por la mañana (mejor mar). Protector biodegradable.',
      'Snorkel trip en barca de fondo de cristal a Gili Meno (estatuas sumergidas) — fácil para niños.',
      'Vuelta a la isla en bici al atardecer (~45 min). Reservad el fast boat de mañana a Sanur.',
    ],
    stops: [
      { n: 1, name: 'Desayuno + snorkel tortugas', category: 'Playa', emoji: '🐢', coords: { lat: -8.3490, lon: 116.0820 }, time: '08:30', note: 'Desayuno en el resort y snorkel con tortugas en la costa norte, con el mar más calmado.',
        transitToNext: { mode: 'boat', min: 10, note: 'Barca de snorkel' } },
      { n: 2, name: 'Snorkel trip 3 Gilis (glass-bottom)', category: 'Actividad', emoji: '🤿', coords: { lat: -8.3550, lon: 116.0700 }, time: '10:30', hours: '~12€/persona', note: 'Arrecifes y las estatuas sumergidas entre Meno y Air. Fondo de cristal para quien no quiera mojarse.',
        guide: {
          intro: 'El snorkel de las tres Gilis es EL plan de la isla: una barca de fondo de cristal os lleva por varios puntos — arrecifes con tortugas verdes, peces de colores y las famosas estatuas humanas sumergidas de Gili Meno. Agua cálida y transparente, ideal para peques.',
          time: '3–4 h (varias paradas)', bestTime: 'Salida de media mañana (10:30): mar más calmado y buena luz bajo el agua.',
          route: [
            'Primera parada, el "Turtle Point": zona tranquila para nadar con tortugas verdes.',
            'Segunda, las estatuas sumergidas de Gili Meno (el círculo de figuras): impresionan y son poco profundas.',
            'Tercera, un arrecife de coral con peces de colores; el guía va indicando dónde mirar.',
            'Comida/parada en Gili Meno o vuelta a Gili Air a comer.',
          ],
          tips: [
            'Lleva TUS gafas de snorkel (más cómodas e higiénicas, sobre todo para los niños); las de alquiler ajustan mal.',
            'Camiseta de licra + protector reef-safe: el sol reflejado en el agua quema muchísimo.',
            'Elige barca con chalecos y fondo de cristal: así Leo puede ver sin meterse. Pulseras de mareo si sois sensibles.',
            'Respeta las tortugas y el coral: mirar sin tocar, no ponerse encima ni perseguirlas.',
          ],
          family: [
            'Buscad juntos las tortugas verdes: contadles que respiran aire como nosotros y suben a la superficie cada rato.',
            'Las estatuas sumergidas parecen un tesoro perdido — a Aira y Leo les encanta "descubrirlas".',
          ],
          eat: [
            { name: 'Warungs de Gili Meno / Gili Air', dish: 'nasi campur, pescado a la brasa', note: 'Comida local en la parada o al volver; de noche, el mercado nocturno de Gili Air.' },
          ],
        },
        transitToNext: { mode: 'walk', min: 5, note: 'A comer' } },
      { n: 3, name: 'Comida en chiringuito', category: 'Comida', emoji: '🦞', coords: { lat: -8.3560, lon: 116.0850 }, time: '13:00', note: 'Langosta y pescado fresco, barato. Siesta/sombra en las horas de más sol.',
        transitToNext: { mode: 'walk', min: 5 } },
      { n: 4, name: 'Vuelta a la isla en bici', category: 'Actividad', emoji: '🚴', coords: { lat: -8.3600, lon: 116.0780 }, time: '16:00', hours: 'Bici ~3€/h', note: 'Rodear Gili Air por caminos de arena, parando en calas. Leo en silla o cidomo.',
        transitToNext: { mode: 'walk', min: 8, note: 'Al lado oeste' } },
      { n: 5, name: 'Sunset West + cena', category: 'Comida', emoji: '🌅', coords: { lat: -8.3570, lon: 116.0760 }, time: '18:00', note: 'Columpios de mar y atardecer sobre el Agung. Cena en la playa. Maletas casi listas: mañana, mañana tranquila en Gili y barco a Sanur por la TARDE, sin prisas.' },
    ],
  },

  // ===================== GILI → SANUR =====================
  d17: {
    highlights: ['🌅 Mañana en Gili', '🚤 Fast boat por la tarde', '🏖️ Base 6 noches'],
    quickTips: [
      'Sin madrugón: aprovechad la MAÑANA en Gili (último baño con tortugas) y volved por la TARDE, tranquilos. Ya tenéis 6 noches en Sanur.',
      'Horarios fast boat Gili Air→Sanur (orientativos, CONFIRMAR con el operador): ~07:00 · ~10:00 · ~11:30 · ~13:30 · último ~16:00. Travesía ~2h (Sanur está más al sur que Padang Bai).',
      '👉 Coged el de ~13:30-14:00: mañana completa + margen de sobra. El de ~16:00 es el último — dejadlo como red de seguridad, no como plan.',
    ],
    stops: [
      { n: 1, name: 'Mañana de playa en Gili Air', category: 'Playa', emoji: '🐢', coords: { lat: -8.3490, lon: 116.0820 }, time: '08:30', note: 'Desayuno sin prisa y último snorkel con tortugas en la costa norte. Maletas listas y check-out tardío si el resort deja.',
        transitToNext: { mode: 'walk', min: 5, note: 'A comer junto al mar' } },
      { n: 2, name: 'Comida tranquila en Gili', category: 'Comida', emoji: '🦞', coords: { lat: -8.3560, lon: 116.0850 }, time: '12:00', note: 'Última comida isleña: pescado a la brasa con los pies en la arena, sin reloj.',
        transitToNext: { mode: 'walk', min: 8, note: 'Al embarcadero (cidomo con maletas)' } },
      { n: 3, name: 'Fast boat Gili Air → Sanur', category: 'Puerto', emoji: '🚤', coords: { lat: -8.3620, lon: 116.0790 }, time: '13:30', hours: 'Recomendado ~13:30-14:00 · último ~16:00', note: 'Fast boat de primera hora de la tarde. Travesía ~2h. Antimareos 30 min antes y dry bag a mano.',
        transitToNext: { mode: 'ferry', min: 120, note: 'Fast boat ~13:30 · Gili Air→Sanur (~2h)' } },
      { n: 4, name: 'Prime Plaza Suites Sanur', category: 'Hotel', emoji: '🛏️', coords: { lat: -8.6900, lon: 115.2630 }, time: '15:45', note: 'Llegada a Sanur por la tarde. Check-in en la suite de 2 dormitorios. Base fija las próximas 6 noches.', status: 'booked',
        transitToNext: { mode: 'walk', min: 6, note: 'A cenar' } },
      { n: 5, name: 'Cena: Massimo (italiano)', category: 'Comida', emoji: '🍕', coords: { lat: -8.6920, lon: 115.2610 }, time: '19:30', note: 'Pizza, pasta y el famoso gelato — los niños lo agradecen a mitad de viaje.' },
    ],
  },
  d18: {
    highlights: ['🏛️ Gates of Heaven', '🐠 Tirta Gangga', '🚗 Este de Bali'],
    quickTips: [
      'Salir 8:00 con coche privado (~45-50€/día). Lempuyang primero para evitar la cola de la foto.',
      'Las "Gates of Heaven": la foto del reflejo es un truco con espejo del fotógrafo local.',
      'Hombros/rodillas cubiertos en los templos (sarong incluido).',
    ],
    stops: [
      { n: 1, name: 'Desayuno + salida temprano', category: 'Comida', emoji: '🍳', coords: { lat: -8.6900, lon: 115.2630 }, time: '07:15', note: 'Desayuno y conductor a las 8:00 (1.5h hasta el este).',
        transitToNext: { mode: 'car', min: 90, note: 'Coche privado a Lempuyang' } },
      { n: 2, name: 'Pura Lempuyang — Gates of Heaven', category: 'Templo', emoji: '🏛️', coords: { lat: -8.3900, lon: 115.6310 }, time: '09:30', hours: '~5€', note: 'Las puertas que enmarcan el volcán Agung. Llegar pronto: la cola para la foto crece rápido.',
        transitToNext: { mode: 'car', min: 40, note: 'A Tirta Gangga' } },
      { n: 3, name: 'Comida con vistas a arrozales', category: 'Comida', emoji: '🍛', coords: { lat: -8.4120, lon: 115.5850 }, time: '12:30', note: 'Warung con terraza sobre los campos del este (p.ej. cerca de Tirta Gangga). Cocina balinesa.',
        transitToNext: { mode: 'walk', min: 5 } },
      { n: 4, name: 'Tirta Gangga', category: 'Templo', emoji: '🐠', coords: { lat: -8.4120, lon: 115.5870 }, time: '14:00', hours: '~3€', note: 'Palacio del agua real: estanques de carpas gigantes y piedras para saltar sobre el agua. A los niños les encanta.',
        transitToNext: { mode: 'car', min: 90, note: 'Vuelta a Sanur' } },
      { n: 5, name: 'Cena en Sanur: Pregina Warung', category: 'Comida', emoji: '🍽️', coords: { lat: -8.6880, lon: 115.2600 }, time: '19:30', note: 'Cocina balinesa auténtica (nasi campur, sate lilit) de vuelta en Sanur.' },
    ],
  },
  d19: {
    highlights: ['🦕 Kelingking', '🐠 Crystal Bay (mantas)', '🏝️ Nusa Penida'],
    quickTips: [
      '⚠️ Reservar fast boat con antelación (salida ~8:30 de Sanur). Día intenso pero de los más espectaculares.',
      'Contratar conductor en la isla al llegar; las carreteras de Penida son malas — ir con calma.',
      'No bajar a la playa de Kelingking con Leo (sendero duro): la vista desde arriba es el premio.',
    ],
    stops: [
      { n: 1, name: 'Fast boat Sanur → Nusa Penida', category: 'Puerto', emoji: '🚤', coords: { lat: -8.6850, lon: 115.2680 }, time: '08:00', hours: '~80€ (4 pax)', note: 'Desayuno temprano y barco (45 min). Mar a veces movido: antimareos.', status: 'pending',
        transitToNext: { mode: 'car', min: 45, note: 'Conductor a Kelingking' } },
      { n: 2, name: 'Kelingking Beach (mirador)', category: 'Mirador', emoji: '🦕', coords: { lat: -8.7510, lon: 115.4720 }, time: '10:00', note: 'El acantilado en forma de T-Rex sobre agua turquesa. Vista desde arriba: una de las más espectaculares de Asia.',
        guide: {
          intro: 'La foto más famosa de Bali: un acantilado con forma de cabeza de T-Rex sobre una playa de arena blanca y agua turquesa. Nusa Penida es más salvaje y seca que Bali — carreteras malas y polvo, pero paisajes de otro planeta.',
          time: 'Medio día / día completo en Nusa Penida', bestTime: 'Llegar pronto (primer barco): el mirador se llena y el sol y el polvo aprietan a mediodía.',
          route: [
            'Desde el puerto, coche con conductor contratado para el día (imprescindible; las distancias engañan por el mal firme).',
            'Kelingking primero: mirador del "T-Rex". La bajada a la playa es MUY dura (escaleras casi verticales, 45-60 min) — con Leo, quedaos arriba en el mirador.',
            'Combinad con Broken Beach y Angel\'s Billabong (al oeste), o Crystal Bay para bañarse/snorkel tranquilos.',
          ],
          tips: [
            'Contrata coche+conductor al llegar (no scooter con niños): las carreteras son malas y con curvas.',
            'Agua, gorra y calzado bueno; hay poca sombra y mucho polvo. Antimareos para el barco y el coche.',
            'NO intentéis bajar a la playa de Kelingking con los peques: es peligrosa y agotadora. La vista de arriba ya es EL momento.',
          ],
          family: [
            'Buscad juntos la forma del T-Rex en el acantilado: se ve clarísima y les encanta.',
            'Para bañarse, mejor Crystal Bay (arena y aguas más calmadas) que las calas de acantilado.',
          ],
          eat: [
            { name: 'Warungs de los miradores / Crystal Bay', dish: 'nasi goreng, coco, pescado', note: 'Puestos sencillos junto a los puntos turísticos; comida básica local para no perder tiempo.' },
          ],
        },
        transitToNext: { mode: 'car', min: 25, note: 'A Crystal Bay' } },
      { n: 3, name: 'Comida cerca de Crystal Bay', category: 'Comida', emoji: '🍤', coords: { lat: -8.7180, lon: 115.4530 }, time: '12:30', note: 'Warung sencillo junto a la playa. Sombra y reponer fuerzas.',
        transitToNext: { mode: 'walk', min: 5 } },
      { n: 4, name: 'Crystal Bay — snorkel', category: 'Playa', emoji: '🐠', coords: { lat: -8.7190, lon: 115.4520 }, time: '14:00', note: 'Snorkel con mantas y tortugas en agua cristalina. Chaleco para Leo. Angel\'s Billabong si queda tiempo y marea baja.',
        transitToNext: { mode: 'ferry', min: 45, note: 'Fast boat de vuelta ~17:00' } },
      { n: 5, name: 'Cena en Sanur: Soul on the Beach', category: 'Comida', emoji: '🌅', coords: { lat: -8.6840, lon: 115.2660 }, time: '19:30', note: 'Cena con los pies en la arena de vuelta en Sanur. Ducha del salitre primero.' },
    ],
  },
  d20: {
    highlights: ['💦 Waterbom', '🏆 #1 de Asia', '🛝 Día de los peques'],
    quickTips: [
      'Abre 9:00: llegar pronto para hacer más toboganes. Comprar online con descuento.',
      'Leo pasa el mínimo (~90cm) en muchas atracciones; zona Kids\' Waterpark para los más pequeños.',
      'Día relajado: dejar la tarde para piscina del hotel.',
    ],
    stops: [
      { n: 1, name: 'Grab Sanur → Waterbom (Kuta)', category: 'Parque', emoji: '🚗', coords: { lat: -8.7000, lon: 115.2400 }, time: '08:30', note: 'Desayuno y Grab (~20 min, ~8€). Llevar bañadores puestos.',
        transitToNext: { mode: 'car', min: 20, note: 'A Kuta' } },
      { n: 2, name: 'Waterbom Bali', category: 'Parque', emoji: '💦', coords: { lat: -8.7220, lon: 115.1720 }, time: '09:00', hours: 'Abre 9:00 · ~120€', note: 'El mejor parque acuático de Asia, entre jardines tropicales. Toboganes para todas las edades.', status: 'pending',
        guide: {
          intro: 'Considerado el mejor parque acuático de Asia: toboganes de vértigo para Aira y papá, río lento y piscinas de olas suaves para Leo, todo entre jardines tropicales enormes. Un día de pura diversión familiar a mitad del tramo de playa.',
          time: 'Día completo (9:00–16:00)', bestTime: 'Nada más abrir (9:00): sin colas en los toboganes buenos las primeras 2 horas.',
          route: [
            'Al entrar, alquila una taquilla y coge tumbonas a la sombra como "campamento base".',
            'Primera hora, a los toboganes grandes (poca cola). Aira y adultos al Climax/Boomerang.',
            'Con Leo: río lento (Lazy River), piscina de olas y la zona infantil Funtastic.',
            'Comida en el food court de dentro para no salir, y tarde más relajada.',
          ],
          tips: [
            'Compra entradas ONLINE (más barato). Alquila taquilla y toalla allí.',
            'Hay altura mínima en los toboganes grandes: mira los carteles con Leo para elegir los suyos.',
            'Protector solar reef-safe y camiseta de licra: se está todo el día al sol.',
          ],
          family: [
            'Marcaos un "tobogán en familia" (los hay para bajar juntos en flotador) — el momentazo del día.',
            'Zona Funtastic pensada para los peques: Leo tiene sus propios toboganes seguros.',
          ],
          eat: [
            { name: 'Food court de Waterbom', dish: 'nasi goreng, satay, burgers, fruta', note: 'Dentro del parque, variado y decente: no merece la pena salir a comer.' },
          ],
        },
        transitToNext: { mode: 'walk', min: 3, note: 'Food court interior' } },
      { n: 3, name: 'Comida dentro de Waterbom', category: 'Comida', emoji: '🍔', coords: { lat: -8.7222, lon: 115.1722 }, time: '13:00', note: 'Buen food court; no perder tiempo saliendo. Seguir hasta ~15:30-16:00.',
        transitToNext: { mode: 'car', min: 20, note: 'Grab al hotel' } },
      { n: 4, name: 'Piscina del hotel + descanso', category: 'Hotel', emoji: '🏊', coords: { lat: -8.6900, lon: 115.2630 }, time: '16:30', note: 'Descanso en la suite. Los niños reventados (en el buen sentido).',
        transitToNext: { mode: 'walk', min: 6, note: 'A cenar' } },
      { n: 5, name: 'Cena: Merta Sari o Mamma Mia', category: 'Comida', emoji: '🍽️', coords: { lat: -8.6890, lon: 115.2610 }, time: '19:30', note: 'Pescado picante balinés (Merta Sari) o italiano fácil (Mamma Mia) para los peques.' },
    ],
  },
  d21: {
    highlights: ['🏯 Uluwatu', '🔥 Kecak Fire Dance', '🦐 Jimbaran'],
    quickTips: [
      'Mañana de playa/piscina y salir 15:00 hacia Uluwatu (~1h). EL momento Bali.',
      '⚠️ Monos de Uluwatu roban gafas y móviles — guardarlo todo. Sarong incluido.',
      'Reservar el Kecak (18:00, ~15€/persona); llegar con tiempo para sitio con vistas.',
    ],
    stops: [
      { n: 1, name: 'Mañana de playa / piscina', category: 'Playa', emoji: '🏖️', coords: { lat: -8.6850, lon: 115.2680 }, time: '09:30', note: 'Descanso, snorkel suave en Sanur o piscina. Comida tranquila antes de salir.',
        transitToNext: { mode: 'car', min: 60, note: 'Coche privado a Uluwatu (salir 15:00)' } },
      { n: 2, name: 'Comida: Kayu Api / en Sanur', category: 'Comida', emoji: '🍴', coords: { lat: -8.6900, lon: 115.2620 }, time: '13:00', note: 'Brunch-comida en Sanur antes del traslado. Salir hacia Uluwatu a las 15:00.',
        transitToNext: { mode: 'car', min: 60, note: 'A Uluwatu' } },
      { n: 3, name: 'Uluwatu Temple', category: 'Templo', emoji: '🏯', coords: { lat: -8.8291, lon: 115.0849 }, time: '16:30', hours: '~5€', note: 'Templo al filo de un acantilado de 70m sobre el Índico. Paseo por el borde (cuidado con los monos).',
        guide: {
          intro: 'Uno de los seis templos sagrados que "protegen" Bali, colgado en un acantilado de 70 m sobre el Índico. Al atardecer es mágico, y hay danza kecak (el "canto de los monos", cien hombres a coro) con el sol cayendo al mar de fondo.',
          time: '1½–2 h (más si veis la danza kecak)', bestTime: 'Media tarde para la luz; la danza kecak es a las ~18:00 con la puesta de sol.',
          route: [
            'Ponte el sarong (lo prestan en la entrada) y pasea por el sendero del acantilado: vistas brutales a ambos lados.',
            'Acércate al templo (el interior es solo para fieles) y quédate en los miradores.',
            'Si os cuadra, coged entradas para la danza kecak del anfiteatro al atardecer.',
          ],
          tips: [
            '⚠️ Los macacos de Uluwatu son famosos por ROBAR gafas, gorras y móviles para "canjearlos" por comida. Guarda todo y agárralo fuerte.',
            'Hombros y rodillas cubiertos (sarong incluido en la entrada).',
            'Llega con margen a la kecak: se llena. Reserva si puedes.',
          ],
          family: [
            'La danza kecak les fascina: cien hombres haciendo "chak-chak-chak" y fuego — como una peli.',
            'Aviso claro a Aira y Leo: nada en las manos ni en la cabeza cerca de los monos.',
          ],
          eat: [
            { name: 'Cena de marisco en Jimbaran (de camino a Sanur)', dish: 'pescado y marisco a la brasa', note: 'Justo después, en la playa de Jimbaran con mesas en la arena (ver siguiente parada).' },
          ],
        },
        transitToNext: { mode: 'walk', min: 5, note: 'Al anfiteatro del Kecak' } },
      { n: 4, name: 'Kecak Fire Dance', category: 'Show', emoji: '🔥', coords: { lat: -8.8295, lon: 115.0855 }, time: '18:00', hours: '~15€/persona', note: '50 hombres cantando en círculo alrededor del fuego con el sol hundiéndose en el mar. Espectáculo inolvidable.', status: 'pending',
        transitToNext: { mode: 'car', min: 25, note: 'A cenar a Jimbaran' } },
      { n: 5, name: 'Cena: marisco en Jimbaran', category: 'Comida', emoji: '🦐', coords: { lat: -8.7905, lon: 115.1620 }, time: '20:00', note: 'Pescado y marisco a la brasa con mesas en la arena y velas. Vuelta a Sanur ~21:30.',
        guide: {
          intro: 'La bahía de Jimbaran es LA cena con los pies en la arena de Bali: hileras de mesas en la playa, velas, y marisco fresco que eliges en hielo y te hacen a la brasa de cáscara de coco mientras el sol se pone. Cliché por algo — funciona.',
          time: '1½–2 h de cena', bestTime: 'Al atardecer (~19:00): reserva mesa en primera línea para ver la puesta de sol.',
          route: [
            'Elige uno de los "cafés" de la playa (fila de Muaya Beach): Menega Café y Lia Café son de los clásicos.',
            'Escoge el pescado/marisco al peso en el mostrador de hielo y cómo lo quieres.',
            'Mesa en la arena, y a esperar el combo mientras cae el sol.',
          ],
          tips: [
            'Pregunta el PRECIO POR PESO antes de pedir (se paga por gramos): así evitas sorpresas.',
            'Reserva mesa en primera línea al atardecer; llega con luz para elegir bien el marisco.',
            'Lleva repelente: al anochecer en la arena pican.',
          ],
          family: [
            'Para los peques: gambas o pescado sencillo a la brasa y arroz; suele gustar aunque no sean de marisco.',
            'Que elijan ellos la pieza en el hielo — les hace ilusión "pescar" la cena.',
          ],
          eat: [
            { name: 'Menega Café / Lia Café (Muaya Beach, Jimbaran)', dish: 'marisco a la brasa al peso', note: 'Los clásicos de la playa de Jimbaran; pide precio por peso y mesa al atardecer.' },
          ],
        } },
    ],
  },
  d22: {
    highlights: ['🏄 Surf para Aira', '🌊 Tanah Lot sunset', '🌅 Última noche'],
    quickTips: [
      'Sanur tiene olas suaves de arrecife: perfecto para la primera clase de surf de Aira.',
      'Tanah Lot: salir 15:30, llegar 16:30 para pasear antes del atardecer (~18:09).',
      'Preparar maletas por la tarde; mañana vuelo a las 14:05.',
    ],
    stops: [
      { n: 1, name: 'Clase de surf en Sanur', category: 'Actividad', emoji: '🏄', coords: { lat: -8.6850, lon: 115.2680 }, time: '08:30', hours: '~30€', note: 'Olas suaves para aprender; Leo juega en la orilla. Escuelas locales en la playa.',
        guide: {
          intro: 'Sanur tiene olas suaves y protegidas por el arrecife — el sitio ideal para una primera clase de surf en familia, sin las olas grandes del sur. Aira puede probar de pie y Leo jugar en la orilla con el monitor de apoyo.',
          time: '2 h de clase', bestTime: 'Temprano (8:30): mar más plano, menos viento y menos calor.',
          route: [
            'Reserva con una escuela local de la playa de Sanur (tabla + monitor + licra incluidos).',
            'Calentamiento y práctica en la arena (ponerse de pie) antes de entrar.',
            'Al agua con el monitor empujando las olas; turnos para que todos lo prueben.',
          ],
          tips: [
            'Elige escuela con buenas reseñas y monitor por niño; confirma que hay tabla blanda (foam) para principiantes.',
            'Protector reef-safe waterproof y licra de manga larga: dos horas al sol reflejado queman.',
            'Marea: pregunta la mejor franja a la escuela (con marea alta rompe mejor para aprender).',
          ],
          family: [
            'Leo con chaleco y en la orilla con un monitor: se lo pasa igual de bien "surfeando" tumbado.',
            'Celebrad la primera vez de pie de Aira — ¡sello de "surfer" en el pasaporte!',
          ],
          eat: [
            { name: 'Warung Mak Beng / warungs de la playa de Sanur', dish: 'pescado frito, nasi campur', note: 'Desayuno-comida local justo al salir del agua, sin moverse de Sanur.' },
          ],
        },
        transitToNext: { mode: 'walk', min: 6, note: 'A comer' } },
      { n: 2, name: 'Comida: Kayu Api Smoke Grill', category: 'Comida', emoji: '☕', coords: { lat: -8.6900, lon: 115.2620 }, time: '12:30', note: 'BBQ y café de especialidad, favorito de Sanur. Tarde para hacer maletas y descansar.',
        transitToNext: { mode: 'car', min: 45, note: 'Grab a Tanah Lot (salir 15:30)' } },
      { n: 3, name: 'Tanah Lot', category: 'Templo', emoji: '🌊', coords: { lat: -8.6212, lon: 115.0868 }, time: '16:30', hours: '~5€', note: 'Templo del s.XVI sobre una roca en el mar. Con marea baja se acerca uno; serpientes sagradas en las rocas. Atardecer detrás del templo.',
        transitToNext: { mode: 'car', min: 45, note: 'Vuelta a Sanur' } },
      { n: 4, name: 'Cena de despedida en Sanur', category: 'Comida', emoji: '🌅', coords: { lat: -8.6840, lon: 115.2660 }, time: '19:45', note: 'El sitio favorito que hayáis descubierto (Soul on the Beach, Three Monkeys...). Brindis final. Maletas listas.' },
    ],
  },
  d23: {
    highlights: ['🏖️ Última mañana', '✈️ DPS→SIN', '🌧️ Jewel Rain Vortex'],
    quickTips: [
      'Check-out 11:00. Grab a DPS (~30 min). Comer en el aeropuerto.',
      'Escala de 6.5h en Changi: piscina T1 (niños gratis), cine, jardines y mariposas — aprovechadla.',
      'Llegada a BCN el 5 Ago a las 06:55.',
    ],
    stops: [
      { n: 1, name: 'Última mañana de playa + check-out', category: 'Playa', emoji: '🏖️', coords: { lat: -8.6850, lon: 115.2680 }, time: '09:00', note: 'Baño final en Sanur, desayuno y check-out a las 11:00. Últimas compras de souvenirs.',
        transitToNext: { mode: 'car', min: 30, note: 'Grab a DPS', fare: '~15€' } },
      { n: 2, name: 'Aeropuerto DPS — comida', category: 'Aeropuerto', emoji: '🛫', coords: { lat: -8.7467, lon: 115.1668 }, time: '12:00', note: 'Comer en Ngurah Rai antes del vuelo Scoot TR289 (14:05).',
        transitToNext: { mode: 'flight', min: 170, note: 'TR289 DPS→SIN · 14:05 → 16:55 (2h50)' } },
      { n: 3, name: 'Changi — escala de 6.5h (Jewel)', category: 'Mirador', emoji: '🌧️', coords: { lat: 1.3601, lon: 103.9890 }, time: '17:00', note: 'Aprovechad la escala: JEWEL — Rain Vortex (la cascada interior más alta del mundo), jardines, red de saltos y laberintos de setos. Además piscina rooftop T1 (~20 SGD, niños gratis), cine gratis y jardín de mariposas. Cena aquí antes del vuelo.',
        transitToNext: { mode: 'flight', min: 800, note: 'SQ388 SIN→BCN · 23:35 → 06:55+1 (13h20)' } },
      { n: 4, name: 'Barcelona (BCN)', category: 'Aeropuerto', emoji: '🏡', coords: { lat: 41.2974, lon: 2.0833 }, time: '5 Ago 06:55', note: 'Llegada a casa. Fin de un viaje de los que no se olvidan.' },
    ],
  },
}
