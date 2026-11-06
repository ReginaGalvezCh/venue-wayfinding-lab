import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test } from 'vitest'
import App from './App'

afterEach(cleanup)

describe('access explorer', () => {
  test('the diagram and list reflect the same selection', async () => {
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /Viel Avenue/ })[1])
    expect(screen.getByRole('button', { name: /Viel Avenue, Vehicle with parking ticket, selected/ }).getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByText('Vehicle entry requires a parking ticket. Use Viel only if your ticket indicates it.')).toBeTruthy()
  })

  test('the SVG choice works with the keyboard', () => {
    render(<App />)
    const tupper = screen.getByRole('button', { name: 'Tupper Street, Pedestrian' })
    fireEvent.keyDown(tupper, { key: 'Enter' })
    expect(tupper.getAttribute('aria-pressed')).toBe('true')
  })

  test('language switching retains selection and updates the page language', async () => {
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /Tupper Avenue/ })[1])
    await userEvent.click(screen.getByRole('button', { name: 'Cambiar a español' }))
    expect(screen.getByRole('heading', { name: 'Avenida Tupper' })).toBeTruthy()
    expect(screen.getByText('El ingreso vehicular requiere ticket de estacionamiento. Usa Tupper solo si tu ticket lo indica.')).toBeTruthy()
    expect(document.documentElement.lang).toBe('es')
  })
})
