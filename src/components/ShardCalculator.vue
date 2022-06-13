<script>
import { numGates, minStepsForNextGate, gateShardCosts, maxGateSteps } from '../data/gateData.js';
import ShardGate from './ShardGate.vue'

export default {
    components: {
        ShardGate
    },
    data() {
        return {
            numGates: numGates,
            maxGateSteps: maxGateSteps,
            gateValues: {'gate_1': 0, 'gate_2': 0, 'gate_3': 0, 'gate_4': 0, 'gate_5': 0, 'gate_6': 0, 'gate_7':0}
        }
    },
    computed: {
        totalShards() {
            let total = 0;
            let tempValue = 0;
            for (let key in this.gateValues) {
                tempValue = parseInt(this.gateValues[key]);
                if (tempValue <= 0) { continue; }
                // Loop through gate shard costs until you have reached the max gate level specified
                for (let i = 0; i < gateShardCosts[key].length; i++) {
                    if (i >= tempValue) { break; }
                    total += gateShardCosts[key][i];
                }
            }
    
            return total;
        }
    },
    methods: {
        // Generate gate key
        gateKey: function(gateNum) {
            return 'gate_' + gateNum;
        },
        // Create an object which sets all valid gates to the specified value
        setGatesToValue: function(value) {
            let intValue = parseInt(value);
    
            let gateValues = {}
            for (let key in gateShardCosts) {
                this.gateValues[key] = intValue;
            }
        },
        handleGateValueUpdate: function(gateNum) {
            for (let i = 1; i < gateNum; i++) {
                let tempKey = this.gateKey(i)
                if (this.gateValues[tempKey] < minStepsForNextGate) {
                    this.gateValues[tempKey] = minStepsForNextGate;
                }
            }
        }
    }
}
</script>

<template>
    <div id="shard-calculator">
        <div id="calculator-container">
            <fieldset className="shard-select-container">
                <legend key="gateListLegend">Enlightenment Gates</legend>
                
                <ShardGate v-for="n in numGates" :gate-num="n" v-model:gateVal="gateValues['gate_' + n]"  @change="handleGateValueUpdate(n)" />
            </fieldset>
            <section class="total-shards-container">
                <h2>Total Shards</h2>
                <p id="total-shards-display" data-testid="total-shards-display" aria-live="polite">{{totalShards}}</p>
            </section>
        </div>
        <div class="gate-options">
            <button id="max_all_gates" @click="setGatesToValue(maxGateSteps)">Max All Gates</button>
            <button id="clear_all_gates" @click="setGatesToValue(0)">Clear All Gates</button>
        </div>
    </div>
</template>

<style scoped>
#shard-calculator {
    font-family: sans-serif;
}

#calculator-container {
    display: flex;
}

.total-shards-container {
    position: relative;
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    width: 100px;
    margin: 10px;
    height: 100%;
}

.total-shards-container h2 {
    position: absolute;
    top: 0;
    font-size: 16px;
    line-height: 1;
    margin: -8px 0 0;
    background: #fff;
    padding: 0 3px;
}

.total-shards-container p {
    font-size: 24px;
    text-align: center;
    font-weight: 800;
}

.gate-options button {
    margin: 10px 5px;
    display: inline-block;
    outline: none;
    cursor: pointer;
    font-weight: 600;
    border-radius: 5px;
    padding: 6px 12px;
    border: 0;
    color: #fff;
    background: #000a47;
    line-height: 1.1;
    font-size: 14px;
}

.gate-options button:hover, .gate-options button:focus {
    transition: all .1s ease;
    box-shadow: 0 0 0 0 #fff, 0 0 0 3px #1de9b6;
}

.shard-select-container {
    border: 1px solid black;
    border-radius: 5px;
}

.shard-select-container legend {
    font-weight: bold;
    text-align: center;
    font-size: 16px;
}
</style>
