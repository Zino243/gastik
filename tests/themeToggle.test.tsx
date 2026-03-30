import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { ThemeToggle } from '@/app/components/themeToggle'

const mockSetTheme = vi.fn()

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'dark',
    setTheme: mockSetTheme,
  }),
}))

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the toggle button', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    expect(button).toBeDefined()
  })

  it('shows moon emoji when theme is dark', () => {
    render(<ThemeToggle />)
    expect(screen.getByText('🌙')).toBeDefined()
  })

  it('toggles theme when clicked', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    
    act(() => {
      fireEvent.click(button)
    })
    
    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })

  it('applies correct styling classes', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    expect(button.className).toContain('rounded-full')
    expect(button.className).toContain('bg-secondary')
  })
})
