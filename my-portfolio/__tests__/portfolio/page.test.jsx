import { render, screen } from '@testing-library/react'
import PortfolioPage from '@/app/portfolio/page'

// Mock fetch responses
const mockProjects = [
    { id: 1, title: 'Project 1', description: 'Description 1' }
]

describe('Portfolio Page', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockProjects)
            })
        )
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('renders portfolio page', () => {
        const { container } = render(<PortfolioPage />)
        expect(container).toBeInTheDocument()
    })
})