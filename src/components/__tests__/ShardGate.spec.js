/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ShardGate from '../ShardGate.vue'

const defaultProps = {
    propsData: {
        gateNum: 1
    }
}

describe('ShardGate', () => {
    it('renders properly', () => {
        const wrapper = mount(ShardGate, defaultProps)
        expect(wrapper.get('label').text()).toContain('1')
    })

    it('starts with a valid initial value', () => {
        const wrapper = mount(ShardGate, defaultProps)
        expect(wrapper.get('option:checked').text()).toBe('0')
    })

    it('changing the value works as expected', async () => {
        const wrapper = mount(ShardGate, defaultProps)
        expect(wrapper.get('option:checked').text()).toBe('0')
        
        await wrapper.find('option[value="5"]').setSelected()
        
        expect(wrapper.find('option:checked').element.value).toBe('5')
    })
})
