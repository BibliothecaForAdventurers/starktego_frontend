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
            img = '/fog.png';
            break;
        case "player":
            img = '/fog.png';
            break;
        case "scouted":
            img = '/fog.png';
            break;
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