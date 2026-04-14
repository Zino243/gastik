import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import Login from '@/app/Login/login'

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
}))

describe('Login Component', () => {
    it('renders without crashing', () => {
        const { container } = render(<Login />)
        expect(container).toBeDefined()
    })

    it('renders the component structure', () => {
        const { container } = render(<Login />)
        expect(container.querySelector('form')).toBeDefined()
    })
})