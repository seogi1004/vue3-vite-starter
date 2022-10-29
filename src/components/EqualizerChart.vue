<template>
    <div ref="chart"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { API_URL, API_TOKEN } from '../constants';
import graph from 'juijs-chart';
import CanvasEqualizerBrush from 'juijs-chart/src/brush/canvas/equalizercolumn';
import ClassicTheme from 'juijs-chart/src/theme/classic';

graph.use([ClassicTheme, CanvasEqualizerBrush]);

const animation = graph.include('chart.animation');
const chart = ref();

const props = defineProps({
    width: Number,
    height: Number,
});

let isLoading = ref(false);

onMounted(() => {
    if (!chart.value) return;

    const chartObj = animation(chart.value, {
        width: props.width,
        height: props.height,
        padding: {
            top: 0,
            left: 0,
            right: 0,
        },
        axis: [
            {
                x: {
                    domain: ['ENV', 'Demian'],
                    line: true,
                },
                y: {
                    type: 'range',
                    domain: function (d) {
                        return d.total * 1.2;
                    },
                    step: 5,
                    line: false,
                    hide: true,
                },
            },
        ],
        brush: [
            {
                type: 'canvas.equalizercolumn',
                target: ['default', 'normal', 'warning', 'fatal'],
                errorText: 'Stopped',
                unit: 10,
            },
        ],
        interval: 100,
    });

    chartObj.run(() => {
        if (!isLoading.value) {
            isLoading.value = true;

            const promises = [];
            [7908, 1003].forEach((domainId) => {
                const promise = fetch(
                    `${API_URL}/realtime/domain?token=${API_TOKEN}&domain_id=${domainId}`
                );
                promises.push(promise);
            });

            Promise.all(promises).then((response) => {
                const jsonPromises = response.map((res) => res.json());

                Promise.all(jsonPromises)
                    .then((jsonData) => {
                        const realtimeData = jsonData.map((data) => {
                            if (data.result.length === 1) {
                                const d = data.result[0];
                                return {
                                    default: d.activeServiceRangeCount0,
                                    normal: d.activeServiceRangeCount1,
                                    warning: d.activeServiceRangeCount2,
                                    fatal: d.activeServiceRangeCount3,
                                    total: d.activeService,
                                };
                            } else {
                                return {
                                    default: 0,
                                    normal: 0,
                                    warning: 0,
                                    fatal: 0,
                                    total: 0,
                                };
                            }
                        });

                        chartObj.update(realtimeData);
                    })
                    .finally(() => {
                        jsonPromises.length = 0;
                        promises.length = 0;
                        isLoading.value = false;
                    });
            });
        }
    });
});
</script>

<style scoped></style>
