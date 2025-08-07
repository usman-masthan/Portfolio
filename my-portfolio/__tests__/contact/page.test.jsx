import { render, screen } from '@testing-library/react'
import ContactForm from '@/components/ContactForm'  // Updated import path

describe('ContactForm Component', () => {
    it('renders form fields', () => {
        render(<ContactForm />)

        expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    })
})