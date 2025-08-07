import { cn } from '../../lib/utils'

describe('cn utility function', () => {
  it('merges single class name', () => {
    const result = cn('text-center')
    expect(result).toBe('text-center')
  })

  it('merges multiple class names', () => {
    const result = cn('text-center', 'bg-blue-500', 'p-4')
    expect(result).toBe('text-center bg-blue-500 p-4')
  })

  it('handles conditional classes with clsx', () => {
    const isActive = true
    const isDisabled = false
    
    const result = cn(
      'base-class',
      {
        'active-class': isActive,
        'disabled-class': isDisabled
      }
    )
    
    expect(result).toBe('base-class active-class')
  })

  it('merges conflicting Tailwind classes correctly', () => {
    // twMerge should handle conflicting classes by keeping the last one
    const result = cn('text-red-500', 'text-blue-500')
    expect(result).toBe('text-blue-500')
  })

  it('handles arrays of classes', () => {
    const result = cn(['text-center', 'bg-red-500'], 'p-4')
    expect(result).toBe('text-center bg-red-500 p-4')
  })

  it('handles undefined and null values', () => {
    const result = cn('text-center', undefined, null, 'p-4')
    expect(result).toBe('text-center p-4')
  })

  it('handles empty strings and falsy values', () => {
    const result = cn('text-center', '', false, 'p-4', 0)
    expect(result).toBe('text-center p-4')
  })

  it('merges complex conflicting Tailwind classes', () => {
    // Test more complex merging scenarios
    const result = cn(
      'px-2 py-1 px-4', // px-4 should override px-2
      'm-2 mx-4',       // mx-4 should override m-2 for horizontal margin
      'text-sm text-lg'  // text-lg should override text-sm
    )
    
    // The exact result depends on tailwind-merge's logic
    expect(result).toContain('px-4')
    expect(result).toContain('text-lg')
  })

  it('works with responsive and state variants', () => {
    const result = cn(
      'text-sm md:text-lg',
      'hover:text-blue-500 hover:text-red-500'
    )
    
    expect(result).toContain('text-sm')
    expect(result).toContain('md:text-lg')
    expect(result).toContain('hover:text-red-500')
  })

  it('handles objects with multiple conditions', () => {
    const props = {
      size: 'large',
      variant: 'primary',
      disabled: false
    }
    
    const result = cn(
      'base-button',
      {
        'btn-sm': props.size === 'small',
        'btn-lg': props.size === 'large',
        'btn-primary': props.variant === 'primary',
        'btn-secondary': props.variant === 'secondary',
        'btn-disabled': props.disabled
      }
    )
    
    expect(result).toBe('base-button btn-lg btn-primary')
  })

  it('returns empty string for no arguments', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('handles nested arrays and objects', () => {
    const result = cn([
      'base-class',
      {
        'conditional-class': true,
        'hidden-class': false
      }
    ], 'additional-class')
    
    expect(result).toBe('base-class conditional-class additional-class')
  })

  it('maintains order for non-conflicting classes', () => {
    const result = cn('first-class', 'second-class', 'third-class')
    expect(result).toBe('first-class second-class third-class')
  })
})