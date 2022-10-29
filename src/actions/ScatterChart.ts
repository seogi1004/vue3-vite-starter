import type { TransactionData } from '../types/ApiData';
import { API_TOKEN, API_URL } from '../constants';
import draw from '../renderers/ScatterChart';

const fetchAndRender = (
    context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    rate: number,
    width: number,
    height: number,
    domain: [Date, Date],
    callback?: Function
) => {
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
            if (typeof callback === 'function') callback();

            const now = Date.now();
            fetchAndRender(
                context,
                rate,
                width,
                height,
                [new Date(now - 1000 * 60), new Date(now)],
                callback
            );
        });
    });
};

export default fetchAndRender;
