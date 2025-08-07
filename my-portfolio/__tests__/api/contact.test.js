import { NextRequest, NextResponse } from 'next/server'
import { POST } from '../../../app/api/contact/route'

// Mock nodemailer
const mockSendMail = jest.fn()
jest.mock('nodemailer', () => ({
  createTransporter: jest.fn(() => ({
    sendMail: mockSendMail
  }))
}))

describe('/api/contact', () => {
  beforeEach(() => {
    mockSendMail.mockClear()
    mockSendMail.mockResolvedValue({ messageId: 'test-message-id' })
  })

  it('successfully sends email with valid data', async () => {
    const validFormData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'Test Subject',
      message: 'This is a test message'
    }

    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify(validFormData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(200)
    expect(responseData.message).toBe('Message sent successfully! We will get back to you soon.')
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: `"John Doe" <john.doe@example.com>`,
        to: process.env.EMAIL_RECIPIENT,
        subject: 'Portfolio Contact: Test Subject',
        replyTo: 'john.doe@example.com',
        text: expect.stringContaining('Name: John Doe'),
        html: expect.stringContaining('John Doe')
      })
    )
  })

  it('returns 400 for missing required fields', async () => {
    const incompleteData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      // missing subject and message
    }

    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify(incompleteData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(400)
    expect(responseData.error).toBe('Missing required fields')
    expect(mockSendMail).not.toHaveBeenCalled()
  })

  it('returns 400 for invalid email format', async () => {
    const invalidEmailData = {
      name: 'John Doe',
      email: 'invalid-email',
      subject: 'Test Subject',
      message: 'This is a test message'
    }

    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify(invalidEmailData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(400)
    expect(responseData.error).toBe('Invalid email format')
    expect(mockSendMail).not.toHaveBeenCalled()
  })

  it('handles nodemailer errors gracefully', async () => {
    const validFormData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'Test Subject',
      message: 'This is a test message'
    }

    // Mock nodemailer to throw an error
    mockSendMail.mockRejectedValue(new Error('SMTP connection failed'))

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify(validFormData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(500)
    expect(responseData.error).toBe('Failed to process your request')
    expect(consoleSpy).toHaveBeenCalledWith('Error processing contact form:', expect.any(Error))

    consoleSpy.mockRestore()
  })

  it('validates individual required fields', async () => {
    const testCases = [
      { name: '', email: 'test@test.com', subject: 'Test', message: 'Test' },
      { name: 'Test', email: '', subject: 'Test', message: 'Test' },
      { name: 'Test', email: 'test@test.com', subject: '', message: 'Test' },
      { name: 'Test', email: 'test@test.com', subject: 'Test', message: '' }
    ]

    for (const testData of testCases) {
      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(testData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(400)
      expect(responseData.error).toBe('Missing required fields')
    }
  })

  it('accepts valid email formats', async () => {
    const validEmails = [
      'user@example.com',
      'user.name@example.com',
      'user+label@example.co.uk',
      'user123@sub.example.org'
    ]

    for (const email of validEmails) {
      const validFormData = {
        name: 'Test User',
        email: email,
        subject: 'Test Subject',
        message: 'Test message'
      }

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(validFormData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      
      expect(response.status).toBe(200)
    }
  })

  it('rejects invalid email formats', async () => {
    const invalidEmails = [
      'invalid-email',
      '@example.com',
      'user@',
      'user.example.com',
      'user space@example.com'
    ]

    for (const email of invalidEmails) {
      const invalidFormData = {
        name: 'Test User',
        email: email,
        subject: 'Test Subject',
        message: 'Test message'
      }

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(invalidFormData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(400)
      expect(responseData.error).toBe('Invalid email format')
    }
  })

  it('handles malformed JSON gracefully', async () => {
    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: 'invalid json',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(500)
    expect(responseData.error).toBe('Failed to process your request')
  })
})