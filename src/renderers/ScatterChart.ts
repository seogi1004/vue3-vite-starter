import type { TransactionData } from '../types/ApiData';
import { scaleTime, scaleLinear } from 'd3-scale';

function getColor(time: number) {
    if (time > 2000 && time <= 4000) return '#7BBAE7';
    if (time > 4000 && time <= 10000) return '#FFC000';
    if (time > 10000) return '#FF7800';
    return '#7977C2';
}

export default function (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    domain: [Date, Date],
    data: TransactionData[]
) {
    const xFunc = scaleTime().domain(domain).range([0, width]);
    const yFunc = scaleLinear().domain([0, 8000]).range([height, 0]);

    ctx.clearRect(0, 0, width, height);
    data.forEach((d) => {
        ctx.beginPath();
        ctx.arc(
            xFunc(new Date(parseInt(d.startTime))),
            yFunc(d.responseTime),
            3,
            0,
            2 * Math.PI
        );
        ctx.strokeStyle = getColor(d.responseTime);
        ctx.stroke();
        ctx.fillStyle = 'transparent';
        ctx.fill();
    });
}
