import { useEffect, useState } from "react"
import { Walletconnector } from "./WalletConnector";

export function Lobby() {
    const [players, setPlayers] = useState([]);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // fetchPlayers
    });

    return  (
        <div className="h-full">
            <Walletconnector/>
            {players?.map((player) => {
                <span></span>
            })}
        </div>
    )
}