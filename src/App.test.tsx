import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test } from 'vitest'
import App from './App'
import { events, isPastEvent, venueFor } from './catalog'

afterEach(cleanup)

describe('event access atlas', () => {
  test('event selection updates the venue and resets its arrival option', async () => {
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: /Simple Plan Chile 2027/ }))
    expect(screen.getByRole('button', { name: /Simple Plan Chile 2027/ }).getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByRole('button', { name: "Parque O'Higgins Metro, selected" }).getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByRole('link', { name: /Event listing: PuntoTicket/ }).getAttribute('href')).toBe('https://www.puntoticket.com/simple-plan-2027')
  })

  test('list and keyboard diagram selection stay synchronized', async () => {
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: 'Guillermo Mann02' }))
    expect(screen.getByRole('button', { name: 'Guillermo Mann, selected' }).getAttribute('aria-pressed')).toBe('true')
    const grecia = screen.getByRole('button', { name: 'Avenida Grecia' })
    fireEvent.keyDown(grecia, { key: 'Enter' })
    expect(grecia.getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByText(/General park approach. The venue lists Estadio Nacional Metro/)).toBeTruthy()
  })

  test('language switching preserves event and option', async () => {
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: /Simple Plan Chile 2027/ }))
    await userEvent.click(screen.getAllByRole('button', { name: /Tupper Avenue · car/ })[1])
    await userEvent.click(screen.getByRole('button', { name: 'Cambiar a español' }))
    expect(screen.getByRole('heading', { name: 'Avenida Tupper · auto' })).toBeTruthy()
    expect(document.documentElement.lang).toBe('es')
  })

  test('catalog exposes original sources and marks past dates deterministically', () => {
    expect(events).toHaveLength(3)
    expect(events.every((event) => venueFor(event).sourceUrl.startsWith('https://'))).toBe(true)
    expect(isPastEvent(events[0], '2027-02-27')).toBe(false)
    expect(isPastEvent(events[0], '2027-03-01')).toBe(true)
    expect(isPastEvent(events[1], '2027-03-13')).toBe(false)
    expect(isPastEvent(events[1], '2027-03-15')).toBe(true)
  })
})
