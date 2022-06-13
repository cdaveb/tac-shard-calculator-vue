<script>
import { maxGateSteps } from '../data/gateData.js';

export default {
    emits: ['update:gateVal'],
    data() {
        return {
            maxGateSteps: maxGateSteps
        }
    },
    props: {
        gateNum: {
            type: Number,
            required: true
        },
        gateVal: {
            required: true
        }
    },
    computed: {
        gateKey() {
            return 'gateSelect' + this.gateNum
        },
    },
}
</script>

<template>
    <div class="gate-container">
        <label :for="gateKey">{{gateNum}}</label>
        <select 
            :data-gateid="gateNum"
            :id="gateKey"
            :value="gateVal"
            @input="$emit('update:gateVal', $event.target.value)"
        >
            <option v-for="(value, index) in maxGateSteps + 1" :key="index" :value="index">{{index}}</option>
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
