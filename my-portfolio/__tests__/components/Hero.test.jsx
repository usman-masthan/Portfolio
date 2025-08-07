import { render, screen } from '@testing-library/react'
import Hero from '@/components/Hero'  // Updated import path

describe('Hero Component', () => {
    it('renders hero content', () => {
        render(<Hero />)

        // Check if your name and role are displayed
        expect(screen.getByRole('heading', { name: /ahamed usman/i })).toBeInTheDocument()
        expect(screen.getByText(/full stack developer/i)).toBeInTheDocument()
    })
})