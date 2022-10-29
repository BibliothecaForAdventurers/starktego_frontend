import fogBlock from "../assets/fog.png"
import playerBlock from "../assets/player.png"
import scoutedBlock from "../assets/scouted.png"

export function Cell({ type, row, col, callback, playerPos }) {

    function isCurrent(row, col, playerPos) {
        if (row == playerPos[0] && col == playerPos[1]) {
            return true
        }
        return false
    }

    let img = ""
    switch (type) {
        case "fog":
            img = fogBlock;
            break;
        case "player":
            img = playerBlock;
            break;
        case "scouted":
            img = scoutedBlock;
            break;
    }
    return (
        <button className={isCurrent(row, col, playerPos) ? "bg-blue-100" : ""} onClick={() => callback(row, col, type)}>
            <img
                className="hover:bg-sky-700"
                src={img.src}
            />
        </button>
    )
}