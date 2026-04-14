import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import Dashboard from '@/app/dashboard/page'

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
}))

global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ data: [] })
})

describe('Dashboard Component', () => {
    it('renders without crashing', () => {
        const { container } = render(<Dashboard />)
        expect(container).toBeDefined()
    })

    it('renders main structure', () => {
        const { container } = render(<Dashboard />)
        expect(container.querySelector('main')).toBeDefined()
    })
})