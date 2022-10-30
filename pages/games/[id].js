import { useEffect, useRef, useState } from 'react';
import { Battlefield } from '../../components/Battlefield';
import { Head } from '../../components/Head'
import { Lobby } from '../../components/Lobby'
import { Setup } from '../../components/Setup'
import { Popover } from '@headlessui/react'

import { getLocation, getMoveableLocations, setLocation } from '../../components/utils'


export default function Game() {
    // board
    const [boardData, setBoardData] = useState(
        Array.from(Array(20), () => {
            return new Array(20).fill("fog")
        })
    )
    const [players, setPlayers] = useState([1, 2, 3]);
    const [playerPos, setPlayerPos] = useState([0, 0]);
    const [stage, setStage] = useState("lobby");

    const ws = useRef(null);

    const setNewItemOnBoard = (entity, newPos)=>{
        let newState = [...boardData];
        newState[newPos[0]][newPos[1]] = entity
        setBoardData(newState)
    }

    const revealCell = (revealedCells) => {
        for (let i = 0; i < revealedCells.length; i++) {

            setNewItemOnBoard("scouted", [revealedCells[i].x,revealedCells[i].y])

        }
    }



    const updatePlayerPosition = (newPos) => {

        // clear old position
        setNewItemOnBoard("scouted", playerPos)

        setPlayerPos(newPos)

        setNewItemOnBoard("player", newPos)

    }


    async function CellClickCallback(row, col, value) {
        let boardDataCopy = [...boardData]
        boardDataCopy[row][col] = value
        if (stage === "lobby") {
            updatePlayerPosition([row, col])
        
        }
        else {
            updatePlayerPosition([row, col])
            setLocation(id, playerId, [row, col])
        }
        const locationCoordinates = await getMoveableLocations(1, 1)

        revealCell(locationCoordinates)
        console.log(`you clicked ${row} ${col}`)
    }
    const lobbyId = 1

    const setAndSendLocation = async (playerId, gameId, position) => {
        

        try {
            await setLocation(playerId, gameId, position)
        } catch(e) {
            console.log(e)
        } finally {
            const locationCoordinates = await getMoveableLocations(1, 1)
            revealCell(locationCoordinates)
        }
        
    }

    const wsUrl = "ws://127.0.0.1:8000/channels"
    const clientSecret = Math.floor(Math.random() * 50);


    useEffect(() => {
        revealCell([{ x: 0, y: 0 }])
        ws.current = new WebSocket(`${wsUrl}/${clientSecret}`);
        ws.current.onopen = () => {
            ws.current.send(JSON.stringify({
                call: "add_client",
                data: {
                    unitType: 0,
                    clientSecret: clientSecret,
                },
            }))
        };
        ws.current.onclose = () => console.log("ws closed");
        ws.current.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log(dataFromServer)
            if (dataFromServer.call === "updateLobby") {
                setPlayers(dataFromServer.data)
            }
        }
        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };
    }, []);

    return (
        <div className=" to-black h-screen bg-dungeon bg-cover flex justify-start w-full">
            <Head />
            <div className='absolute w-full h-full p-10'>
                <div className='p-2 bg-black text-white w-32'><Setup /><Lobby players={players} /></div>
                <div className='p-3'>
                    <h3>Selected location - {playerPos[0]}, {playerPos[1]}</h3>


                    <button onClick={() => setAndSendLocation(1, 1, playerPos)} className='text-xl px-2 py-1 rounded bg-black'>Move here </button>
                </div>
            </div>
            <Battlefield data={boardData} callback={CellClickCallback} playerPos={playerPos} />
        </div>
    )
}