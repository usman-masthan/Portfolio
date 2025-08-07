import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navbar from '../../components/Navbar'

// Mock fetch globally for this test
global.fetch = jest.fn()

describe('Navbar Component', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders the navbar with default logo', () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    })

    render(<Navbar />)
    
    expect(screen.getByText('Ahamed Usman')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    })

    render(<Navbar />)
    
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('Testimonials')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('toggles mobile menu when hamburger button is clicked', () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    })

    render(<Navbar />)
    
    const menuButton = screen.getByLabelText('Toggle menu')
    // Get the mobile menu container by checking for the class that indicates closed state
    const mobileMenuContainer = document.querySelector('.max-h-0')
    
    // Mobile menu should be hidden initially
    expect(mobileMenuContainer).toHaveClass('max-h-0')
    
    // Click hamburger button to open menu
    fireEvent.click(menuButton)
    
    // After click, should have max-h-96 class
    expect(mobileMenuContainer).toHaveClass('max-h-96')
    
    // Click again to close
    fireEvent.click(menuButton)
    
    // Mobile menu should be hidden again
    expect(mobileMenuContainer).toHaveClass('max-h-0')
  })

  it('fetches and updates header data from API', async () => {
    const mockHeaderData = {
      logo: 'Custom Logo',
      navigation: [
        { label: 'Custom About', href: '/about' },
        { label: 'Custom Portfolio', href: '/portfolio' },
      ],
      ctaButton: { label: 'Custom Contact', href: '/contact' }
    }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockHeaderData,
    })

    render(<Navbar />)
    
    // Wait for the API call and state update
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/header')
      expect(screen.getByText('Custom Logo')).toBeInTheDocument()
    })

    expect(screen.getByText('Custom About')).toBeInTheDocument()
    expect(screen.getByText('Custom Portfolio')).toBeInTheDocument()
    expect(screen.getByText('Custom Contact')).toBeInTheDocument()
  })

  it('handles API fetch error gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    fetch.mockRejectedValueOnce(new Error('Network error'))

    render(<Navbar />)
    
    // Wait for the failed API call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/header')
    })

    // Should still render default content
    expect(screen.getByText('Ahamed Usman')).toBeInTheDocument()
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching header data:', expect.any(Error))
    
    consoleSpy.mockRestore()
  })

  it('adds scrolled class when scrolling', () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    })

    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      value: 25,
      writable: true,
    })

    render(<Navbar />)
    
    // Trigger scroll event
    fireEvent.scroll(window)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('py-4', 'bg-background/80', 'backdrop-blur-md', 'shadow-sm')
  })

  it('closes mobile menu when a link is clicked', () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    })

    render(<Navbar />)
    
    const menuButton = screen.getByLabelText('Toggle menu')
    const mobileMenuContainer = document.querySelector('.max-h-0')
    
    // Open mobile menu
    fireEvent.click(menuButton)
    expect(mobileMenuContainer).toHaveClass('max-h-96')
    
    // Click a link in mobile menu - get all About links and find the one in mobile menu
    const aboutLinks = screen.getAllByText('About')
    const mobileAboutLink = aboutLinks.find(link => 
      link.closest('.md\\:hidden')
    )
    
    if (mobileAboutLink) {
      fireEvent.click(mobileAboutLink)
      // Menu should close
      expect(mobileMenuContainer).toHaveClass('max-h-0')
    }
  })
})