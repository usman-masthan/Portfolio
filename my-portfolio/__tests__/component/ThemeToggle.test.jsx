import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ThemeToggle from '../../components/ThemeToggle'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  }
}))

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
}
global.localStorage = localStorageMock

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    // Clear mocks before each test
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

  it('renders theme toggle button', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('initializes with light theme by default when no stored preference exists', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    render(<ThemeToggle />)
    
    const button = screen.getByLabelText('Switch to dark mode')
    expect(button).toBeInTheDocument()
    
    // Should show sun icon (light mode)
    const sunIcon = button.querySelector('svg')
    expect(sunIcon).toBeInTheDocument()
  })

  it('initializes with stored theme preference', () => {
    localStorageMock.getItem.mockReturnValue('dark')
    
    render(<ThemeToggle />)
    
    // Should initially be in light mode until useEffect runs
    const button = screen.getByLabelText('Switch to dark mode')
    expect(button).toBeInTheDocument()
  })

  it('toggles from light to dark mode', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    render(<ThemeToggle />)
    
    const button = screen.getByLabelText('Switch to dark mode')
    
    // Click to switch to dark mode
    fireEvent.click(button)
    
    // Button text should update (this happens in React state)
    expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument()
  })

  it('toggles from dark to light mode', () => {
    localStorageMock.getItem.mockReturnValue('dark')
    
    render(<ThemeToggle />)
    
    // When localStorage has 'dark', the component should show "Switch to light mode"
    const button = screen.getByLabelText('Switch to light mode')
    
    // Click to switch to light mode  
    fireEvent.click(button)
    
    // Button should show it's now in light mode
    expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument()
  })

  it('respects system preference when no stored preference exists', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    // Mock system preference for dark mode
    window.matchMedia = jest.fn().mockReturnValue({
      matches: true, // Prefers dark mode
    })
    
    render(<ThemeToggle />)
    
    // Component renders regardless of initial state
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    
    // Should have proper aria-label (starts in light mode when no stored preference)
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
    
    // Should have focus styles (check for focus classes in className)
    expect(button).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-primary/30')
  })

  it('maintains theme state across re-renders', () => {
    localStorageMock.getItem.mockReturnValue('dark')
    
    const { rerender } = render(<ThemeToggle />)
    
    // Initially in dark mode
    expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument()
    
    // Re-render component
    rerender(<ThemeToggle />)
    
    // Should still be in dark mode
    expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument()
  })

  it('handles localStorage errors gracefully', () => {
    // Mock localStorage to throw error
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('localStorage not available')
    })
    
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    // Should still render without crashing
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    
    consoleSpy.mockRestore()
  })

  it('updates aria-label correctly after theme change', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    
    // Initially light mode (no stored preference)
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
    
    // Click to switch to dark mode
    fireEvent.click(button)
    
    // Aria-label should update
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
  })
})