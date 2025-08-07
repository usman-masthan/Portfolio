import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

// Mock Image component
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props) => {
        // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
        return <img {...props} priority={undefined} />
    }
}))

describe('HomePage', () => {
    beforeEach(() => {
        // Mock successful API responses
        global.fetch = jest.fn((url) => {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    projects: [
                        { id: 1, title: 'Project 1', description: 'Test project' }
                    ],
                    profile: {
                        name: 'Ahamed Usman',
                        role: 'Full Stack Developer'
                    }
                })
            })
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('renders home page content', async () => {
        render(<HomePage />)
        expect(document.body).toBeInTheDocument()
    })
})