import { describe, it, expect } from 'vitest'

describe('Fetch Module Structure', () => {
    it('f object has auth property', async () => {
        const { f } = await import('@/app/lib/fetch')
        expect(f).toHaveProperty('auth')
    })

    it('f object has subscription property', async () => {
        const { f } = await import('@/app/lib/fetch')
        expect(f).toHaveProperty('subscription')
    })

    it('auth has signUp function', async () => {
        const { f } = await import('@/app/lib/fetch')
        expect(typeof f.auth.signUp).toBe('function')
    })

    it('auth has signIn function', async () => {
        const { f } = await import('@/app/lib/fetch')
        expect(typeof f.auth.signIn).toBe('function')
    })

    it('auth has signOut function', async () => {
        const { f } = await import('@/app/lib/fetch')
        expect(typeof f.auth.signOut).toBe('function')
    })

    it('subscription has get function', async () => {
        const { f } = await import('@/app/lib/fetch')
        expect(typeof f.subscription.get).toBe('function')
    })

    it('subscription has post function', async () => {
        const { f } = await import('@/app/lib/fetch')
        expect(typeof f.subscription.post).toBe('function')
    })

    it('subscription has put function', async () => {
        const { f } = await import('@/app/lib/fetch')
        expect(typeof f.subscription.put).toBe('function')
    })

    it('subscription has delete function', async () => {
        const { f } = await import('@/app/lib/fetch')
        expect(typeof f.subscription.delete).toBe('function')
    })
})