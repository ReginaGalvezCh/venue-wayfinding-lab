# Visual coding task 01: event access atlas

This is a portfolio example of a **screenshot-grounded, multi-step frontend task**. It is based on a real increment in this repository. The task is self-contained and uses fixed source data so a reviewer can grade behavior without relying on a live ticket API.

## Visual input and starting point

- Target desktop screenshot: [event atlas](../../docs/atlas-desktop.png).
- Target mobile screenshot: [stacked event selection and diagram](../../docs/atlas-mobile.png).
- Starter code: commit [`53e3d6e`](https://github.com/ReginaGalvezCh/venue-wayfinding-lab/tree/53e3d6e394a60b56b7a964eb480914e96f69c71d). It has a working bilingual, keyboard-operable Santander Arena diagram, but no event selector.
- Reference implementation: commit [`c1d3ec1`](https://github.com/ReginaGalvezCh/venue-wayfinding-lab/commit/c1d3ec1) and the documented [merged PR](https://github.com/ReginaGalvezCh/venue-wayfinding-lab/pull/1). The reference is **one valid implementation**, not a required component structure.

The screenshots specify visual hierarchy, spacing, selection treatment, and mobile stacking. Exact pixel matching is not the sole goal: the interactions and source boundaries below are required.

## Task brief

Starting from `53e3d6e`, extend Way / Find from one venue to three upcoming Santiago events. Keep the original React + TypeScript approach. A person should be able to choose an event, compare general arrival options in a conceptual SVG and text list, change language, and open separate links for the event listing and arrival guidance.

Use this fixed catalog, reviewed on **6 November 2026**:

| Event and date | Venue | Event listing | Published arrival options and source |
| --- | --- | --- | --- |
| Foo Fighters, 28 Feb 2027 | Parque Estadio Nacional | [Ticketmaster](https://www.ticketmaster.cl/event/foo-fighters-live-2027-scl) | Pedro de Valdivia, Guillermo Mann, Avenida Grecia: [park guidance](https://parqueestadionacional.cl/como-llegar) |
| Lollapalooza Chile, 12–14 Mar 2027 | Parque O'Higgins | [Ticketmaster](https://www.ticketmaster.cl/event/lollapalooza-chile-2027) | Parque O'Higgins Metro, Rondizzoni Metro, bicycle parking, limited car parking passes: [festival FAQ](https://lollapaloozacl.com/preguntas-frecuentes/) |
| Simple Plan, 8 May 2027 | Santander Arena | [PuntoTicket](https://www.puntoticket.com/simple-plan-2027) | Parque O'Higgins Metro, Tupper pedestrian approach, Viel or Tupper by car **only as directed on a parking ticket**: [venue guidance](https://www.santanderarena.cl/como-llegar-a-santander-arena) |

Do not assign a ticket section to a gate. Do not draw these SVG nodes as geographic coordinates. Do not scrape sellers or imply live availability.

## Objective success criteria

1. **Event change:** selecting each of the three event cards updates the venue name, SVG nodes, option list, selected detail, and both source URLs together. The first option for the newly selected venue becomes selected.
2. **Synchronized controls:** selecting an option in either the SVG or list updates both controls' `aria-pressed` states and the detail card. SVG controls respond to Enter and Space and have visible focus.
3. **Language persistence:** English/Spanish switching changes visible interface text and `<html lang>` while preserving the event and arrival option.
4. **Date boundary:** Lollapalooza remains scheduled on 13 March 2027 and becomes past on 15 March 2027. A completed single-day event is also marked past after its date.
5. **Source clarity:** each event exposes its listing and its venue/festival arrival source as distinct links. Car guidance includes the published parking condition. The UI labels the diagram as conceptual and not to scale.
6. **Responsive check:** no horizontal document overflow at 390, 768, or 1440 CSS px; event cards stack on narrow screens and the option list remains readable.

## Reproducible verification

In a fresh clone, check out the starter commit and implement the task on a new branch. Use Node.js 20.19+ or 22.12+ and `pnpm install`. To review the reference, check out `main` and run:

```sh
pnpm lint
pnpm test
pnpm build
pnpm dev
```

The interaction and date checks are in [`src/App.test.tsx`](../../src/App.test.tsx). At 390, 768, and 1440 CSS px, inspect the page in a browser, select all events and at least one SVG and list option, and verify `document.documentElement.scrollWidth <= window.innerWidth`. Check the external link targets and the caution text in the rendered UI. A reviewer should reject a visually plausible submission if the controls disagree, the date boundary fails, or the diagram implies a ticket-specific gate.

## Review record

The reference PR records the implementation and documentation commits separately. Its automated tests, lint, build, and browser width checks passed. The task intentionally grades observable behavior and source accuracy as well as appearance.
