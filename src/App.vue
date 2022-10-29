<template>
    <div class="app" :style="{ paddingTop: `${paddingTop}px` }">
        <div class="top">
            <div class="chart">
                <div class="title">Canvas</div>
                <equalizer-chart
                    :width="CHART_WIDTH"
                    :height="CHART_HEIGHT"
                ></equalizer-chart>
            </div>

            <div class="chart">
                <div class="title">Offscreen Canvas (Sync)</div>
                <scatter-chart
                    :width="CHART_WIDTH"
                    :height="CHART_HEIGHT"
                    :use-worker="false"
                ></scatter-chart>
            </div>
            <div class="chart">
                <div class="title">Offscreen Canvas (Async)</div>
                <scatter-chart
                    :width="CHART_WIDTH"
                    :height="CHART_HEIGHT"
                    :use-worker="true"
                ></scatter-chart>
            </div>
        </div>
        <div class="tools">
            <button @click="onBlockMainThread" :disabled="isBlocked">
                <template v-if="isBlocked">Main thread is busy...</template>
                <template v-else>Block the main thread </template>
            </button>
            <input
                type="number"
                v-model="blockingTime"
                :step="1000"
                :disabled="isBlocked"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import ScatterChart from './components/ScatterChart.vue';
import EqualizerChart from './components/EqualizerChart.vue';

const CHART_WIDTH = 400;
const CHART_HEIGHT = 300;

const paddingTop = computed(() => {
    return window.innerHeight / 2 - CHART_HEIGHT / 2;
});

const blockingTime = ref(3000);
const isBlocked = ref(false);

const onBlockMainThread = () => {
    isBlocked.value = true;
    setTimeout(() => {
        let time = Date.now();
        while (Date.now() - time <= blockingTime.value) {}
        isBlocked.value = false;
    }, 100);
};
</script>

<style scoped>
.app {
    position: relative;
    text-align: center;
}
.app > .top {
    display: inline-flex;
}
.app > .top > .chart {
    margin-right: 8px;
}
.app > .top > .chart > .title {
    font-weight: bold;
    margin-bottom: 4px;
}
.app > .tools {
    position: absolute;
    left: 24px;
    top: 24px;
}
.app > .tools > button {
    margin-right: 1px;
}
</style>
