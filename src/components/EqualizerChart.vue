<template>
    <div ref="chart"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import graph from 'juijs-chart';
import CanvasEqualizerBrush from 'juijs-chart/src/brush/canvas/equalizercolumn';
import TitleWidget from 'juijs-chart/src/widget/title';
import LegendWidget from 'juijs-chart/src/widget/legend';
import RaycastWidget from 'juijs-chart/src/widget/raycast';
import ClassicTheme from 'juijs-chart/src/theme/classic.js';

graph.use([
    ClassicTheme,
    CanvasEqualizerBrush,
    TitleWidget,
    LegendWidget,
    RaycastWidget,
]);

const animation = graph.include('chart.animation');
const chart = ref();

onMounted(() => {
    if (!chart.value) return;

    const c = animation(chart.value, {
        width: 500,
        height: 300,
        axis: [
            {
                x: {
                    domain: ['1 year ago', '1 month ago', 'Yesterday', 'Today'],
                    line: true,
                },
                y: {
                    type: 'range',
                    domain: [0, 30],
                    // domain : function(d) {
                    //     return Math.max(d.normal, d.warning, d.fatal);
                    // },
                    step: 5,
                    line: false,
                },
            },
        ],
        brush: [
            {
                type: 'canvas.equalizercolumn',
                target: ['normal', 'warning', 'fatal'],
                active: [0, 2],
                error: [0],
                errorText: 'Stopped',
                unit: 10,
            },
        ],
        widget: [
            {
                type: 'title',
                text: 'Equalizer Sample',
            },
            {
                type: 'legend',
                format: function (key) {
                    if (key === 'normal') return 'Default';
                    else if (key === 'warning') return 'Warning';
                    else return 'Critical';
                },
            },
            {
                type: 'raycast',
            },
        ],
        event: {
            'raycast.click': function (obj, e) {
                // TODO: Clicking on the equalizer will give the following effect
                this.updateBrush(0, { active: obj.dataIndex });
            },
        },
        interval: 100,
    });

    c.run(function (runningTime) {
        if (runningTime > 10000) {
            c.update([
                { normal: 7, warning: 7, fatal: 7 },
                { normal: 10, warning: 8, fatal: 5 },
                { normal: 6, warning: 4, fatal: 10 },
                { normal: 5, warning: 5, fatal: 7 },
            ]);
        } else {
            c.update([
                { normal: 5, warning: 5, fatal: 5 },
                { normal: 10, warning: 8, fatal: 5 },
                { normal: 6, warning: 4, fatal: 10 },
                { normal: 5, warning: 5, fatal: 7 },
            ]);
        }
    });
});
</script>

<style scoped></style>