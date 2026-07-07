// Curación foodie por destino: los platos que NO te puedes ir sin probar
// (qué son y por qué) + restaurantes/hawkers reales y curados, separando
// los que están CERCA de una actividad de los que MERECEN un viaje aparte.
// Singapur curado a partir de instituciones hawker (Michelin Bib Gourmand /
// leyendas locales); ampliable por destino en próximas oleadas.

export interface Dish {
  name: string
  emoji: string
  what: string // qué es: ingredientes y por qué probarlo
  tip?: string // cómo pedirlo / con qué / detalle de local
}

export interface FoodSpot {
  name: string
  dish: string // por qué es famoso / qué pedir
  area: string // barrio o hawker centre
  price: string // €/€€/€€€ orientativo
  why: string // por qué este y no otro
  near?: string // qué actividad/zona del viaje tiene al lado
  worthTrip?: boolean // merece desviarse aunque no pille de paso
  badge?: string // "Michelin", "Bib Gourmand", "leyenda hawker"…
}

export interface Gastronomy {
  blurb: string // el alma culinaria del destino en 1-2 frases
  dishes: Dish[]
  spots: FoodSpot[]
}

export const gastronomy: Record<string, Gastronomy> = {
  sin: {
    blurb: 'Singapur es la capital mundial del hawker: comida callejera china, malaya e india cocinada por maestros que llevan décadas con el mismo plato — barata, limpísima (mira la nota NEA) y con dos puestos con estrella Michelin. Comer aquí ES el viaje.',
    dishes: [
      { name: 'Hainanese chicken rice', emoji: '🍗', what: 'El plato nacional: pollo escalfado sedoso, arroz cocido en su caldo con jengibre y pandan, y salsa de chili-ajo. Aparentemente simple, adictivo de verdad.', tip: 'Se pide medio o entero para compartir; moja el pollo en la salsa de chili y jengibre.' },
      { name: 'Chili crab', emoji: '🦀', what: 'Cangrejo de barro en salsa espesa de tomate y chili, dulce y picante a la vez. El plato "de celebración" de Singapur.', tip: 'Pide mantou (bollitos fritos) para mojar la salsa: es lo mejor del plato. Alternativa menos picante: black pepper crab.' },
      { name: 'Laksa (estilo Katong)', emoji: '🍜', what: 'Fideos de arroz en caldo curry de coco con gambas, berberechos y tofu. Cremoso y con gambas.', tip: 'En Katong los fideos van cortados: se come solo con cuchara.' },
      { name: 'Char kway teow', emoji: '🍳', what: 'Fideos planos salteados al wok con soja oscura, berberechos, salchicha china, huevo y brotes. Ahumado del "wok hei".', tip: 'Pídelo con berberechos (cockles) para probarlo como los locales.' },
      { name: 'Satay', emoji: '🍢', what: 'Brochetas de pollo/ternera marinadas y a la brasa, con salsa de cacahuete, arroz en hoja (ketupat), pepino y cebolla.', tip: 'De noche en la Satay Street de Lau Pa Sat, al aire libre. Se pide por decenas.' },
      { name: 'Bak kut teh', emoji: '🥣', what: 'Sopa de costilla de cerdo con mucha pimienta y ajo (estilo Teochew, clara). Reconfortante a cualquier hora.', tip: 'Se acompaña de youtiao (churro salado) para mojar y té para "cortar" la grasa.' },
      { name: 'Kaya toast + huevos pasados por agua + kopi', emoji: '🍞', what: 'El desayuno de Singapur: tostada crujiente con mermelada de coco y huevo (kaya) y mantequilla, huevos casi crudos con soja y pimienta, y café kopi.', tip: 'Mojas la tostada en el huevo. Pide "kopi" (con leche condensada) o "kopi-o" (solo).' },
      { name: 'Roti prata', emoji: '🫓', what: 'Pan indio-musulmán hojaldrado a la plancha, con curry para mojar. Desayuno o cena barata.', tip: 'Prueba "prata kosong" (simple) y una "egg prata". Regado con teh tarik (té con leche "estirado").' },
      { name: 'Nasi lemak', emoji: '🍚', what: 'Arroz al coco con sambal picante, anchoas fritas, cacahuetes, huevo y pepino. Malayo, humilde y perfecto.', tip: 'El de Adam Road (Selera Rasa) es de los más queridos — al lado del Botánico.' },
      { name: 'Durian', emoji: '👑', what: 'El "rey de las frutas": cremosa, olor intenso, sabor único. Experiencia obligada para valientes.', tip: 'Cómprala abierta en Geylang. Prohibida en metro y hoteles por el olor: es parte de la broma.' },
    ],
    spots: [
      { name: 'Tian Tian Hainanese Chicken Rice', dish: 'chicken rice', area: 'Maxwell Food Centre · Chinatown', price: '€', why: 'El chicken rice más famoso de la ciudad, en pleno recorrido de Chinatown. Cola rápida.', near: 'Chinatown (día 2)', badge: 'Bib Gourmand' },
      { name: 'Hawker Chan', dish: 'soya sauce chicken rice', area: 'Chinatown Complex / Smith St', price: '€', why: 'El pollo en salsa de soja más barato del mundo con estrella Michelin. A 2 min de Tian Tian.', near: 'Chinatown (día 2)', badge: 'Michelin' },
      { name: 'Satay Street — Lau Pa Sat', dish: 'satay a la brasa', area: 'CBD (Boon Tat St)', price: '€€', why: 'Cada noche cortan la calle y se llena de humo de satay. Ambientazo al aire libre cerca de Marina Bay.', near: 'Marina Bay (día 2)' },
      { name: 'Satay by the Bay', dish: 'satay y marisco hawker', area: 'Gardens by the Bay', price: '€€', why: 'Hawker dentro de los jardines: cenáis ahí mismo antes del show de los Supertrees.', near: 'Gardens by the Bay (día 2, ya en el plan)' },
      { name: 'Makansutra Gluttons Bay', dish: 'char kway teow, BBQ stingray, satay', area: 'Esplanade · Marina Bay', price: '€€', why: 'Hawker icónico junto al agua, mirando a Marina Bay Sands. Perfecto antes/después del paseo del Merlion.', near: 'Marina Bay / Merlion (día 2)' },
      { name: 'Adam Road Food Centre', dish: 'nasi lemak (Selera Rasa), mee rebus', area: 'Bukit Timah', price: '€', why: 'Hawker de locales pegado al Jardín Botánico. La comida perfecta al salir del parque.', near: 'Botanic Gardens (día 1)' },
      { name: '328 Katong Laksa', dish: 'laksa de Katong', area: 'East Coast / Katong', price: '€', why: 'La laksa de fideos cortados que se come con cuchara. Merece la excursión al barrio Peranakan de casas de colores.', worthTrip: true, badge: 'leyenda local' },
      { name: 'Hill Street Tai Hwa Pork Noodle', dish: 'bak chor mee (fideos de cerdo)', area: 'Crawford / Lavender', price: '€', why: 'Puesto hawker con ESTRELLA Michelin. Cola larga pero es de esos "no te vas sin probarlo".', worthTrip: true, badge: 'Michelin ⭐' },
      { name: 'Jumbo Seafood', dish: 'chili crab + mantou', area: 'East Coast / Clarke Quay', price: '€€€', why: 'La experiencia del chili crab sentados, con el cangrejo entero. Reserva; es la cena "de celebración".', worthTrip: true },
      { name: 'Song Fa Bak Kut Teh', dish: 'sopa de costilla a la pimienta', area: 'New Bridge / Clarke Quay', price: '€€', why: 'El bak kut teh más querido, cerca del centro. Reconfortante y muy local.', near: 'Clarke Quay', badge: 'Bib Gourmand' },
    ],
  },

  kl: {
    blurb: 'Kuala Lumpur es un cruce malayo-chino-indio: aquí se desayuna nasi lemak, se come banana leaf con la mano y se cena a pie de calle en Jalan Alor. Barato, intenso y con mucho picante — pide el sambal aparte para los peques.',
    dishes: [
      { name: 'Nasi lemak', emoji: '🍚', what: 'El plato nacional de Malasia: arroz al coco con sambal, anchoas, cacahuetes, huevo y pepino; a menudo con pollo frito (ayam goreng).', tip: 'El "nasi lemak ayam goreng" es la versión reina. Sambal aparte si va con niños.' },
      { name: 'Roti canai + teh tarik', emoji: '🫓', what: 'Pan indio-malayo hojaldrado con curry de lentejas (dal), y té con leche "estirado" espumoso. Desayuno de 1€.', tip: 'Pídelo en un "mamak" (local indio-musulmán abierto 24 h). Roti kosong (simple) para empezar.' },
      { name: 'Char kuey teow', emoji: '🍳', what: 'Fideos planos al wok con gambas, berberechos, huevo y salsa de soja. Ahumado y potente.', tip: 'En KL lo bordan en los puestos chinos de Jalan Alor.' },
      { name: 'Satay', emoji: '🍢', what: 'Brochetas a la brasa con salsa de cacahuete, ketupat (arroz prensado) y pepino.', tip: 'Kajang es "la cuna del satay"; en KL, en Jalan Alor de noche.' },
      { name: 'Banana leaf rice', emoji: '🍛', what: 'Arroz servido sobre hoja de plátano con varios currys vegetales, papadum y un curry de carne/pescado. Del sur de India.', tip: 'Se come con la mano derecha; te rellenan el arroz gratis. Muy vegetariano-friendly.' },
      { name: 'Hokkien mee (estilo KL)', emoji: '🍜', what: 'Fideos gruesos salteados en salsa de soja oscura con cerdo, calamar y chicharrón. Distinto al de Singapur.', tip: 'Plato de cena; pesado y adictivo.' },
      { name: 'Cendol / ABC', emoji: '🍧', what: 'Postre de hielo picado con leche de coco, azúcar de palma y gusanitos verdes de pandan (cendol) o con toppings (ABC). Refresca del calor.', tip: 'El chute dulce perfecto a media tarde.' },
    ],
    spots: [
      { name: 'Lot 10 Hutong', dish: 'hawker chino de puestos con solera', area: 'Bukit Bintang', price: '€', why: 'Sótano con estufa de puestos heredados (Hokkien mee, pollo, tarta de zanahoria). Con AC, limpio y en plena zona de tiendas.', near: 'Bukit Bintang' },
      { name: 'Jalan Alor', dish: 'char kuey teow, satay, marisco a la brasa', area: 'Bukit Bintang', price: '€€', why: 'La calle de comida nocturna de KL: mesas fuera, humo y ambientazo. Fácil con niños porque hay de todo.', near: 'Bukit Bintang (noche)' },
      { name: 'Madam Kwan\'s (KLCC)', dish: 'nasi lemak, nasi bojari', area: 'Suria KLCC', price: '€€', why: 'Malayo clásico en versión cómoda y con AC, al pie de las Torres Petronas. Ideal con los peques cansados.', near: 'Petronas / KLCC' },
      { name: 'Masjid India / Kampung Baru (nasi lemak)', dish: 'nasi lemak malayo de barrio', area: 'Kampung Baru', price: '€', why: 'El barrio malayo tradicional donde ya tenéis el brunch en el plan: nasi lemak envuelto en hoja de plátano de verdad.', near: 'Kampung Baru (día 11, ya en el plan)' },
      { name: 'Restoran Yut Kee', dish: 'chop hainanés, roti babi, tostada kaya', area: 'Jalan Kamunting (centro)', price: '€', why: 'Kopitiam hainanés de 1928: desayuno con historia. Cierra pronto; ve por la mañana.', worthTrip: true, badge: 'leyenda local' },
      { name: 'Village Park Restaurant', dish: 'nasi lemak ayam goreng', area: 'Damansara Uptown', price: '€', why: 'Para muchos, el mejor nasi lemak con pollo frito de KL. Está a las afueras: merece el viaje solo si sois muy fans.', worthTrip: true, badge: 'leyenda local' },
      { name: 'Sri Nirwana Maju', dish: 'banana leaf rice', area: 'Bangsar', price: '€', why: 'Banana leaf a rebosar, del tirón y baratísimo. La experiencia india de KL comiendo con la mano.', worthTrip: true },
    ],
  },

  sepilok: {
    blurb: 'En Sepilok se come sobre todo en los lodges (comida de selva, sencilla y correcta), pero Sandakan, a 30 min, es puerto y tiene marisco de primera y dulces coloniales. Aprovechad si pasáis por la ciudad.',
    dishes: [
      { name: 'Seafood de Sandakan', emoji: '🦐', what: 'Sandakan presume del marisco más barato y fresco de Malasia: gambas gigantes, cangrejo, vieiras al ajillo o al chili.', tip: 'Pedid "butter prawns" (gambas en salsa de mantequilla y curry hoja) — muy de la zona.' },
      { name: 'Sang nyuk mien', emoji: '🍜', what: 'Sopa de fideos con carne de cerdo marinada, típica de Sabah. Caldo claro y reconfortante.', tip: 'Desayuno o almuerzo local en Sandakan.' },
      { name: 'UFO tart', emoji: '🥧', what: 'Tartaleta de Sandakan con base de bizcocho, crema y merengue tostado. El capricho dulce de la ciudad.', tip: 'En panaderías del centro de Sandakan.' },
      { name: 'Hinava', emoji: '🐟', what: 'Ceviche kadazan-dusun: pescado crudo curado en lima, chili, jengibre y cebolla. El "sushi" de Sabah.', tip: 'Solo en sitios de comida local kadazan; para paladares aventureros.' },
    ],
    spots: [
      { name: 'Comidas en el lodge (Sepilok)', dish: 'buffet de selva', area: 'Sepilok', price: '€€', why: 'Junto a los centros de orangutanes casi todo se come en el lodge o cafés cercanos: cómodo tras las visitas de fauna, sin desplazarse.', near: 'Sepilok (orangutanes/sun bears)' },
      { name: 'Sim Sim (Sandakan)', dish: 'marisco sobre el agua', area: 'Sandakan waterfront', price: '€€', why: 'Casas de pescadores sobre pilotes con marisquerías. La comida top de la zona si pasáis por Sandakan.', worthTrip: true },
      { name: 'English Tea House (Sandakan)', dish: 'té colonial con vistas', area: 'Sandakan', price: '€€', why: 'Jardín colonial con vistas al mar de Sulu: parada bonita y tranquila con niños.', worthTrip: true },
    ],
  },

  kinabatangan: {
    blurb: 'En el río Kinabatangan la comida va incluida en el lodge (Sukau): buffets caseros entre cruceros de fauna. No hay restaurantes alrededor — es selva pura — así que aquí el "foodie" es la experiencia de comer rodeados de jungla.',
    dishes: [
      { name: 'Buffet del lodge', emoji: '🍛', what: 'Arroz, curry suave, verduras, pollo/pescado y fruta tropical. Casero, abundante y pensado para todos los públicos.', tip: 'Avisad de alergias o de que hay niños al reservar; suelen adaptar el picante.' },
      { name: 'Fruta tropical local', emoji: '🍍', what: 'Piña, papaya, plátano de selva, rambután. Cultivada por la zona.', tip: 'Perfecta entre el crucero del amanecer y el desayuno.' },
    ],
    spots: [
      { name: 'Pensión completa en el lodge (Sukau)', dish: 'todo incluido', area: 'Río Kinabatangan', price: '€€€', why: 'No hay dónde salir a comer: el lodge da desayuno-comida-cena entre las salidas en barco. Céntrate en la fauna, no en buscar restaurante.', near: 'Cruceros del Kinabatangan' },
    ],
  },

  ubud: {
    blurb: 'Ubud es el corazón culinario de Bali: cerdo asado (babi guling), pato crujiente y nasi campur en warungs escondidos entre arrozales. Aquí sí hay que buscar: el mejor babi guling se acaba a mediodía.',
    dishes: [
      { name: 'Babi guling', emoji: '🐖', what: 'Cerdo asado a la brasa relleno de especias (kunyit, hierba limón, ajo), con piel crujiente, arroz, verduras y sambal. EL plato de Bali.', tip: 'Se sirve a mediodía y se agota: ve pronto. Pide "spesial" (surtido con todo).' },
      { name: 'Bebek/Ayam betutu', emoji: '🦆', what: 'Pato o pollo cocinado lento en pasta de especias (base gede), envuelto y horneado horas hasta deshacerse.', tip: 'El bebek (pato) es más jugoso; encarga con antelación en algunos sitios.' },
      { name: 'Nasi campur bali', emoji: '🍚', what: 'Plato de arroz con un poquito de todo: sate lilit, lawar, tempeh, verduras, huevo y sambal. La mejor forma de probar Bali de un bocado.', tip: 'Cada warung tiene su combinación; señala lo que quieras.' },
      { name: 'Sate lilit', emoji: '🍢', what: 'Brocheta balinesa de pescado o pollo picado con coco y especias, moldeado en un palo de caña de limón y a la brasa.', tip: 'Aromática y suave: gusta mucho a los niños.' },
      { name: 'Pisang goreng + kopi/jamu', emoji: '🍌', what: 'Plátano frito crujiente de merienda, con café balinés o jamu (bebida de cúrcuma y jengibre).', tip: 'En cualquier warung con vistas a los arrozales.' },
    ],
    spots: [
      { name: 'Warung Babi Guling Ibu Oka', dish: 'babi guling', area: 'Ubud centro (frente al Palacio)', price: '€', why: 'El babi guling que hizo famoso Anthony Bourdain, a un paso del Palacio y del Mercado. De paso con la visita al centro.', near: 'Centro de Ubud / Palacio', badge: 'leyenda local' },
      { name: 'Bebek Bengil (Dirty Duck)', dish: 'pato crujiente', area: 'Padang Tegal (junto a Monkey Forest)', price: '€€', why: 'Pato crujiente en pabellones sobre los arrozales, al lado del Bosque de los Monos. Bonito y kid-friendly.', near: 'Monkey Forest' },
      { name: 'Warung Biah Biah', dish: 'nasi campur, sate lilit', area: 'Jl. Goutama (centro)', price: '€', why: 'Balinés auténtico, barato y riquísimo en una callecita del centro. Reserva de noche.', near: 'Centro de Ubud' },
      { name: 'Nasi Ayam Kedewatan Ibu Mangku', dish: 'pollo betutu con nasi campur', area: 'Kedewatan (camino Bali Swing/arrozales)', price: '€', why: 'Institución del pollo betutu, de camino a Tegallalang/Bali Swing. Perfecto para el día de arrozales.', near: 'Tegallalang / Bali Swing' },
      { name: 'Locavore', dish: 'menú degustación indonesio moderno', area: 'Ubud centro', price: '€€€', why: 'De los mejores restaurantes de Asia: alta cocina con producto balinés. Para una cena especial (reservar con MUCHA antelación).', worthTrip: true, badge: 'top mundial' },
    ],
  },

  gili: {
    blurb: 'Gili Air es diminuta y sin coches: se come descalzo, con los pies en la arena y pescado recién sacado. De día, warungs sasak (de Lombok); de noche, el mercado con pescado a la brasa y jaffles.',
    dishes: [
      { name: 'Ikan bakar (pescado a la brasa)', emoji: '🐟', what: 'Pescado fresco marinado en especias y hecho a la parrilla de coco, con arroz y sambal. Eliges la pieza en hielo.', tip: 'Al atardecer en los chiringuitos de la costa oeste, mirando a Bali.' },
      { name: 'Nasi campur sasak', emoji: '🍚', what: 'Arroz con guarniciones de Lombok, más picante que el balinés (ojo con el sambal para los peques).', tip: 'En los warungs del interior de la isla, donde comen los locales.' },
      { name: 'Ayam taliwang', emoji: '🍗', what: 'Pollo especiado a la brasa típico de Lombok, con salsa de chili y tomate.', tip: 'Plato estrella sasak; pídelo poco picante para la familia.' },
    ],
    spots: [
      { name: 'Mercado nocturno de Gili Air (Pasar Malam)', dish: 'pescado a la brasa, satay, jaffles', area: 'Zona del puerto', price: '€', why: 'Puestos que montan al anochecer: eliges pescado y te lo hacen al momento. Barato, local y con ambiente familiar.', near: 'Puerto / llegada del ferry' },
      { name: 'Warung Sasak / warungs locales', dish: 'nasi campur, ayam taliwang', area: 'Interior de la isla', price: '€', why: 'A un paseo del centro turístico: comida de Lombok de verdad y a mitad de precio que en la playa.', near: 'Centro de Gili Air' },
      { name: 'Chiringuitos de la costa oeste (sunset)', dish: 'ikan bakar al atardecer', area: 'Playa oeste', price: '€€', why: 'Cena con los pies en la arena y el Rinjani/Bali de fondo. La estampa de Gili.', near: 'Snorkel / playa' },
    ],
  },

  sanur: {
    blurb: 'Sanur es la Bali de siempre, tranquila y familiar: dos leyendas que abren temprano y se agotan (Mak Beng y Men Weti) y un mercado nocturno estupendo. Aquí se come de maravilla sin gastar.',
    dishes: [
      { name: 'Nasi campur Bali', emoji: '🍚', what: 'El desayuno-almuerzo balinés: arroz con sate lilit, pollo, verduras, huevo y sambal. En Sanur está uno de los más famosos de la isla.', tip: 'Men Weti abre a las 7:30 y se agota antes de mediodía: id pronto.' },
      { name: 'Ikan goreng + sup kepala ikan', emoji: '🐟', what: 'Pescado frito crujiente con sopa de cabeza de pescado y sambal. El combo de Warung Mak Beng desde 1941.', tip: 'Es plato único: te sientas y te lo traen. Sin cartas.' },
      { name: 'Sate lilit + lawar', emoji: '🍢', what: 'Brochetas de coco y ensalada balinesa de verduras y coco rallado con especias.', tip: 'En el mercado nocturno de Sindhu, recién hechas.' },
      { name: 'Es campur / dadar gulung', emoji: '🍧', what: 'Postres balineses: hielo con frutas y jarabes, o crepe verde de pandan relleno de coco y azúcar de palma.', tip: 'De merienda en el Pasar Sindhu.' },
    ],
    spots: [
      { name: 'Warung Mak Beng', dish: 'pescado frito + sopa de pescado', area: 'Jl. Hang Tuah (norte de la playa)', price: '€', why: 'Institución desde 1941, un solo plato, cola constante y a pie de la playa de Sanur. Imprescindible.', near: 'Playa de Sanur', badge: 'leyenda local' },
      { name: 'Nasi Bali Men Weti', dish: 'nasi campur de desayuno', area: 'Sanur centro', price: '€', why: 'Para muchos el mejor nasi campur de Bali. Diminuto y se agota a media mañana: madruga.', near: 'Sanur centro', badge: 'leyenda local' },
      { name: 'Pasar Malam Sindhu (mercado nocturno)', dish: 'satay, ikan bakar, postres', area: 'Sindhu, Sanur', price: '€', why: 'Mercado nocturno auténtico donde cenan los locales: barato, variado y perfecto con niños.', near: 'Sanur centro (noche)' },
      { name: 'Warung Little Bird', dish: 'nasi/mie goreng, ayam', area: 'Sanur', price: '€', why: 'Warung familiar, limpio y económico para el día a día en Sanur.', near: 'Sanur centro' },
    ],
  },
}
