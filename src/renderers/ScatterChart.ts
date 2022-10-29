import { scaleLinear } from 'd3-scale';
export default function (
    ctx: OffscreenCanvasRenderingContext2D,
    width: number,
    height: number
) {
    const xFunc = scaleLinear().domain([0, 100]).range([0, 10]);
    console.log(xFunc(50));
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, width, height);
}
