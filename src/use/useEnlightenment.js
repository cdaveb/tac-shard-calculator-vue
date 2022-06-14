import { reactive } from 'vue';
import { numGates, minStepsForNextGate, gateShardCosts, maxGateSteps } from '../data/gateData.js';

const gateValues = reactive({
    'gate_1': 0,
    'gate_2': 0,
    'gate_3': 0,
    'gate_4': 0,
    'gate_5': 0,
    'gate_6': 0,
    'gate_7': 0
});

export function useEnlightenment() {
    // Method to convert a gate number to the appropriate key
    const gateKey = (gateNum) => {
        return 'gate_' + gateNum;
    };

    // Handle any gate value adjustments required when a gate value is updated
    const handleUpdatedGateValue = (gateNum) => {
        for (let i = 1; i < gateNum; i++) {
            let tempKey = gateKey(i)
            if (gateValues[tempKey] < minStepsForNextGate) {
                gateValues[tempKey] = minStepsForNextGate;
            }
        }
        if (gateValues[gateKey(gateNum)] < 2) {
            for (let i = gateNum + 1; i <= numGates; i++) {
                gateValues[gateKey(i)] = 0;
            }
        }
    };
    
    // Updates all gates to the requested value
    const setGatesToValue = (value) => {
        let intValue = parseInt(value);

        for (let key in gateShardCosts) {
            gateValues[key] = intValue;
        }
    };
    
    // Max all gates
    const maxAllGates = () => { setGatesToValue(maxGateSteps) };
    
    // Reset all gates to 0
    const resetAllGates = () => { setGatesToValue(0) };

    // Calculates the total shards from all gates based on the current configuration
    const getTotalShards = () => {
        let total = 0;
        let tempValue = 0;
        for (let key in gateValues) {
            tempValue = parseInt(gateValues[key]);
            if (tempValue <= 0) { continue; }
            // Loop through gate shard costs until you have reached the max gate level specified
            for (let i = 0; i < gateShardCosts[key].length; i++) {
                if (i >= tempValue) { break; }
                total += gateShardCosts[key][i];
            }
        }

        return total;
    };
    
    return {
        gateValues,
        gateKey,
        handleUpdatedGateValue,
        maxAllGates,
        resetAllGates,
        getTotalShards,
        numGates,
        maxGateSteps
    };
}