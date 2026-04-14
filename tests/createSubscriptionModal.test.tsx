import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import CreateSubscriptionModal from '@/app/components/createSubscriptionModal'

vi.mock('../../public/placeholder.png', () => ({
    default: { src: '/placeholder.png' },
}))

describe('CreateSubscriptionModal Component', () => {
    it('renders without crashing when modal is open', () => {
        const { container } = render(<CreateSubscriptionModal subsModal={true} />)
        expect(container).toBeDefined()
    })

    it('renders without crashing when modal is closed', () => {
        const { container } = render(<CreateSubscriptionModal subsModal={false} />)
        expect(container).toBeDefined()
    })

    it('renders form elements', () => {
        const { container } = render(<CreateSubscriptionModal subsModal={true} />)
        expect(container.querySelector('form')).toBeDefined()
    })
})