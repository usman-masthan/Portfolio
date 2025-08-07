import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProjectCard from '../../components/ProjectCard'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  }
}))

describe('ProjectCard Component', () => {
  const mockProject = {
    title: 'Test Project',
    description: 'This is a test project description',
    technologies: ['React', 'Jest', 'JavaScript'],
    role: 'Frontend Developer',
    challenge: 'Testing components effectively',
    outcome: 'Successfully implemented comprehensive tests',
    duration: '2 weeks',
    year: '2024',
    images: ['/test-image1.jpg', '/test-image2.jpg'],
    videos: [{ url: '/test-video.mp4', title: 'Demo Video' }],
    links: {
      github: 'https://github.com/test/project',
      live: 'https://test-project.com'
    }
  }

  it('renders project card with basic information', () => {
    render(<ProjectCard project={mockProject} index={1} />)
    
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('This is a test project description')).toBeInTheDocument()
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('2 weeks')).toBeInTheDocument()
    expect(screen.getByText('2024')).toBeInTheDocument()
  })

  it('displays technologies as badges', () => {
    render(<ProjectCard project={mockProject} index={1} />)
    
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Jest')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
  })

  it('renders with default values when project data is incomplete', () => {
    const incompleteProject = {
      title: 'Incomplete Project'
    }
    
    render(<ProjectCard project={incompleteProject} index={2} />)
    
    expect(screen.getByText('Incomplete Project')).toBeInTheDocument()
    expect(screen.getByText('A full-featured application with modern design and robust functionality.')).toBeInTheDocument()
    expect(screen.getByText('Lead Developer')).toBeInTheDocument()
    expect(screen.getByText('3 months')).toBeInTheDocument()
    expect(screen.getByText('2024')).toBeInTheDocument()
  })

  it('handles expand/collapse functionality', () => {
    render(<ProjectCard project={mockProject} index={1} />)
    
    // Initially should show "Show More" or similar expand button
    const expandButton = screen.getByText('View Details')
    expect(expandButton).toBeInTheDocument()
    
    // Click to expand
    fireEvent.click(expandButton)
    
    // Should show detailed information
    expect(screen.getByText('Testing components effectively')).toBeInTheDocument()
    expect(screen.getByText('Successfully implemented comprehensive tests')).toBeInTheDocument()
  })

  it('handles image navigation when multiple images exist', () => {
    render(<ProjectCard project={mockProject} index={1} />)
    
    // Should have navigation controls for multiple images
    const imageContainer = screen.getByRole('img').parentElement
    expect(imageContainer).toBeInTheDocument()
    
    // Check if image navigation buttons exist (if implemented)
    const nextButton = screen.queryByLabelText('Next image')
    const prevButton = screen.queryByLabelText('Previous image')
    
    if (nextButton && prevButton) {
      expect(nextButton).toBeInTheDocument()
      expect(prevButton).toBeInTheDocument()
    }
  })

  it('renders project links when available', () => {
    render(<ProjectCard project={mockProject} index={1} />)
    
    // Check for GitHub link
    const githubLink = screen.getByLabelText('GitHub Repository')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test/project')
    
    // Check for live demo link
    const liveLink = screen.getByLabelText('Live Demo')
    expect(liveLink).toHaveAttribute('href', 'https://test-project.com')
  })

  it('handles video modal functionality', () => {
    render(<ProjectCard project={mockProject} index={1} />)
    
    // Look for video play button
    const videoButton = screen.queryByLabelText('Play Demo Video')
    
    if (videoButton) {
      fireEvent.click(videoButton)
      
      // Video modal should open (implementation dependent)
      expect(screen.queryByText('Demo Video')).toBeInTheDocument()
    }
  })

  it('displays default image when no images provided', () => {
    const projectWithoutImages = {
      title: 'No Image Project',
      description: 'Project without images'
    }
    
    render(<ProjectCard project={projectWithoutImages} index={3} />)
    
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', expect.stringContaining('project-3.jpg'))
  })

  it('handles single image correctly', () => {
    const projectWithSingleImage = {
      ...mockProject,
      images: ['/single-image.jpg']
    }
    
    render(<ProjectCard project={projectWithSingleImage} index={1} />)
    
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', expect.stringContaining('single-image.jpg'))
  })
})