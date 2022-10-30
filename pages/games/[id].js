import { useEffect, useRef, useState } from 'react';
import { Battlefield } from '../../components/Battlefield';
import { Head } from '../../components/Head'
import { Lobby } from '../../components/Lobby'
import { Setup } from '../../components/Setup'
import { setPlayerData, getLocation, setLocation, getMoveableLocations, getPlayerLocations } from '../../components/utils';
import { useRouter } from 'next/router'


export default function Game() {
    // board
    const [boardData, setBoardData] = useState(
        Array(20).fill(0).map(x => Array(20).fill("fog"))
    )
    const [players, setPlayers] = useState([1, 2, 3]);
    const [playerPos, setPlayerPos] = useState([0, 0]);
    const [playerId, setPlayerId] = useState();
    const [stage, setStage] = useState("lobby");
    const [playerCounter, setPlayerCounter] = useState(1) // used to do some incrementals, prob not needed when we run three separate clients
    const [knownEnemies, setKnownEnemies] = useState([])

    const router = useRouter()
    const { id } = router.query

    async function pushData() {
        const idFromServer = await setPlayerData(
            id, //gameId
            4747+playerCounter, //secret
            playerPos // location
        )
        setPlayerId(idFromServer)
        setPlayerCounter(playerCounter+1)

        if (idFromServer > 1) {
            setStage("running")
        }
    }

    async function getLoc() {
        // get current hash and set as scouted
        const locationResponse = await getLocation(
            id,
            playerId,
        )
        let bd = [...boardData]
        bd[playerPos[0]][playerPos[1]] = locationResponse
        const moveableLocations = await getMoveableLocations(
            id,
            playerId
        )
        for (const loc of moveableLocations){
            const row = loc.x
            const col = loc.y
            bd[row][col] = loc.hash
        }
        setBoardData(bd)
    }

    async function getLocs() {
        // setup params
        var params = [];
        for (const row in boardData){
            for (const col in boardData[row]){
                const r = parseInt(row)
                const c = parseInt(col)
                if (boardData[r][c].length > 16 ){
                    params.push(r*10000+c)
                }
            }
        }
        console.log(id, params)
        // call
        const otherPlayersResponse = await getPlayerLocations(
            id,
            params,
        )
        console.log(otherPlayersResponse)
        setKnownEnemies(otherPlayersResponse)
        console.log(knownEnemies)
    }

    function CellClickCallback(row, col, value) {
        let boardDataCopy = [...boardData]
        boardDataCopy[row][col] = value
        if (stage === "lobby") {
            setPlayerPos([row, col])
        }
        else {
            setPlayerPos([row, col])
            setLocation(id, playerId, [row, col])
        }
        console.log(`you clicked ${row} ${col}`)
        getLoc()
    }

    return (
        <div className=" to-black h-screen bg-dungeon bg-cover flex justify-start w-full">
            <Head />
            <div className='absolute w-full h-full p-10'>
                <div className='p-2 bg-black text-white w-32'>
                    <Setup />
                    <Lobby players={players} />
                    <button onClick={() => pushData()}>push data</button>
                    <br/>
                    <button onClick={() => getLoc()}>get loc</button>
                    <br/>
                    <button onClick={() => getLocs()}>get locs</button>

                </div>
            </div>
            <Battlefield 
                data={boardData}
                callback={CellClickCallback} 
                playerPos={playerPos}
                knownEnemies={knownEnemies} 
            />
        </div>
    )
}