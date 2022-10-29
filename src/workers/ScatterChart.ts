import type { TransactionData } from '../types/ApiData';
import { API_URL, API_TOKEN } from '../constants';
import draw from '../renderers/ScatterChart';

let context: CanvasRenderingContext2D;

function render(
    rate: number,
    width: number,
    height: number,
    domain: [Date, Date]
) {
    fetch(
        `${API_URL}/transaction/time?token=${API_TOKEN}&domain_id=7908&start_time=${domain[0].getTime()}&end_time=${domain[1].getTime()}`
    ).then((res) => {
        res.json().then((res) => {
            draw(
                context,
                rate,
                width,
                height,
                domain,
                res.result as TransactionData[]
            );

            const now = Date.now();
            render(rate, width, height, [
                new Date(now - 1000 * 60),
                new Date(now),
            ]);
        });
    });
}
self.onmessage = (e) => {
    if (!context) context = e.data.canvas.getContext('2d');
    const { rate, width, height, domain } = e.data;

    render(rate, width, height, domain);
};
