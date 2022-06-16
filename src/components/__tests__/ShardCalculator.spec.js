/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ShardCalculator from '../ShardCalculator.vue'

const totalShardsSelector = '#total-shards-display'

describe('ShardCalculator', () => {
    it('renders properly', () => {
        const wrapper = mount(ShardCalculator)
        expect(wrapper.get('legend').text()).toBe('Enlightenment Gates')
    })

    it('initial shard values are set correctly', () => {
        const wrapper = mount(ShardCalculator)
        expect(wrapper.get(totalShardsSelector).text()).toBe('0')
    })

    it('maxing gate values works as expected', async () => {
        const wrapper = mount(ShardCalculator)

        await wrapper.get('#max_all_gates').trigger('click')        
        expect(wrapper.get(totalShardsSelector).text()).toBe('770')
    })

    it('clearing gate values works as expected', async () => {
        const wrapper = mount(ShardCalculator)
        
        await wrapper.get('#max_all_gates').trigger('click')
        expect(wrapper.get(totalShardsSelector).text()).toBe('770')

        await wrapper.get('#clear_all_gates').trigger('click')
        expect(wrapper.get(totalShardsSelector).text()).toBe('0')
    })

    it('should show correct total count after setting the config to 2/0', async () => {
        const wrapper = mount(ShardCalculator)

        await wrapper.find('#gateSelect1 option[value="2"]').setSelected();
        expect(wrapper.get(totalShardsSelector).text()).toBe('15')
    })

    it('should show correct total shards after setting the config to 2/2/2/2/5/0', async () => {
        const wrapper = mount(ShardCalculator)

        await wrapper.find('#gateSelect5 option[value="5"]').setSelected();
        expect(wrapper.get(totalShardsSelector).text()).toBe('160')
    })

    it('should show correct total shards after setting the config to 2/5/2/2/5/0', async () => {
        const wrapper = mount(ShardCalculator)

        await wrapper.find('#gateSelect5 option[value="5"]').setSelected();
        expect(wrapper.get(totalShardsSelector).text()).toBe('160')

        await wrapper.find('#gateSelect2 option[value="5"]').setSelected();
        expect(wrapper.get(totalShardsSelector).text()).toBe('245')
    })

    it('should show correct total shards after maxing shards then setting the 4th gate to 1 (5/5/5/1/0/0/0)', async () => {
        const wrapper = mount(ShardCalculator)

        await wrapper.get('#max_all_gates').trigger('click')
        expect(wrapper.get(totalShardsSelector).text()).toBe('770')

        await wrapper.find('#gateSelect4 option[value="1"]').setSelected();
        expect(wrapper.get(totalShardsSelector).text()).toBe('275')
    })
})
