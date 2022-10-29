import { useState } from "react";

export function GameStateWrapper() {
    const [clients, setClients] = useState([]);

    const ws = new WebSocket("wss://ws.bitstamp.net");

    const apiCall = {
        event: "bts:subscribe",
        data: { channel: "order_book_btcusd" },
    };

    ws.onopen = (event) => {
        ws.send(JSON.stringify(apiCall));
    };

    ws.onmessage = function (event) {
        const json = JSON.parse(event.data);
        try {
            if ((json.event = "data")) {
                setBids(json.data.bids.slice(0, 5));
            }
        } catch (err) {
            console.log(err);
        }
    };

    //map the first 5 bids
    const firstBids = bids.map((item) => {
        return (
            <div>
                <p> {item}</p>
            </div>
        );
    });

    return <div>{firstBids}</div>;
}
