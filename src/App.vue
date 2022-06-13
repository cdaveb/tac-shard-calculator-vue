<script setup>
import ShardCalculator from './components/ShardCalculator.vue'
</script>

<template>
  <header>
    <h1>Enlightenment Shard Calculator</h1>
    <p>Configure the desired <a href="https://thealchemistcode.fandom.com/wiki/Enlightenment">enlightenment</a> for the unit and the number of shards required will be displayed.</p>
    <p><strong>Note:</strong> You must have at least 2 points in each gate to progress to the next gate.</p>
  </header>

  <main>
    <ShardCalculator />
  </main>
</template>

<style>
</style>
