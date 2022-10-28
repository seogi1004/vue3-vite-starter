import { scaleLinear } from 'd3-scale';
import draw from './DrawTest';

self.onmessage = (e) => {
    const { canvas, width, height } = e.data;
    const ctx = canvas.getContext('2d');
    const xFunc = scaleLinear().domain([0, 100]).range([0, 10]);

    draw(ctx, width, height);
};
