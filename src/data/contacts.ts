export type ContactEntry = {
  id: string
  destinationId?: string
  dates?: string
  category: string
  name: string
  phone?: string
  whatsapp?: boolean
  email?: string
  ref?: string
  note?: string
  mapName?: string
}

export const contactAgenda: ContactEntry[] = [
  { id: 'c-sin', destinationId: 'sin', dates: '13-15 Jul', category: 'Alojamiento', name: 'Holiday Inn Singapore Orchard City Centre by IHG', phone: '+65 6733 8333', ref: 'Booking 6151.752.994 · PIN 8582', mapName: 'Holiday Inn Singapore Orchard City Centre' },
  { id: 'c-sepilok', destinationId: 'sepilok', dates: '15-17 Jul', category: 'Alojamiento', name: 'Sepilok Jungle Resort', phone: '+60 89 533 071', ref: 'Booking 6182.784.304 · PIN 2242' },
  { id: 'c-sukau', destinationId: 'kinabatangan', dates: '17-20 Jul', category: 'Safari / lodge', name: 'Sukau Greenview Lodge', phone: '+60 13 869 6922', whatsapp: true, email: 'sukau_greenview@yahoo.com', ref: 'Seek Sophie 624695666', note: 'Usar primero para check-in, mensajes y transfers.' },
  { id: 'c-kl', destinationId: 'kl', dates: '20-24 Jul', category: 'Alojamiento', name: 'Star Suites KLCC, Kuala Lumpur', phone: '+60 17 753 0017', ref: 'Agoda 651641319', mapName: 'Star Suites KLCC' },
  { id: 'c-ubud', destinationId: 'ubud', dates: '24-27 Jul', category: 'Alojamiento', name: 'Green Field Hotel Ubud', phone: '+62 812 3633 8974', ref: 'Agoda 649576619' },
  { id: 'c-gili', destinationId: 'gili', dates: '27-29 Jul', category: 'Alojamiento', name: 'Manta Dive Gili Air Resort', phone: '+62 813 3778 9047', ref: 'Booking 5522.767.108 · PIN 9157' },
  { id: 'c-sanur', destinationId: 'sanur', dates: '29 Jul-4 Ago', category: 'Alojamiento', name: 'Prime Plaza Suites Sanur - Bali', phone: '+62 361 281781', ref: 'Agoda 648267691', mapName: 'Prime Plaza Suites Sanur Bali' },
  { id: 'c-booking-es', category: 'Soporte', name: 'Booking.com España', phone: '+34 91 276 8614', ref: 'Soporte reservas Booking.com desde España' },
  { id: 'c-booking-int', category: 'Soporte', name: 'Booking.com internacional', phone: '+44 20 3320 2609', ref: 'Soporte internacional Booking.com' },
  { id: 'c-seeksophie', category: 'Proveedor', name: 'Seek Sophie', email: 'admin@seeksophie.com', ref: 'Receipt booking 624695666', note: 'Proveedor del safari Kinabatangan.' },
]
