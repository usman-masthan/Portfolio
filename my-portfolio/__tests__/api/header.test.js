import { NextRequest } from 'next/server'
import { GET } from '../../../app/api/header/route'

// Mock the database connection and model
jest.mock('../../../lib/dbConnect')
jest.mock('../../../models/Header')

import dbConnect from '../../../lib/dbConnect'
import Header from '../../../models/Header'

describe('/api/header', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  it('returns header data successfully', async () => {
    const mockHeaderData = {
      _id: '507f1f77bcf86cd799439011',
      logo: 'My Portfolio',
      navigation: [
        { label: 'About', href: '/about', isExternal: false },
        { label: 'Portfolio', href: '/portfolio', isExternal: false },
        { label: 'Blog', href: '/blog', isExternal: false },
        { label: 'Contact', href: '/contact', isExternal: false }
      ],
      ctaButton: {
        label: 'Get In Touch',
        href: '/contact'
      }
    }

    // Mock successful database connection
    dbConnect.mockResolvedValue(true)
    
    // Mock successful header retrieval
    Header.findOne.mockResolvedValue(mockHeaderData)

    const response = await GET()
    const responseData = await response.json()

    expect(dbConnect).toHaveBeenCalledTimes(1)
    expect(Header.findOne).toHaveBeenCalledWith({})
    expect(response.status).toBe(200)
    expect(responseData).toEqual(mockHeaderData)
  })

  it('returns 404 when header is not found', async () => {
    // Mock successful database connection
    dbConnect.mockResolvedValue(true)
    
    // Mock no header found
    Header.findOne.mockResolvedValue(null)

    const response = await GET()
    const responseData = await response.json()

    expect(dbConnect).toHaveBeenCalledTimes(1)
    expect(Header.findOne).toHaveBeenCalledWith({})
    expect(response.status).toBe(404)
    expect(responseData.error).toBe('Header not found')
  })

  it('handles database connection errors', async () => {
    // Mock database connection failure
    dbConnect.mockRejectedValue(new Error('Database connection failed'))

    const response = await GET()
    const responseData = await response.json()

    expect(dbConnect).toHaveBeenCalledTimes(1)
    expect(response.status).toBe(500)
    expect(responseData.error).toBe('Database connection failed')
  })

  it('handles database query errors', async () => {
    // Mock successful database connection
    dbConnect.mockResolvedValue(true)
    
    // Mock database query error
    Header.findOne.mockRejectedValue(new Error('Query failed'))

    const response = await GET()
    const responseData = await response.json()

    expect(dbConnect).toHaveBeenCalledTimes(1)
    expect(Header.findOne).toHaveBeenCalledWith({})
    expect(response.status).toBe(500)
    expect(responseData.error).toBe('Query failed')
  })

  it('returns proper header structure', async () => {
    const mockHeaderData = {
      _id: '507f1f77bcf86cd799439011',
      logo: 'Test Logo',
      navigation: [
        {
          label: 'Home',
          href: '/',
          isExternal: false
        },
        {
          label: 'External Link',
          href: 'https://external.com',
          isExternal: true
        }
      ],
      ctaButton: {
        label: 'Contact Me',
        href: '/contact'
      }
    }

    dbConnect.mockResolvedValue(true)
    Header.findOne.mockResolvedValue(mockHeaderData)

    const response = await GET()
    const responseData = await response.json()

    expect(response.status).toBe(200)
    expect(responseData).toHaveProperty('logo')
    expect(responseData).toHaveProperty('navigation')
    expect(responseData).toHaveProperty('ctaButton')
    expect(responseData.logo).toBe('Test Logo')
    expect(responseData.navigation).toHaveLength(2)
    expect(responseData.navigation[0]).toHaveProperty('label')
    expect(responseData.navigation[0]).toHaveProperty('href')
    expect(responseData.navigation[0]).toHaveProperty('isExternal')
    expect(responseData.ctaButton).toHaveProperty('label')
    expect(responseData.ctaButton).toHaveProperty('href')
  })

  it('handles empty navigation array', async () => {
    const mockHeaderData = {
      _id: '507f1f77bcf86cd799439011',
      logo: 'Test Logo',
      navigation: [],
      ctaButton: {
        label: 'Contact',
        href: '/contact'
      }
    }

    dbConnect.mockResolvedValue(true)
    Header.findOne.mockResolvedValue(mockHeaderData)

    const response = await GET()
    const responseData = await response.json()

    expect(response.status).toBe(200)
    expect(responseData.navigation).toEqual([])
  })

  it('handles various error types gracefully', async () => {
    const errorTypes = [
      new TypeError('Invalid type'),
      new ReferenceError('Reference error'),
      new SyntaxError('Syntax error'),
      { message: 'Custom error object' }
    ]

    for (const error of errorTypes) {
      dbConnect.mockRejectedValue(error)

      const response = await GET()
      const responseData = await response.json()

      expect(response.status).toBe(500)
      expect(responseData).toHaveProperty('error')
    }
  })
})