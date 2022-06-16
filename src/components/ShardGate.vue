<script setup>
import useEnlightenment from '../use/useEnlightenment';
const { gateValues, gateKey, maxGateSteps, handleUpdatedGateValue } = useEnlightenment();
</script>

<script>
export default {
    props: {
        gateNum: {
            type: Number,
            required: true
        },
    },
    computed: {
        gateId() {
            return 'gateSelect' + this.gateNum
        },
    },
}
</script>

<template>
    <div class="gate-container">
        <label :for="gateId">{{ gateNum }}</label>
        <select 
            :id="gateId"
            v-model="gateValues[gateKey(gateNum)]"
            :data-gateid="gateNum"
            @change="handleUpdatedGateValue(gateNum)"
        >
            <option 
                v-for="(value, index) in maxGateSteps + 1"
                :key="index" 
                :value="index"
            >
                {{ index }}
            </option>
        </select>
    </div>
</template>

<style scoped>
.shard-select-container div.gate-container {
    float: left;
}

.shard-select-container label, .shard-select-container select {
    display: flex;
    flex-direction: column;
    margin: 5px;
    text-align: center;
}

.shard-select-container label {
    font-weight: bold;
}
</style>
