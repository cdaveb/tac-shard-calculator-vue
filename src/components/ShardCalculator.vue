<script setup>
import useEnlightenment from '../use/useEnlightenment';
const { numGates, maxAllGates, resetAllGates, getTotalShards } = useEnlightenment();
</script>

<script>
import ShardGate from './ShardGate.vue'
export default {
    components: {
        ShardGate
    },
}
</script>

<template>
    <div id="shard-calculator">
        <div id="calculator-container">
            <fieldset className="shard-select-container">
                <legend key="gateListLegend">
                    Enlightenment Gates
                </legend>
                
                <ShardGate 
                    v-for="n in numGates" 
                    :key="n"
                    :gate-num="n" 
                />
            </fieldset>
            <section class="total-shards-container">
                <h2>Total Shards</h2>
                <p 
                    id="total-shards-display"
                    aria-live="polite"
                >
                    {{ getTotalShards() }}
                </p>
            </section>
        </div>
        <div class="gate-options">
            <button 
                id="max_all_gates" 
                @click="maxAllGates()"
            >
                Max All Gates
            </button>
            <button
                id="clear_all_gates"
                @click="resetAllGates()"
            >
                Clear All Gates
            </button>
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
