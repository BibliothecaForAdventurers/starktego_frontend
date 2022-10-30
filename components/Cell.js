export function Cell({ type, row, col, callback, playerPos, knownEnemies }) {
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

    for (const enemy of knownEnemies){
        if (img==="/scouted.png" && enemy[0]==row && enemy[1]==col){
            img = "/player_left_attack.png"
        }
    }

    return (
        <button className={isCurrent(row, col, playerPos) ? "hover:bg-blue-900/80 bg-blue-900/80 rounded-md" : ""} onClick={() => callback(row, col, type)}>
            <div className="absolute bg-black">

            </div>
            <img
                className="hover:bg-blue-900/80 cell-size"
                src={isCurrent(row, col, playerPos) ? '/enemy_down.png' : img}
            />
        </button>
    )
}