import type { TransactionData } from '../types/ApiData';
import { API_URL, API_TOKEN } from '../constants';
import draw from '../renderers/ScatterChart';

let context: CanvasRenderingContext2D;
let isLoading = false;

self.onmessage = (e) => {
    if (!context) context = e.data.canvas.getContext('2d');
    const { width, height, domain } = e.data;

    if (!isLoading) {
        isLoading = true;

        fetch(
            `${API_URL}/transaction/time?token=${API_TOKEN}&domain_id=7908&start_time=${domain[0].getTime()}&end_time=${domain[1].getTime()}`
        )
            .then((res) => {
                res.json().then((res) => {
                    draw(
                        context,
                        width,
                        height,
                        domain,
                        res.result as TransactionData[]
                    );
                });
            })
            .finally(() => {
                isLoading = false;
            });
    }
};
