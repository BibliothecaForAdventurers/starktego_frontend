import { useEffect, useState } from "react"

export function Lobby( {players, activeTurnIndex}) {
    console.log(players)
    return  (
        <div className="h-full p-2">
            Players:
            {players.map((player, index) => <div key={index}>{player}</div>)}
        </div>
    )
}