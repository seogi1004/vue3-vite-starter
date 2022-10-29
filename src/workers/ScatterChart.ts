import draw from '../renderers/ScatterChart';

self.onmessage = (e) => {
    const { canvas, width, height } = e.data;
    const ctx = canvas.getContext('2d');

    draw(ctx, width, height);
};
