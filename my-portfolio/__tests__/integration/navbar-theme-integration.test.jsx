import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navbar from '../../components/Navbar'
import ThemeToggle from '../../components/ThemeToggle'

// Mock fetch globally
global.fetch = jest.fn()

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
}
global.localStorage = localStorageMock

describe('Navigation Integration Tests', () => {
  beforeEach(() => {
    fetch.mockClear()
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
    
    // Mock document.documentElement.classList
    document.documentElement.classList = {
      toggle: jest.fn(),
      add: jest.fn(),
      remove: jest.fn(),
      contains: jest.fn()
    }
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('navbar contains theme toggle component', () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    })
    localStorageMock.getItem.mockReturnValue(null)

    render(<Navbar />)
    
    // Should render navbar
    expect(screen.getByText('Ahamed Usman')).toBeInTheDocument()
    
    // Should contain theme toggle buttons (one for desktop, one for mobile)
    const themeToggleButtons = screen.getAllByRole('button', { 
      name: /switch to (dark|light) mode/i 
    })
    expect(themeToggleButtons).toHaveLength(2) // Desktop and mobile
  })

  it('theme toggle works within navbar context', () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    })
    localStorageMock.getItem.mockReturnValue(null)

    render(<Navbar />)
    
    // Find theme toggle in desktop navbar
    const desktopThemeToggle = screen.getAllByLabelText('Switch to dark mode')[0]
    
    // Click to switch to dark mode
    fireEvent.click(desktopThemeToggle)
    
    // Should update localStorage
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
    
    // Should toggle dark class on document
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith('dark', true)
  })

  it('mobile menu and theme toggle work together', () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    })
    localStorageMock.getItem.mockReturnValue(null)

    render(<Navbar />)
    
    // Open mobile menu
    const menuButton = screen.getByLabelText('Toggle menu')
    fireEvent.click(menuButton)
    
    // Mobile menu should be open
    const mobileMenu = screen.getByRole('link', { name: 'About' }).closest('div')
    expect(mobileMenu).toHaveClass('max-h-96')
    
    // Theme toggle should still work in mobile view
    const mobileThemeToggle = screen.getAllByLabelText('Switch to dark mode')[1]
    fireEvent.click(mobileThemeToggle)
    
    // Should update theme
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('navbar responds to API data and maintains theme state', async () => {
    const mockHeaderData = {
      logo: 'Custom Logo',
      navigation: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
      ],
      ctaButton: { label: 'Contact', href: '/contact' }
    }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockHeaderData,
    })
    localStorageMock.getItem.mockReturnValue('dark')

    render(<Navbar />)
    
    // Wait for API call and state updates
    await waitFor(() => {
      expect(screen.getByText('Custom Logo')).toBeInTheDocument()
    })

    // Custom navigation should be rendered
    expect(screen.getByText('Home')).toBeInTheDocument()
    
    // Theme toggle should be in dark mode (based on localStorage mock)
    const themeToggleButtons = screen.getAllByLabelText('Switch to light mode')
    expect(themeToggleButtons).toHaveLength(2) // Desktop and mobile
  })

  it('handles scroll events while theme toggle remains functional', () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    })
    localStorageMock.getItem.mockReturnValue(null)

    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      value: 25,
      writable: true,
    })

    render(<Navbar />)
    
    // Trigger scroll event
    fireEvent.scroll(window)
    
    // Navbar should show scrolled styles
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('py-4', 'bg-background/80', 'backdrop-blur-md', 'shadow-sm')
    
    // Theme toggle should still work after scroll
    const themeToggle = screen.getAllByLabelText('Switch to dark mode')[0]
    fireEvent.click(themeToggle)
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('mobile menu closes on navigation while preserving theme state', () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    })
    localStorageMock.getItem.mockReturnValue('dark')

    render(<Navbar />)
    
    // Open mobile menu
    const menuButton = screen.getByLabelText('Toggle menu')
    fireEvent.click(menuButton)
    
    const mobileMenu = screen.getByRole('link', { name: 'About' }).closest('div')
    expect(mobileMenu).toHaveClass('max-h-96')
    
    // Click a navigation link in mobile menu
    const aboutLink = screen.getAllByText('About')[1] // Mobile version
    fireEvent.click(aboutLink)
    
    // Menu should close
    expect(mobileMenu).toHaveClass('max-h-0')
    
    // Theme should remain in dark mode
    const themeToggleButtons = screen.getAllByLabelText('Switch to light mode')
    expect(themeToggleButtons).toHaveLength(2)
  })

  it('handles multiple user interactions in sequence', async () => {
    const mockHeaderData = {
      logo: 'Test Portfolio',
      navigation: [
        { label: 'Projects', href: '/projects' },
      ],
      ctaButton: { label: 'Hire Me', href: '/contact' }
    }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockHeaderData,
    })
    localStorageMock.getItem.mockReturnValue(null)

    render(<Navbar />)
    
    // Wait for API data
    await waitFor(() => {
      expect(screen.getByText('Test Portfolio')).toBeInTheDocument()
    })
    
    // 1. Find and interact with theme toggle (start with whatever mode it's in)
    const themeToggleButtons = screen.getAllByRole('button', { name: /switch to (dark|light) mode/i })
    expect(themeToggleButtons.length).toBeGreaterThan(0)
    
    // 2. Open mobile menu
    const menuButton = screen.getByLabelText('Toggle menu')
    fireEvent.click(menuButton)
    
    const mobileMenuContainer = document.querySelector('.max-h-96')
    expect(mobileMenuContainer).toBeInTheDocument()
    
    // 3. Verify Projects link is visible
    expect(screen.getByText('Projects')).toBeInTheDocument()
    
    // 4. Close mobile menu by clicking a link
    fireEvent.click(screen.getByText('Projects'))
    
    const closedMobileMenu = document.querySelector('.max-h-0')
    expect(closedMobileMenu).toBeInTheDocument()
    
    // All functionality should work correctly
    expect(screen.getByText('Test Portfolio')).toBeInTheDocument()
  })
})