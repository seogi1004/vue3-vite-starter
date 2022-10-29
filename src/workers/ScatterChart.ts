import fetchANdRender from '../actions/ScatterChart';

let context: CanvasRenderingContext2D;

self.onmessage = (e) => {
    if (!context) context = e.data.canvas.getContext('2d');
    const { rate, width, height, domain } = e.data;
    fetchANdRender(context, rate, width, height, domain);
};
