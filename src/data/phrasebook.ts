// Frasebook offline: el texto viaja en la app (100% sin conexión); el audio usa
// la voz del propio dispositivo. Malayo para Singapur y Malasia; indonesio para
// Bali. Organizado por situación para defenderse y caer bien.

export interface Phrase { es: string; local: string; pron?: string }
export interface PhraseCat { title: string; icon: string; items: Phrase[] }
export interface PhraseLang { code: string; label: string; flag: string; lang: string; note: string; cats: PhraseCat[] }

export const phrasebook: PhraseLang[] = [
  {
    code: 'ms', label: 'Malayo', flag: '🇲🇾', lang: 'ms-MY',
    note: 'Singapur y Malasia. En ciudad el inglés funciona, pero un par de palabras en malayo abren puertas.',
    cats: [
      {
        title: 'Saludos y cortesía', icon: '👋', items: [
          { es: 'Hola / ¿qué tal?', local: 'Apa khabar', pron: 'apa kabár' },
          { es: 'Buenos días', local: 'Selamat pagi', pron: 'selamát pagui' },
          { es: 'Gracias', local: 'Terima kasih', pron: 'terima kásih' },
          { es: 'De nada', local: 'Sama-sama', pron: 'sama-sama' },
          { es: 'Por favor', local: 'Tolong', pron: 'tólong' },
          { es: 'Perdón / disculpe', local: 'Maaf', pron: 'maáf' },
          { es: 'Sí / No', local: 'Ya / Tidak', pron: 'ya / tidák' },
          { es: 'Adiós', local: 'Selamat tinggal', pron: 'selamát tínggal' },
        ],
      },
      {
        title: 'En la mesa', icon: '🍜', items: [
          { es: 'La cuenta, por favor', local: 'Bil, tolong', pron: 'bil, tólong' },
          { es: '¡Está delicioso!', local: 'Sedap!', pron: 'sedáp' },
          { es: 'Poco picante', local: 'Kurang pedas', pron: 'kúrang pedás' },
          { es: 'Agua', local: 'Air', pron: 'áier' },
          { es: 'Soy vegetariano', local: 'Saya vegetarian', pron: 'saya vegetárian' },
        ],
      },
      {
        title: 'Compras y regateo', icon: '🛍️', items: [
          { es: '¿Cuánto cuesta?', local: 'Berapa harga?', pron: 'berápa hárga' },
          { es: 'Muy caro', local: 'Mahal sangat', pron: 'mahál sángat' },
          { es: '¿Más barato?', local: 'Boleh kurang?', pron: 'bóle kúrang' },
          { es: 'Solo estoy mirando', local: 'Saya tengok saja', pron: 'saya téngok sája' },
        ],
      },
      {
        title: 'Moverse', icon: '🚕', items: [
          { es: '¿Dónde está…?', local: 'Di mana…?', pron: 'di mána' },
          { es: 'El baño', local: 'Tandas', pron: 'tándas' },
          { es: 'Pare aquí, por favor', local: 'Berhenti sini, tolong', pron: 'berhénti síni' },
          { es: '¿Cuánto a…?', local: 'Berapa ke…?', pron: 'berápa ke' },
        ],
      },
      {
        title: 'Con niños y emergencia', icon: '🆘', items: [
          { es: 'Mi hijo / hija', local: 'Anak saya', pron: 'ának saya' },
          { es: '¿Hay baño?', local: 'Ada tandas?', pron: 'áda tándas' },
          { es: '¡Ayuda!', local: 'Tolong!', pron: 'tólong' },
          { es: 'Necesito un médico', local: 'Saya perlu doktor', pron: 'saya perlú dóktor' },
          { es: 'Me he perdido', local: 'Saya sesat', pron: 'saya sesát' },
        ],
      },
      {
        title: 'Números', icon: '🔢', items: [
          { es: '1 · 2 · 3', local: 'satu · dua · tiga' },
          { es: '4 · 5', local: 'empat · lima' },
          { es: '10 · 100 · 1000', local: 'sepuluh · seratus · seribu' },
        ],
      },
    ],
  },
  {
    code: 'id', label: 'Indonesio', flag: '🇮🇩', lang: 'id-ID',
    note: 'Bali (Ubud, Gili, Sanur). Muy parecido al malayo; un “terima kasih” y una sonrisa lo son todo.',
    cats: [
      {
        title: 'Saludos y cortesía', icon: '👋', items: [
          { es: 'Hola / ¿qué tal?', local: 'Halo / Apa kabar', pron: 'halo / apa kabár' },
          { es: 'Buenos días', local: 'Selamat pagi', pron: 'selamát pagui' },
          { es: 'Gracias', local: 'Terima kasih', pron: 'terima kásih' },
          { es: 'De nada', local: 'Sama-sama', pron: 'sama-sama' },
          { es: 'Por favor', local: 'Tolong / Silakan', pron: 'tólong / silákan' },
          { es: 'Perdón / con permiso', local: 'Maaf / Permisi', pron: 'maáf / permísi' },
          { es: 'Sí / No', local: 'Ya / Tidak', pron: 'ya / tidák' },
          { es: 'Hasta luego', local: 'Sampai jumpa', pron: 'sampái yúmpa' },
        ],
      },
      {
        title: 'En la mesa', icon: '🍲', items: [
          { es: 'La cuenta, por favor', local: 'Minta bon', pron: 'mínta bon' },
          { es: '¡Delicioso!', local: 'Enak!', pron: 'enák' },
          { es: 'Sin picante', local: 'Tidak pedas', pron: 'tidák pedás' },
          { es: 'Agua (para beber)', local: 'Air minum', pron: 'áir mínum' },
          { es: 'Soy vegetariano', local: 'Saya vegetarian', pron: 'saya vegetárian' },
        ],
      },
      {
        title: 'Compras y regateo', icon: '🛍️', items: [
          { es: '¿Cuánto cuesta?', local: 'Berapa harganya?', pron: 'berápa hargánia' },
          { es: 'Muy caro', local: 'Mahal sekali', pron: 'mahál sekáli' },
          { es: '¿Más barato?', local: 'Boleh kurang?', pron: 'bóle kúrang' },
          { es: 'Solo estoy mirando', local: 'Lihat-lihat saja', pron: 'líhat-líhat sája' },
        ],
      },
      {
        title: 'Moverse', icon: '🛵', items: [
          { es: '¿Dónde está…?', local: 'Di mana…?', pron: 'di mána' },
          { es: 'El baño', local: 'Kamar kecil / Toilet', pron: 'kámar kecíl' },
          { es: 'Pare aquí', local: 'Berhenti di sini', pron: 'berhénti di síni' },
          { es: 'A… ¿cuánto?', local: 'Ke… berapa?', pron: 'ke… berápa' },
        ],
      },
      {
        title: 'Con niños y emergencia', icon: '🆘', items: [
          { es: 'Mi hijo / hija', local: 'Anak saya', pron: 'ának saya' },
          { es: '¿Hay baño?', local: 'Ada toilet?', pron: 'áda tóilet' },
          { es: '¡Ayuda!', local: 'Tolong!', pron: 'tólong' },
          { es: 'Necesito un médico', local: 'Saya perlu dokter', pron: 'saya perlú dókter' },
          { es: 'Me he perdido', local: 'Saya tersesat', pron: 'saya tersesát' },
        ],
      },
      {
        title: 'Números', icon: '🔢', items: [
          { es: '1 · 2 · 3', local: 'satu · dua · tiga' },
          { es: '4 · 5', local: 'empat · lima' },
          { es: '10 · 100 · 1000', local: 'sepuluh · seratus · seribu' },
        ],
      },
    ],
  },
]
