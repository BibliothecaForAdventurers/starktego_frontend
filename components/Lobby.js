import { useEffect, useState } from "react"

export function Lobby( {players, activeTurnIndex}) {
    console.log(players)
    return  (
        <div className="h-full p-3 mt-4">
            <h4>Players registered</h4>
            {players.map((player, index) => <div key={index}>{player}</div>)}
        </div>
    )
}