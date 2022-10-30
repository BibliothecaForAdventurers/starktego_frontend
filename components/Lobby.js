import { useEffect, useState } from "react"
import { setPlayerData } from '../components/utils'

export function Lobby( {gameid, players, activeTurnIndex}) {
    return  (
        <div className="h-full p-3 mt-4">
            <h4>Players registered</h4>
            {/* {players.map((player, index) => <div key={index}>{player}</div>)} */}
            <button className="p-2 bg-red-100" onClick={()=> setPlayerData(1, 1, [1,1])}>sign up</button>
        </div>
    )
}