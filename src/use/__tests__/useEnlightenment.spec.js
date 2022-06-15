/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, test } from 'vitest'
import useEnlightenment from '../useEnlightenment.js'
const { gateValues, gateKey, maxGateSteps, handleUpdatedGateValue } = useEnlightenment();

/*
describe('ShardCalculator', () => {
  it('renders properly', () => {
    const wrapper = mount(ShardCalculator)
    expect(wrapper.text()).toContain('Enlightenment Gates')
  })
})
*/

test('initial gate values correct', () => {
    expect(gateValues['gate_1']).toBe(0)
})
