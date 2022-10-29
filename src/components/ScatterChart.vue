<template>
    <div
        class="timeline"
        :style="{
            width: `${props.width}px`,
            height: `${props.height}px`,
        }"
    >
        <div class="container">
            <div
                class="line"
                :style="{ left: `${data.left}px` }"
                v-for="data in axisData"
            ></div>
            <canvas
                ref="canvas"
                :width="props.width"
                :height="props.height - BOTTOM_HEIGHT"
            ></canvas>
        </div>
        <div
            class="text"
            :style="{ left: `${data.left - 13}px` }"
            v-for="data in axisData"
        >
            {{ data.text }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { scaleTime } from 'd3-scale';

const BOTTOM_HEIGHT = 50;

const props = defineProps<{
    width: number;
    height: number;
}>();

const canvas = ref<HTMLCanvasElement>();
const axisData = ref<
    {
        left: number;
        text: string;
        date: Date;
    }[]
>([]);

const formatFunc = (value: number) => `${value < 10 ? '0' + value : value}`;
const scaleFunc = scaleTime().range([0, props.width]);

const updateAxisData = () => {
    const now = Date.now();
    const start = new Date(now - 1000 * 60); // 1분 전
    const end = new Date(now);
    scaleFunc.domain([start, end]);

    axisData.value = scaleFunc.ticks(6).map((date) => {
        return {
            left: scaleFunc(date),
            text: `${formatFunc(date.getHours())}:${formatFunc(
                date.getMinutes()
            )}:${formatFunc(date.getSeconds())}`,
            date,
        };
    });
};

onMounted(() => {
    if (!canvas.value) return;

    const offscreen = canvas.value.transferControlToOffscreen();

    const worker = new Worker(
        new URL('../workers/ScatterChart.ts', import.meta.url),
        { type: 'module' }
    );

    updateAxisData();
    worker.postMessage(
        {
            canvas: offscreen,
            width: props.width,
            height: props.height - BOTTOM_HEIGHT,
            domain: scaleFunc.domain(),
        },
        [offscreen]
    );

    setInterval(() => {
        updateAxisData();
        worker.postMessage(
            {
                width: props.width,
                height: props.height - BOTTOM_HEIGHT,
                domain: scaleFunc.domain(),
            },
            []
        );
    }, 1000);
});
</script>

<style scoped>
.timeline {
    position: relative;
}

.timeline > .container {
    position: relative;
    width: 100%;
    height: calc(100% - 50px);
    border: 1px solid #dcdcdc;
}

.timeline > .container > .line {
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: #dcdcdc;
    opacity: 0.5;
}

.timeline > .container > .line > span {
    position: absolute;
    font-size: 11px;
    top: 12px;
    left: 6px;
}

.timeline > .text {
    position: absolute;
    bottom: 32px;
    color: #1c1c1c;
    font-size: 11px;
}
</style>
