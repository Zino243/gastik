import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DayCard } from '@/app/components/dayCard'
import type { subscription } from '@/app/lib/subscription'

vi.mock('../../public/placeholder.png', () => ({
  default: { src: '/placeholder.png' },
}))

const mockSubscription: subscription = {
  name: 'Netflix',
  nextPay: [15],
  color: '#ff1b18',
  cost: 15.99,
}

describe('DayCard Component', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('renders the day number', () => {
    render(<DayCard day={15} />)
    expect(screen.getByText('15')).toBeDefined()
  })

  it('renders with subscriptions indicators', () => {
    render(<DayCard day={15} subscriptions={[mockSubscription]} />)
    const indicators = document.querySelectorAll('.rounded-full')
    expect(indicators.length).toBeGreaterThan(0)
  })

  it('applies primary border when day is today', () => {
    const today = new Date()
    vi.setSystemTime(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0))
    
    render(<DayCard day={today.getDate()} />)
    const dayCard = document.querySelector('.border-primary')
    expect(dayCard).toBeDefined()
  })

  it('applies input border when day is not today', () => {
    const today = new Date()
    const notToday = today.getDate() === 1 ? 2 : 1
    
    vi.setSystemTime(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0))
    
    render(<DayCard day={notToday} />)
    const dayCard = document.querySelector('.border-input')
    expect(dayCard).toBeDefined()
  })

  it('displays correct number of subscription dots', () => {
    const subscriptions: subscription[] = [
      { name: 'Netflix', nextPay: [15], color: '#ff1b18', cost: 15 },
      { name: 'Spotify', nextPay: [15], color: '#1db954', cost: 10 },
      { name: 'Disney+', nextPay: [15], color: '#113ccf', cost: 8.99 },
    ]
    
    render(<DayCard day={15} subscriptions={subscriptions} />)
    const dots = document.querySelectorAll('.rounded-full.w-2.h-2')
    expect(dots.length).toBe(3)
  })

  it('handles empty subscriptions array', () => {
    render(<DayCard day={10} subscriptions={[]} />)
    expect(screen.getByText('10')).toBeDefined()
  })

  it('handles undefined subscriptions', () => {
    render(<DayCard day={20} subscriptions={undefined} />)
    expect(screen.getByText('20')).toBeDefined()
  })
})
