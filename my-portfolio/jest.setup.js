import '@testing-library/jest-dom'
import 'whatwg-fetch'

// Mock fetch globally
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
    })
)

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        pathname: '/'
    })),
    usePathname: jest.fn(() => '/'),
    useSearchParams: () => new URLSearchParams()
}))

// Mock next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} priority={undefined} alt={props.alt || ''} />
    }
}))

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() { return null }
    unobserve() { return null }
    disconnect() { return null }
}

// Reset all mocks before each test
beforeEach(() => {
    jest.clearAllMocks()
})