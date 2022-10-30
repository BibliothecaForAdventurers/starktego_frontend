import { Cell } from "./Cell"

export function Battlefield({ data, callback, playerPos }) {
    return (
        <div className="grid grid-cols-20 absolute grid-position">
            {data.map((row, rowIndex) =>
                row.map((cell, colIndex) =>
                    <Cell 
                        key={`${rowIndex}${colIndex}`}
                        type={cell}
                        row={rowIndex}
                        col={colIndex}
                        callback={callback}
                        playerPos={playerPos}
                    />
                )
            )}
        </div>
    )
}