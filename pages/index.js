import { useEffect, useRef, useState } from 'react';
import { Battlefield } from '../components/Battlefield';
import { Head } from '../components/Head'
import { Lobby } from '../components/Lobby'
import { Setup } from '../components/Setup'


export default function Home() {
  // board
  const [boardData, setBoardData] = useState(
    Array(20).fill(0).map(x => Array(20).fill("fog"))
  )
  const [players, setPlayers] = useState([]);
  const [playerPos, setPlayerPos] = useState([0,0]);
  const [stage, setStage] = useState("lobby");

  const ws = useRef(null);

  function CellClickCallback(row, col, value) {
    let boardDataCopy = [...boardData]
    boardDataCopy[row][col] = value
    if (stage === "lobby") {
      setPlayerPos([row, col])
    }
    console.log(`you clicked ${row} ${col}`)
  }

  const wsUrl = "ws://127.0.0.1:8000/channels"
  const clientSecret = Math.floor(Math.random() * 50);
  const lobbyId = 1

  useEffect(() => {
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
    <div className="bg-gradient-to-r from-gray-800 to-black h-screen p-8">
      <Head />
      <div className="grid grid-rows-2 grid-flow-col gap-4 h-full">
        <div className="border-2"><Setup /></div>
        <div className="border-2"><Lobby players={players}/></div>
        <div className="row-span-2 col-span-6 border-2">
          <Battlefield data={boardData} callback={CellClickCallback} playerPos={playerPos}/>
        </div>
      </div>
    </div>
  )
}