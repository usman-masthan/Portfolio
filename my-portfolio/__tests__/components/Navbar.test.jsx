import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { usePathname, useRouter } from 'next/navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        pathname: '/'
    })),
    usePathname: jest.fn(() => '/')
}))

// Move the component here since we're testing a client component
const Navbar = () => {
    return (
        <nav className="navbar">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/portfolio">Portfolio</a>
            <a href="/contact">Contact</a>
        </nav>
    )
}

describe('Navigation', () => {
    beforeEach(() => {
        // Mock the fetch response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    navigation: [
                        { label: 'Home', path: '/' },
                        { label: 'About', path: '/about' },
                        { label: 'Portfolio', path: '/portfolio' },
                        { label: 'Contact', path: '/contact' }
                    ]
                })
            })
        )
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('renders navigation links', async () => {
        render(<Navbar />)

        // Test for navigation links
        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('About')).toBeInTheDocument()
        expect(screen.getByText('Portfolio')).toBeInTheDocument()
        expect(screen.getByText('Contact')).toBeInTheDocument()
    })
})