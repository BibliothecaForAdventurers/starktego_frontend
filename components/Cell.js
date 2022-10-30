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
        <button className={isCurrent(row, col, playerPos) ? "hover:bg-blue-900/80 bg-blue-900/80 rounded-md" : ""} onClick={() => callback(row, col, type)}>
            <img
                className="hover:bg-blue-900/80 cell-size"
                src={img}
            />
        </button>
    )
}