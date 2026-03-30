import { describe, it, expect } from 'vitest'
import { getTextColor } from '@/lib/asideUtils'

describe('getTextColor utility function', () => {
  it('returns dark text for light colors', () => {
    const result = getTextColor('#ffffff')
    expect(result).toBe('#1e1b18')
  })

  it('returns light text for dark colors', () => {
    const result = getTextColor('#000000')
    expect(result).toBe('#e7e5e4')
  })

  it('handles colors with # prefix', () => {
    const result = getTextColor('#ff0000')
    expect(result).toBe('#e7e5e4')
  })

  it('handles colors without # prefix', () => {
    const result = getTextColor('ff0000')
    expect(result).toBe('#e7e5e4')
  })

  it('returns correct color for yellow (high luminosity)', () => {
    const result = getTextColor('#ffff00')
    expect(result).toBe('#1e1b18')
  })

  it('returns correct color for blue (medium luminosity)', () => {
    const result = getTextColor('#0000ff')
    expect(result).toBe('#e7e5e4')
  })

  it('returns correct color for Netflix red', () => {
    const result = getTextColor('#ff1b18')
    expect(result).toBe('#e7e5e4')
  })

  it('returns correct color for prime green', () => {
    const result = getTextColor('#aaff00')
    expect(result).toBe('#1e1b18')
  })

  it('returns correct color for mid-gray (luminosity = 128)', () => {
    const result = getTextColor('#808080')
    expect(result).toBe('#e7e5e4')
  })

  it('handles lowercase hex colors', () => {
    const result = getTextColor('#aabbcc')
    expect(result).toBe('#1e1b18')
  })

  it('handles uppercase hex colors', () => {
    const result = getTextColor('#FF1B18')
    expect(result).toBe('#e7e5e4')
  })

  it('returns correct color for custom azuza pink', () => {
    const result = getTextColor('#ffAAaa')
    expect(result).toBe('#1e1b18')
  })
})
