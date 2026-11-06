import { useEffect, useState } from 'react'
import { events, isPastEvent, reviewedAt, venueFor, type Event, type Language, type Venue } from './catalog'

const copy = {
  en: { eyebrow: 'Santiago, Chile · Event access atlas', title: 'Know the approach. Check the gate.', intro: 'Choose an event, compare published arrival options, and follow the source that applies to your ticket. Every guide is a dated editorial snapshot.', events: 'Choose an event', selectedEvent: 'Selected event', diagram: 'Arrival diagram', diagramHelp: 'Conceptual overview, not a street map or event gate plan.', options: 'Compare arrival options', selected: 'Selected option', source: 'Source checked', ticket: 'Event listing', guidance: 'Arrival guidance', caution: 'The event organizer or your ticket may specify a different gate, time, or approach. Check the latest official instructions before traveling.', design: '3 venues · 2 ticket platforms · Source-backed UI', footer: 'Wayfinding Lab / Independent portfolio concept', switchTo: 'Cambiar a español', schematic: 'NOT TO SCALE', past: 'Past event', upcoming: 'Scheduled' },
  es: { eyebrow: 'Santiago, Chile · Atlas de accesos', title: 'Explora cómo llegar. Confirma tu puerta.', intro: 'Elige un evento, compara formas de llegar publicadas y consulta la fuente que corresponda a tu entrada. Cada guía es una revisión fechada.', events: 'Elige un evento', selectedEvent: 'Evento seleccionado', diagram: 'Diagrama de llegada', diagramHelp: 'Esquema conceptual; no es un mapa de calles ni de puertas del evento.', options: 'Compara formas de llegar', selected: 'Opción seleccionada', source: 'Fuente revisada', ticket: 'Ficha del evento', guidance: 'Guía de llegada', caution: 'La organización o tu entrada pueden indicar otra puerta, horario o ruta. Revisa las últimas instrucciones oficiales antes de viajar.', design: '3 recintos · 2 ticketeras · UI con fuentes', footer: 'Wayfinding Lab / Concepto de portafolio independiente', switchTo: 'Switch to English', schematic: 'NO ESTÁ A ESCALA', past: 'Evento pasado', upcoming: 'Programado' },
} as const

function AccessDiagram({ venue, selectedId, onSelect, language }: { venue: Venue; selectedId: string; onSelect: (id: string) => void; language: Language }) {
  return <svg className="venue-map" viewBox="0 0 760 600" role="group" aria-label={`${venue.name}: ${copy[language].diagramHelp}`}>
    <defs><pattern id="dots" width="15" height="15" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#aab8b7" opacity=".35" /></pattern></defs>
    <rect width="760" height="600" rx="28" fill="url(#dots)" />
    {venue.options.map((option) => {
      const isSelected = selectedId === option.id
      return <g key={option.id}>
        <path d={`M380 300 L${option.x + 95} ${option.y + 47}`} stroke="#c2d0c9" strokeWidth="8" strokeLinecap="round" />
        <g role="button" tabIndex={0} aria-label={`${option.name[language]}${isSelected ? ', selected' : ''}`} aria-pressed={isSelected} className={`access-node ${isSelected ? 'is-selected' : ''}`} onClick={() => onSelect(option.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(option.id) } }}>
          <rect x={option.x} y={option.y} width="190" height="95" rx="18" fill={isSelected ? option.color : '#fff'} stroke={isSelected ? '#243e48' : '#bdccc4'} strokeWidth={isSelected ? 4 : 2} />
          <circle cx={option.x + 29} cy={option.y + 29} r="15" fill={option.color} stroke="#243e48" strokeWidth="1.5" />
          <text x={option.x + 29} y={option.y + 34} textAnchor="middle" className="node-code">{option.code}</text>
          <text x={option.x + 12} y={option.y + 70} className="node-name" textLength="166" lengthAdjust="spacingAndGlyphs">{option.name[language]}</text>
        </g>
      </g>
    })}
    <circle cx="380" cy="300" r="120" fill="#213e48" stroke="#d6f177" strokeWidth="8" />
    <circle cx="380" cy="300" r="99" fill="none" stroke="#6e8f88" strokeWidth="2" strokeDasharray="4 9" />
    <text x="380" y="288" textAnchor="middle" className="arena-name">{venue.mark[0]}</text><text x="380" y="330" textAnchor="middle" className="arena-name">{venue.mark[1]}</text>
    <text x="380" y="574" textAnchor="middle" className="schematic-label">{copy[language].schematic}</text>
  </svg>
}

function EventCard({ event, selected, onSelect, language }: { event: Event; selected: boolean; onSelect: () => void; language: Language }) {
  const t = copy[language]
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Santiago' })
  return <button className={`event-card ${selected ? 'is-selected' : ''}`} type="button" aria-pressed={selected} onClick={onSelect}>
    <span className="event-card-top"><span>{event.dateLabel[language]}</span><span>{isPastEvent(event, today) ? t.past : t.upcoming}</span></span>
    <strong>{event.title}</strong><span className="event-card-venue">{venueFor(event).name}</span><span className="event-card-source">{event.ticketSource} <span aria-hidden="true">↗</span></span>
  </button>
}

export default function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [eventId, setEventId] = useState(events[0].id)
  const [selectedId, setSelectedId] = useState(venueFor(events[0]).options[0].id)
  const event = events.find((candidate) => candidate.id === eventId)!
  const venue = venueFor(event)
  const active = venue.options.find((option) => option.id === selectedId)!
  const t = copy[language]
  useEffect(() => { document.documentElement.lang = language }, [language])

  function selectEvent(next: Event) {
    setEventId(next.id)
    setSelectedId(venueFor(next).options[0].id)
  }

  return <div className="site-shell">
    <header className="topbar"><div className="brand"><span className="brand-mark" aria-hidden="true">↗</span><span>WAY / FIND</span></div><button className="language-switch" type="button" onClick={() => setLanguage(language === 'en' ? 'es' : 'en')} aria-label={t.switchTo}>{language === 'en' ? 'EN / ES' : 'ES / EN'} <span aria-hidden="true">↗</span></button></header>
    <main>
      <section className="hero" aria-labelledby="page-title"><div><p className="eyebrow"><span className="eyebrow-dot" />{t.eyebrow}</p><h1 id="page-title">{t.title}</h1><p className="intro">{t.intro}</p></div><div className="edition-card"><span>01 / 03</span><strong>{t.events}</strong><small>{t.design}</small></div></section>
      <section className="events-section" aria-labelledby="events-title"><div className="events-heading"><div><span className="section-kicker">01 / {t.selectedEvent}</span><h2 id="events-title">{t.events}</h2></div><span className="review-date">{t.source}: {reviewedAt}</span></div><div className="event-grid">{events.map((candidate) => <EventCard key={candidate.id} event={candidate} selected={candidate.id === eventId} onSelect={() => selectEvent(candidate)} language={language} />)}</div></section>
      <div className="content-grid">
        <section className="map-panel" aria-labelledby="map-title"><div className="panel-heading"><div><span className="section-kicker">02 / {venue.name}</span><h2 id="map-title">{t.diagram}</h2></div><div className="map-compass" aria-hidden="true">↗</div></div><p className="map-help">{t.diagramHelp}</p><AccessDiagram venue={venue} selectedId={selectedId} onSelect={setSelectedId} language={language} /><div className="map-legend"><span><i className="legend-dot" />{active.name[language]}</span><span><i className="legend-route" />{t.schematic}</span></div></section>
        <aside className="side-panel"><section className="section-picker" aria-labelledby="options-title"><div className="panel-heading"><div><span className="section-kicker">03 / {t.options}</span><h2 id="options-title">{t.options}</h2></div></div><div className="sector-list">{venue.options.map((option) => <button type="button" key={option.id} className={`sector-option ${selectedId === option.id ? 'is-selected' : ''}`} aria-pressed={selectedId === option.id} onClick={() => setSelectedId(option.id)}><span className="sector-swatch" style={{ backgroundColor: option.color }} /><span className="sector-name">{option.name[language]}</span><span className="option-index">{option.code}</span></button>)}</div></section>
          <section className="route-card" aria-label={t.selected} aria-live="polite"><span className="route-kicker">{t.selected} <span className="route-arrow">↗</span></span><h2>{active.name[language]}</h2><p>{active.detail[language]}</p><div className="source-links"><a href={event.ticketUrl} target="_blank" rel="noreferrer" className="official-link">{t.ticket}: {event.ticketSource} ↗</a><a href={venue.sourceUrl} target="_blank" rel="noreferrer" className="official-link">{t.guidance}: {venue.sourceLabel} ↗</a></div></section></aside>
      </div><p className="disclaimer">{t.caution}</p>
    </main><footer><span>{t.footer}</span><span>2026 · React + TypeScript</span></footer>
  </div>
}
