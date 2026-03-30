import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    const result = cn('text-red-500', 'bg-blue-500')
    expect(result).toContain('text-red-500')
    expect(result).toContain('bg-blue-500')
  })

  it('handles conditional classes', () => {
    const isActive = true
    const result = cn('base-class', isActive && 'active-class')
    expect(result).toContain('base-class')
    expect(result).toContain('active-class')
  })

  it('handles false conditions gracefully', () => {
    const isActive = false
    const result = cn('base-class', isActive && 'active-class')
    expect(result).toContain('base-class')
    expect(result).not.toContain('active-class')
  })

  it('merges conflicting tailwind classes correctly', () => {
    const result = cn('text-red-500 text-blue-500')
    expect(result).toBe('text-blue-500')
  })

  it('handles empty inputs', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('handles object class conditions', () => {
    const isDisabled = false
    const result = cn('base', { 'disabled-class': isDisabled, 'enabled-class': !isDisabled })
    expect(result).toContain('base')
    expect(result).toContain('enabled-class')
    expect(result).not.toContain('disabled-class')
  })
})
