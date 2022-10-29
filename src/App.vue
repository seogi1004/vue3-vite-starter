<template>
    <div class="app">
        <div class="top">
            <equalizer-chart :width="500" :height="300"></equalizer-chart>
            <scatter-chart :width="500" :height="300"></scatter-chart>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ScatterChart from './components/ScatterChart.vue';
import EqualizerChart from './components/EqualizerChart.vue';
</script>

<style scoped>
.app .top {
    display: flex;
}
</style>
