import { render, screen } from '@testing-library/react'
import { MsalReactTester } from 'msal-react-tester'
import App from './App'

let msalTester

beforeEach(() => {
  // new instance of msal tester for each test:
  msalTester = new MsalReactTester()
  // or new MsalReactTester("Redirect") / new MsalReactTester("Popup")

  // Ask msal-react-tester to handle and mock all msal-react processes:
  msalTester.spyMsal()
})

afterEach(() => {
  // reset msal-react-tester
  msalTester.resetSpyMsal()
})

test('renders learn react link', () => {
  msalTester.isLogged()
  render(<App instance={msalTester.client} />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
