import { render, screen } from '@testing-library/react'
import Projects from '@/components/Projects'  // Updated import path

describe('Projects Component', () => {
    it('renders project cards', () => {
        render(<Projects />)

        const projectCards = screen.getAllByRole('article')
        expect(projectCards.length).toBeGreaterThan(0)
    })
})