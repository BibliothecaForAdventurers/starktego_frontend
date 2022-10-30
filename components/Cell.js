

export function Cell({ type, row, col, callback, playerPos, moveableLocations }) {
    function isCurrent(row, col, playerPos) {
        if (row == playerPos[0] && col == playerPos[1]) {
            return true
        }
        return false
    }

    let img = ""
    switch (type) {
        case "fog":
            img = '/fog.png';
            break;
        case "player":
            img = '/enemy_down.png';
            break;
        default:
            img = '/scouted.png';
    }
    return (
        <button className={isCurrent(row, col, playerPos) ? "hover:bg-blue-900/80 bg-blue-900/20 rounded-md" : ""} onClick={() => callback(row, col, type)}>
            <div className="absolute opacity-50 p-1">{row}, {col}</div>

            <img
                className="hover:bg-blue-red/20 cell-size"
                src={img}
            />

        </button>
    )
}