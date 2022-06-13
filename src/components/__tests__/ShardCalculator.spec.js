import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ShardCalculator from '../ShardCalculator.vue'

describe('ShardCalculator', () => {
  it('renders properly', () => {
    const wrapper = mount(ShardCalculator)
    expect(wrapper.text()).toContain('Enlightenment Gates')
  })
})
