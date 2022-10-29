import { Cell } from "./Cell"

export function Battlefield({ data, callback, playerPos }) {
    return (
        <div className="grid grid-cols-20 gap-1">
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