/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, test } from 'vitest'
import useEnlightenment from '../useEnlightenment.js'
const { gateValues, gateKey, maxGateSteps, handleUpdatedGateValue, numGates, maxAllGates, resetAllGates, getTotalShards } = useEnlightenment();

test('gateKey returns correct gate key format', () => {
    expect(gateKey(1)).toBe('gate_' + 1)  
})

test('initial gate values correct', () => {
    for (let i = 1; i <= numGates; i++) {
        expect(gateValues[gateKey(i)]).toBe(0)
    }   
})

test('max gates updates all gates to max value', () => {
    maxAllGates();
    for (let i = 1; i <= numGates; i++) {
        expect(gateValues[gateKey(i)]).toBe(maxGateSteps)
    }   
})

test('reset all gates sets all gates to 0', () => {
    maxAllGates();
    resetAllGates();
    for (let i = 1; i <= numGates; i++) {
        expect(gateValues[gateKey(i)]).toBe(0)
    }   
})

test('handle gate value change that requires previous gates to be set to min steps', () => {
    resetAllGates();
    
    let gateNumTest = 5;
    gateValues[gateKey(gateNumTest)] = maxGateSteps;
    handleUpdatedGateValue(gateNumTest);
    
    for (let i = 1; i < gateNumTest; i++) {
        expect(gateValues[gateKey(i)]).toBe(2)
    }   
    expect(gateValues[gateKey(gateNumTest)]).toBe(maxGateSteps)
    for (let i = gateNumTest + 1; i <= numGates; i++) {
        expect(gateValues[gateKey(i)]).toBe(0)
    }
})


test('handle gate value change that requires later gates to be set to 0', () => {
    maxAllGates();
    
    let gateNumTest = 3;
    let gateValTest = 1;
    gateValues[gateKey(gateNumTest)] = gateValTest;
    handleUpdatedGateValue(gateNumTest);
    
    for (let i = 1; i < gateNumTest; i++) {
        expect(gateValues[gateKey(i)]).toBe(maxGateSteps)
    }   
    expect(gateValues[gateKey(gateNumTest)]).toBe(gateValTest)
    for (let i = gateNumTest + 1; i <= numGates; i++) {
        expect(gateValues[gateKey(i)]).toBe(0)
    }
})

test('handle gate value change that does not require adjustments to other gates', () => {
    resetAllGates();

    let gateNumTest = 4;
    let gateValTest = 3;
    maxAllGates();
    gateValues[gateKey(gateNumTest)] = gateValTest;
    handleUpdatedGateValue(gateNumTest);

    for (let i = 1; i < gateNumTest; i++) {
        expect(gateValues[gateKey(i)]).toBe(maxGateSteps)
    }   
    expect(gateValues[gateKey(gateNumTest)]).toBe(gateValTest)
    for (let i = gateNumTest + 1; i <= numGates; i++) {
        expect(gateValues[gateKey(i)]).toBe(maxGateSteps)
    }
})

test('verify total shard count works as expected', () => {
    maxAllGates();
    expect(getTotalShards()).toBe(770);
    
    resetAllGates();
    expect(getTotalShards()).toBe(0);

    // Check 2/2/2/2/5
    gateValues[gateKey(5)] = maxGateSteps;
    handleUpdatedGateValue(5);
    expect(getTotalShards()).toBe(160);
    
    // Check 2/5/2/2/5
    gateValues[gateKey(2)] = maxGateSteps;
    handleUpdatedGateValue(2);
    expect(getTotalShards()).toBe(245);
    
    // Check 2/5/2/2/5/2/5
    gateValues[gateKey(numGates)] = maxGateSteps;
    handleUpdatedGateValue(numGates);
    expect(getTotalShards()).toBe(460);
    
    // Check 2/5/2/2/5/4/5
    gateValues[gateKey(6)] = 4;
    handleUpdatedGateValue(6);
    expect(getTotalShards()).toBe(495);

    // Check 2/0
    gateValues[gateKey(2)] = 0;
    handleUpdatedGateValue(2);
    expect(getTotalShards()).toBe(15);
})
