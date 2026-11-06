import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test } from 'vitest'
import App from './App'

afterEach(cleanup)

describe('wayfinding selection', () => {
  test('the map and list stay in sync when a section is selected', async () => {
    render(<App />)
    await userEvent.click(screen.getByText('East Gallery'))
    expect(screen.getByRole('button', { name: /Section East Gallery, Gate E, selected/ }).getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByText('Enter at Gate E. Stay on the concourse and take the first right.')).toBeTruthy()
  })

  test('a map section can be selected with the keyboard', () => {
    render(<App />)
    const west = screen.getByRole('button', { name: /Section West Gallery, Gate W/ })
    fireEvent.keyDown(west, { key: 'Enter' })
    expect(west.getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByText('Enter at Gate W. Stay on the concourse and take the first left.')).toBeTruthy()
  })

  test('changing language preserves the selected section', async () => {
    render(<App />)
    await userEvent.click(screen.getByText('North Terrace'))
    await userEvent.click(screen.getByRole('button', { name: 'Cambiar a español' }))
    expect(screen.getByRole('heading', { name: 'Terraza Norte' })).toBeTruthy()
    expect(screen.getByText('Ingresa por la Puerta N. Sigue las señales lima hasta la terraza superior.')).toBeTruthy()
  })
})
