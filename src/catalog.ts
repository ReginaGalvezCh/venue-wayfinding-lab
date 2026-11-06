export type Language = 'en' | 'es'
export type Localized = Record<Language, string>
export type ArrivalOption = {
  id: string
  code: string
  color: string
  x: number
  y: number
  name: Localized
  detail: Localized
}
export type Venue = {
  id: string
  name: string
  mark: [string, string]
  sourceLabel: string
  sourceUrl: string
  options: ArrivalOption[]
}
export type Event = {
  id: string
  date: string
  endDate?: string
  dateLabel: Localized
  title: string
  venueId: string
  ticketSource: string
  ticketUrl: string
}

export const reviewedAt = '2026-11-06'

export const venues: Venue[] = [
  {
    id: 'national-stadium', name: 'Parque Estadio Nacional', mark: ['ESTADIO', 'NACIONAL'],
    sourceLabel: 'Parque Estadio Nacional', sourceUrl: 'https://parqueestadionacional.cl/como-llegar',
    options: [
      { id: 'pedro-valdivia', code: '01', color: '#d6f177', x: 75, y: 85, name: { en: 'Pedro de Valdivia', es: 'Pedro de Valdivia' }, detail: { en: 'General park approach. The venue lists Estadio Nacional Metro (Line 6) and nearby buses here. Check the gate on your event ticket.', es: 'Acceso general al parque. El recinto indica Metro Estadio Nacional (Línea 6) y buses cercanos. Revisa la puerta en tu entrada.' } },
      { id: 'guillermo-mann', code: '02', color: '#7de3d9', x: 495, y: 85, name: { en: 'Guillermo Mann', es: 'Guillermo Mann' }, detail: { en: 'General park approach with nearby Red Movilidad bus stops. This does not identify an event-specific gate.', es: 'Acceso general al parque con paraderos cercanos de Red Movilidad. No identifica una puerta específica del evento.' } },
      { id: 'avenida-grecia', code: '03', color: '#ffb3a1', x: 285, y: 390, name: { en: 'Avenida Grecia', es: 'Avenida Grecia' }, detail: { en: 'General park approach. The venue lists Estadio Nacional Metro (Line 6) and nearby buses. Confirm event instructions before traveling.', es: 'Acceso general al parque. El recinto indica Metro Estadio Nacional (Línea 6) y buses cercanos. Confirma las instrucciones del evento.' } },
    ],
  },
  {
    id: 'ohiggins-park', name: "Parque O'Higgins", mark: ['PARQUE', "O'HIGGINS"],
    sourceLabel: 'Lollapalooza Chile FAQ', sourceUrl: 'https://lollapaloozacl.com/preguntas-frecuentes/',
    options: [
      { id: 'metro-park', code: '01', color: '#d6f177', x: 75, y: 85, name: { en: "Parque O'Higgins Metro", es: "Metro Parque O'Higgins" }, detail: { en: 'The festival lists this station as a public transport approach. It does not assign an entry gate.', es: 'El festival indica esta estación como opción de transporte público. No asigna una puerta de ingreso.' } },
      { id: 'metro-rondizzoni', code: '02', color: '#7de3d9', x: 495, y: 85, name: { en: 'Rondizzoni Metro', es: 'Metro Rondizzoni' }, detail: { en: 'The festival also lists Rondizzoni station. Check the latest festival access instructions.', es: 'El festival también indica la estación Rondizzoni. Revisa las últimas instrucciones de acceso.' } },
      { id: 'bicycle', code: '03', color: '#ffb3a1', x: 75, y: 390, name: { en: 'Bicycle parking', es: 'Bicicleteros' }, detail: { en: 'The festival says free bicycle parking is available. This is an arrival option, not a gate.', es: 'El festival informa bicicleteros gratuitos. Es una forma de llegar, no una puerta.' } },
      { id: 'car', code: '04', color: '#b5b7ff', x: 495, y: 390, name: { en: 'Car parking pass', es: 'Pase de estacionamiento' }, detail: { en: 'Parking passes have limited availability and must be purchased through the official ticket seller. Check your pass for instructions.', es: 'Los pases de estacionamiento son limitados y se compran en la ticketera oficial. Revisa las instrucciones de tu pase.' } },
    ],
  },
  {
    id: 'santander-arena', name: 'Santander Arena', mark: ['SANTANDER', 'ARENA'],
    sourceLabel: 'Santander Arena FAQ', sourceUrl: 'https://www.santanderarena.cl/preguntas-frecuentes',
    options: [
      { id: 'metro', code: '01', color: '#d6f177', x: 75, y: 85, name: { en: "Parque O'Higgins Metro", es: "Metro Parque O'Higgins" }, detail: { en: "The venue lists Parque O'Higgins Metro as a general pedestrian approach.", es: "El recinto indica Metro Parque O'Higgins como acceso peatonal general." } },
      { id: 'tupper-walk', code: '02', color: '#7de3d9', x: 495, y: 85, name: { en: 'Tupper Street', es: 'Calle Tupper' }, detail: { en: 'The venue also lists Tupper Street as a general pedestrian approach.', es: 'El recinto también indica calle Tupper como acceso peatonal general.' } },
      { id: 'viel-drive', code: '03', color: '#ffb3a1', x: 75, y: 390, name: { en: 'Viel Avenue · car', es: 'Avenida Viel · auto' }, detail: { en: 'Vehicle entry requires a parking ticket. Use Viel only if your ticket indicates it.', es: 'El ingreso vehicular requiere ticket de estacionamiento. Usa Viel solo si tu ticket lo indica.' } },
      { id: 'tupper-drive', code: '04', color: '#b5b7ff', x: 495, y: 390, name: { en: 'Tupper Avenue · car', es: 'Avenida Tupper · auto' }, detail: { en: 'Vehicle entry requires a parking ticket. Use Tupper only if your ticket indicates it.', es: 'El ingreso vehicular requiere ticket de estacionamiento. Usa Tupper solo si tu ticket lo indica.' } },
    ],
  },
]

export const events: Event[] = [
  { id: 'foo-fighters-2027', date: '2027-02-28', dateLabel: { en: '28 FEB 2027', es: '28 FEB 2027' }, title: 'Foo Fighters · Take Cover Tour', venueId: 'national-stadium', ticketSource: 'Ticketmaster Chile', ticketUrl: 'https://www.ticketmaster.cl/event/foo-fighters-live-2027-scl' },
  { id: 'lollapalooza-2027', date: '2027-03-12', endDate: '2027-03-14', dateLabel: { en: '12–14 MAR 2027', es: '12–14 MAR 2027' }, title: 'Lollapalooza Chile 2027', venueId: 'ohiggins-park', ticketSource: 'Ticketmaster Chile', ticketUrl: 'https://www.ticketmaster.cl/event/lollapalooza-chile-2027' },
  { id: 'simple-plan-2027', date: '2027-05-08', dateLabel: { en: '08 MAY 2027', es: '08 MAY 2027' }, title: 'Simple Plan Chile 2027', venueId: 'santander-arena', ticketSource: 'PuntoTicket', ticketUrl: 'https://www.puntoticket.com/simple-plan-2027' },
]

export function venueFor(event: Event): Venue {
  const venue = venues.find((candidate) => candidate.id === event.venueId)
  if (!venue) throw new Error(`Unknown venue: ${event.venueId}`)
  return venue
}

export function isPastEvent(event: Event, today: string): boolean {
  return (event.endDate ?? event.date) < today
}
