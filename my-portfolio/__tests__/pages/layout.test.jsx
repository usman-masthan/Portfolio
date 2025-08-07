import { render } from '@testing-library/react'
import RootLayout from '@/app/layout'

// Create a custom render function for layout
const renderWithLayout = (ui) => {
    return render(ui, {
        container: document.documentElement, // Use the document root
    })
}

describe('RootLayout', () => {
    it('renders layout with children', () => {
        const { getByText } = renderWithLayout(
            <RootLayout>
                <div>Test Content</div>
            </RootLayout>
        )

        expect(getByText('Test Content')).toBeInTheDocument()
    })
})