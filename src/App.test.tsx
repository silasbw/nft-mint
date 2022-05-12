import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

test('"Connect wallet" button exists', () => {
  const { getByTestId } = render(<App />)
  expect(getByTestId("connect-wallet")).toBeInTheDocument()
})

test('Hamburger menu exists', () => {
  const { getByTestId } = render(<App />)
  expect(getByTestId("hamburger-menu")).toBeInTheDocument()
})

test('Hamburger menu opens', () => {
  const { getByTestId,  } = render(<App />)
  fireEvent(
    getByTestId("hamburger-menu"),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )
  expect(getByTestId("github-link")).toBeInTheDocument()
})
