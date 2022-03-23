import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('"Connect wallet" button exists', () => {
  render(<App />)
  const linkElement = screen.getByText(/Connect wallet/i)
  expect(linkElement).toBeInTheDocument()
})
