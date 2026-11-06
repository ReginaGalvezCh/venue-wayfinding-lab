import { useState } from 'react'

type Language = 'en' | 'es'
type SectorId = 'north' | 'west' | 'floor' | 'east' | 'south'

type Sector = {
  id: SectorId
  code: string
  gate: string
  path: string
  cx: number
  cy: number
  route: string
  accent: string
  name: Record<Language, string>
  guidance: Record<Language, string>
}

const sectors: Sector[] = [
  { id: 'north', code: 'N1', gate: 'N', path: 'M290 126 Q380 95 470 126 L450 205 Q380 184 310 205 Z', cx: 380, cy: 151, route: '380,56 380,112 380,151', accent: '#d6f177', name: { en: 'North Terrace', es: 'Terraza Norte' }, guidance: { en: 'Enter at Gate N. Follow the lime markers to the upper terrace.', es: 'Ingresa por la Puerta N. Sigue las señales lima hasta la terraza superior.' } },
  { id: 'west', code: 'W2', gate: 'W', path: 'M286 133 Q190 149 147 229 L171 315 L243 291 Q253 238 310 208 Z', cx: 213, cy: 226, route: '81,268 151,268 213,226', accent: '#7de3d9', name: { en: 'West Gallery', es: 'Galería Oeste' }, guidance: { en: 'Enter at Gate W. Stay on the concourse and take the first left.', es: 'Ingresa por la Puerta W. Sigue el pasillo principal y toma el primer giro a la izquierda.' } },
  { id: 'floor', code: 'F3', gate: 'S', path: 'M298 282 Q380 265 462 282 L490 406 Q380 431 270 406 Z', cx: 380, cy: 348, route: '380,550 380,460 380,348', accent: '#ffb3a1', name: { en: 'Main Floor', es: 'Platea Central' }, guidance: { en: 'Enter at Gate S. Use the central aisle to reach the floor.', es: 'Ingresa por la Puerta S. Usa el pasillo central para llegar a platea.' } },
  { id: 'east', code: 'E4', gate: 'E', path: 'M474 133 Q570 149 613 229 L589 315 L517 291 Q507 238 450 208 Z', cx: 547, cy: 226, route: '679,268 609,268 547,226', accent: '#b5b7ff', name: { en: 'East Gallery', es: 'Galería Este' }, guidance: { en: 'Enter at Gate E. Stay on the concourse and take the first right.', es: 'Ingresa por la Puerta E. Sigue el pasillo principal y toma el primer giro a la derecha.' } },
  { id: 'south', code: 'S5', gate: 'S', path: 'M262 442 Q380 480 498 442 L528 506 Q380 558 232 506 Z', cx: 380, cy: 490, route: '380,550 380,520 380,490', accent: '#f7cd81', name: { en: 'South Terrace', es: 'Terraza Sur' }, guidance: { en: 'Enter at Gate S. Take the outer walkway to the lower terrace.', es: 'Ingresa por la Puerta S. Sigue el pasillo exterior hasta la terraza inferior.' } },
]

const copy = {
  en: {
    eyebrow: 'A clearer way in', title: 'Find your place before the crowd.', intro: 'Choose a section to see a simple entrance suggestion. The map and list always stay in sync.', map: 'Venue map', mapHelp: 'Select a colored section on the map or use the section list.', sections: 'Choose your section', selected: 'Your route', entrance: 'Recommended entrance', note: 'A fictional venue for interface exploration. Always follow signs and staff instructions at a real event.', visual: 'Visual guide', list: 'Text list', design: 'Original SVG · Responsive UI · Keyboard access', footer: 'Wayfinding Lab / Independent portfolio project', gate: 'Gate', stage: 'STAGE', section: 'Section', active: 'selected', switchTo: 'Cambiar a español', logo: 'WAY / FIND',
  },
  es: {
    eyebrow: 'Una entrada más clara', title: 'Encuentra tu lugar antes de la multitud.', intro: 'Elige un sector para ver una sugerencia de acceso. El mapa y la lista permanecen sincronizados.', map: 'Mapa del recinto', mapHelp: 'Selecciona un sector de color en el mapa o utiliza la lista.', sections: 'Elige tu sector', selected: 'Tu recorrido', entrance: 'Acceso recomendado', note: 'Recinto ficticio para explorar una interfaz. En un evento real, sigue siempre las señales y al personal.', visual: 'Guía visual', list: 'Lista de sectores', design: 'SVG original · Interfaz adaptable · Acceso por teclado', footer: 'Wayfinding Lab / Proyecto de portafolio independiente', gate: 'Puerta', stage: 'ESCENARIO', section: 'Sector', active: 'seleccionado', switchTo: 'Switch to English', logo: 'WAY / FIND',
  },
} as const

function VenueMap({ selected, onSelect, language }: { selected: SectorId, onSelect: (id: SectorId) => void, language: Language }) {
  const active = sectors.find((sector) => sector.id === selected)!
  const t = copy[language]
  return (
    <svg className="venue-map" viewBox="0 0 760 600" role="group" aria-label={t.map}>
      <defs>
        <pattern id="dots" width="15" height="15" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#aab8b7" opacity=".35" /></pattern>
      </defs>
      <rect x="0" y="0" width="760" height="600" rx="30" fill="url(#dots)" />
      <ellipse cx="380" cy="304" rx="295" ry="262" fill="#e5e9e2" stroke="#bdc9c3" strokeWidth="3" />
      <ellipse cx="380" cy="304" rx="232" ry="204" fill="#f8f9f5" stroke="#cfdbd3" strokeWidth="3" />
      <path d="M280 210 Q380 180 480 210 L460 265 Q380 248 300 265 Z" fill="#243e48" />
      <text x="380" y="229" textAnchor="middle" className="stage-label">{t.stage}</text>
      <path d="M280 273 Q380 248 480 273" fill="none" stroke="#b5c9c2" strokeWidth="2" strokeDasharray="4 8" />
      <polyline points={active.route} fill="none" stroke="#243e48" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 16" opacity=".72" className="route-line" />
      {sectors.map((sector) => (
        <g key={sector.id} role="button" tabIndex={0} aria-label={`${t.section} ${sector.name[language]}, ${t.gate} ${sector.gate}${selected === sector.id ? `, ${t.active}` : ''}`} aria-pressed={selected === sector.id} onClick={() => onSelect(sector.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(sector.id) } }} className={`map-sector ${selected === sector.id ? 'is-selected' : ''}`}>
          <path d={sector.path} fill={sector.accent} stroke="#243e48" strokeWidth={selected === sector.id ? 5 : 2} />
          <text x={sector.cx} y={sector.cy + 6} textAnchor="middle" className="sector-code">{sector.code}</text>
        </g>
      ))}
      {([['N', 380, 56], ['W', 81, 268], ['E', 679, 268], ['S', 380, 550]] as const).map(([gate, x, y]) => (
        <g key={gate} className="gate-marker"><circle cx={x} cy={y} r="21" /><text x={x} y={y + 6} textAnchor="middle">{gate}</text></g>
      ))}
      <circle cx={active.cx} cy={active.cy - 26} r="7" fill="#243e48" stroke="white" strokeWidth="3" />
    </svg>
  )
}

export default function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [selected, setSelected] = useState<SectorId>('floor')
  const active = sectors.find((sector) => sector.id === selected)!
  const t = copy[language]

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark" aria-hidden="true">↗</span><span>{t.logo}</span></div>
        <button className="language-switch" type="button" onClick={() => setLanguage(language === 'en' ? 'es' : 'en')} aria-label={t.switchTo}>{language === 'en' ? 'EN / ES' : 'ES / EN'} <span aria-hidden="true">↗</span></button>
      </header>

      <main>
        <section className="hero" aria-labelledby="page-title">
          <div><p className="eyebrow"><span className="eyebrow-dot" />{t.eyebrow}</p><h1 id="page-title">{t.title}</h1><p className="intro">{t.intro}</p></div>
          <div className="edition-card"><span>01 / 05</span><strong>{t.visual}</strong><small>{t.design}</small></div>
        </section>

        <div className="content-grid">
          <section className="map-panel" aria-labelledby="map-title">
            <div className="panel-heading"><div><span className="section-kicker">01 / {t.visual}</span><h2 id="map-title">{t.map}</h2></div><div className="map-compass" aria-hidden="true">N ↑</div></div>
            <p className="map-help">{t.mapHelp}</p>
            <VenueMap selected={selected} onSelect={setSelected} language={language} />
            <div className="map-legend"><span><i className="legend-dot" />{t.section} {active.code}</span><span><i className="legend-route" />{t.selected}</span></div>
          </section>

          <aside className="side-panel">
            <section className="section-picker" aria-labelledby="sections-title">
              <div className="panel-heading"><div><span className="section-kicker">02 / {t.list}</span><h2 id="sections-title">{t.sections}</h2></div></div>
              <div className="sector-list">{sectors.map((sector, index) => <button type="button" key={sector.id} className={`sector-option ${selected === sector.id ? 'is-selected' : ''}`} aria-pressed={selected === sector.id} onClick={() => setSelected(sector.id)}><span className="sector-swatch" style={{ backgroundColor: sector.accent }} /><span className="sector-name">{sector.name[language]}<small>{t.gate} {sector.gate}</small></span><span className="option-index">0{index + 1}</span></button>)}</div>
            </section>

            <section className="route-card" aria-label={t.selected} aria-live="polite">
              <span className="route-kicker">{t.selected} <span className="route-arrow">↗</span></span>
              <h2>{active.name[language]}</h2>
              <div className="gate-tag"><span>{t.entrance}</span><strong>{t.gate} {active.gate}</strong></div>
              <p>{active.guidance[language]}</p>
            </section>
          </aside>
        </div>
        <p className="disclaimer">{t.note}</p>
      </main>
      <footer><span>{t.footer}</span><span>2026 · React + TypeScript</span></footer>
    </div>
  )
}
