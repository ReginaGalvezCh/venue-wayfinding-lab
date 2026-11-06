import { useEffect, useState } from 'react'

type Language = 'en' | 'es'
type AccessId = 'metro' | 'tupperWalk' | 'vielDrive' | 'tupperDrive'
type Access = { id: AccessId; code: string; mode: 'walk' | 'drive'; color: string; x: number; y: number; name: Record<Language, string>; detail: Record<Language, string> }

const officialUrl = 'https://www.santanderarena.cl/como-llegar-a-santander-arena'
const accessPoints: Access[] = [
  { id: 'metro', code: '01', mode: 'walk', color: '#d6f177', x: 75, y: 85, name: { en: "Parque O'Higgins Metro", es: "Metro Parque O'Higgins" }, detail: { en: "The venue lists Parque O'Higgins Metro as a general pedestrian approach.", es: "El recinto indica Metro Parque O'Higgins como acceso peatonal general." } },
  { id: 'tupperWalk', code: '02', mode: 'walk', color: '#7de3d9', x: 495, y: 85, name: { en: 'Tupper Street', es: 'Calle Tupper' }, detail: { en: 'The venue also lists Tupper Street as a general pedestrian approach.', es: 'El recinto también indica calle Tupper como acceso peatonal general.' } },
  { id: 'vielDrive', code: '03', mode: 'drive', color: '#ffb3a1', x: 75, y: 390, name: { en: 'Viel Avenue', es: 'Avenida Viel' }, detail: { en: 'Vehicle entry requires a parking ticket. Use Viel only if your ticket indicates it.', es: 'El ingreso vehicular requiere ticket de estacionamiento. Usa Viel solo si tu ticket lo indica.' } },
  { id: 'tupperDrive', code: '04', mode: 'drive', color: '#b5b7ff', x: 495, y: 390, name: { en: 'Tupper Avenue', es: 'Avenida Tupper' }, detail: { en: 'Vehicle entry requires a parking ticket. Use Tupper only if your ticket indicates it.', es: 'El ingreso vehicular requiere ticket de estacionamiento. Usa Tupper solo si tu ticket lo indica.' } },
]
const copy = {
  en: { eyebrow: 'Santander Arena · Santiago, Chile', title: 'A clearer way to arrive.', intro: 'Explore the general access options published by the venue. Choose how you plan to arrive and check the official information before your event.', diagram: 'Access diagram', diagramHelp: 'A schematic guide, not a geographic map. Select an access point here or in the list.', options: 'Explore access points', selected: 'Selected access', type: 'Access type', walk: 'Pedestrian', drive: 'Vehicle with parking ticket', note: 'Access arrangements and door opening times can change by event. Check your ticket and the venue before traveling.', visual: 'Arrival guide', list: 'Access list', design: 'Original SVG · Responsive UI · Keyboard access', footer: 'Wayfinding Lab / Independent portfolio concept', switchTo: 'Cambiar a español', official: 'Check official access information ↗', diagramLabel: 'Schematic access diagram', arena: 'SANTANDER', arena2: 'ARENA', schematic: 'NOT TO SCALE', active: 'selected' },
  es: { eyebrow: 'Santander Arena · Santiago, Chile', title: 'Una forma más clara de llegar.', intro: 'Explora los accesos generales publicados por el recinto. Elige cómo planeas llegar y revisa la información oficial antes del evento.', diagram: 'Diagrama de accesos', diagramHelp: 'Guía esquemática, no mapa geográfico. Selecciona un acceso aquí o en la lista.', options: 'Explora los accesos', selected: 'Acceso seleccionado', type: 'Tipo de acceso', walk: 'Peatonal', drive: 'Vehículo con ticket de estacionamiento', note: 'Los accesos y horarios de apertura pueden cambiar según el evento. Revisa tu entrada y la información del recinto antes de viajar.', visual: 'Guía de llegada', list: 'Lista de accesos', design: 'SVG original · Interfaz adaptable · Acceso por teclado', footer: 'Wayfinding Lab / Concepto de portafolio independiente', switchTo: 'Switch to English', official: 'Consultar accesos oficiales ↗', diagramLabel: 'Diagrama esquemático de accesos', arena: 'SANTANDER', arena2: 'ARENA', schematic: 'NO ESTÁ A ESCALA', active: 'seleccionado' },
} as const

function AccessDiagram({ selected, onSelect, language }: { selected: AccessId; onSelect: (id: AccessId) => void; language: Language }) {
  const t = copy[language]
  return <svg className="venue-map" viewBox="0 0 760 600" role="group" aria-label={t.diagramLabel}>
    <defs><pattern id="dots" width="15" height="15" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#aab8b7" opacity=".35" /></pattern></defs>
    <rect width="760" height="600" rx="28" fill="url(#dots)" />
    <path d="M230 168 L309 249 M530 168 L451 249 M230 432 L309 351 M530 432 L451 351" stroke="#c2d0c9" strokeWidth="8" strokeLinecap="round" fill="none" />
    {accessPoints.map((point) => {
      const isSelected = point.id === selected
      return <g key={point.id} role="button" tabIndex={0} aria-label={`${point.name[language]}, ${point.mode === 'walk' ? t.walk : t.drive}${isSelected ? `, ${t.active}` : ''}`} aria-pressed={isSelected} className={`access-node ${isSelected ? 'is-selected' : ''}`} onClick={() => onSelect(point.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(point.id) } }}>
        <rect x={point.x} y={point.y} width="190" height="95" rx="18" fill={isSelected ? point.color : '#fff'} stroke={isSelected ? '#243e48' : '#bdccc4'} strokeWidth={isSelected ? 4 : 2} />
        <circle cx={point.x + 29} cy={point.y + 29} r="15" fill={point.color} stroke="#243e48" strokeWidth="1.5" />
        <text x={point.x + 29} y={point.y + 34} textAnchor="middle" className="node-code">{point.code}</text>
        <text x={point.x + 18} y={point.y + 70} className="node-name">{point.name[language]}</text>
      </g>
    })}
    <circle cx="380" cy="300" r="120" fill="#213e48" stroke="#d6f177" strokeWidth="8" />
    <circle cx="380" cy="300" r="99" fill="none" stroke="#6e8f88" strokeWidth="2" strokeDasharray="4 9" />
    <text x="380" y="288" textAnchor="middle" className="arena-name">{t.arena}</text><text x="380" y="330" textAnchor="middle" className="arena-name">{t.arena2}</text>
    <text x="380" y="574" textAnchor="middle" className="schematic-label">{t.schematic}</text>
  </svg>
}

export default function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [selected, setSelected] = useState<AccessId>('metro')
  const active = accessPoints.find((point) => point.id === selected)!
  const t = copy[language]
  useEffect(() => { document.documentElement.lang = language }, [language])
  return <div className="site-shell">
    <header className="topbar"><div className="brand"><span className="brand-mark" aria-hidden="true">↗</span><span>WAY / FIND</span></div><button className="language-switch" type="button" onClick={() => setLanguage(language === 'en' ? 'es' : 'en')} aria-label={t.switchTo}>{language === 'en' ? 'EN / ES' : 'ES / EN'} <span aria-hidden="true">↗</span></button></header>
    <main>
      <section className="hero" aria-labelledby="page-title"><div><p className="eyebrow"><span className="eyebrow-dot" />{t.eyebrow}</p><h1 id="page-title">{t.title}</h1><p className="intro">{t.intro}</p></div><div className="edition-card"><span>01 / 04</span><strong>{t.visual}</strong><small>{t.design}</small></div></section>
      <div className="content-grid">
        <section className="map-panel" aria-labelledby="map-title"><div className="panel-heading"><div><span className="section-kicker">01 / {t.visual}</span><h2 id="map-title">{t.diagram}</h2></div><div className="map-compass" aria-hidden="true">↗</div></div><p className="map-help">{t.diagramHelp}</p><AccessDiagram selected={selected} onSelect={setSelected} language={language} /><div className="map-legend"><span><i className="legend-dot" />{active.name[language]}</span><span><i className="legend-route" />{t.schematic}</span></div></section>
        <aside className="side-panel"><section className="section-picker" aria-labelledby="options-title"><div className="panel-heading"><div><span className="section-kicker">02 / {t.list}</span><h2 id="options-title">{t.options}</h2></div></div><div className="sector-list">{accessPoints.map((point) => <button type="button" key={point.id} className={`sector-option ${selected === point.id ? 'is-selected' : ''}`} aria-pressed={selected === point.id} onClick={() => setSelected(point.id)}><span className="sector-swatch" style={{ backgroundColor: point.color }} /><span className="sector-name">{point.name[language]}<small>{point.mode === 'walk' ? t.walk : t.drive}</small></span><span className="option-index">{point.code}</span></button>)}</div></section>
          <section className="route-card" aria-label={t.selected} aria-live="polite"><span className="route-kicker">{t.selected} <span className="route-arrow">↗</span></span><h2>{active.name[language]}</h2><div className="gate-tag"><span>{t.type}</span><strong>{active.mode === 'walk' ? t.walk : t.drive}</strong></div><p>{active.detail[language]}</p><a href={officialUrl} target="_blank" rel="noreferrer" className="official-link">{t.official}</a></section></aside>
      </div><p className="disclaimer">{t.note}</p>
    </main><footer><span>{t.footer}</span><span>2026 · React + TypeScript</span></footer>
  </div>
}
