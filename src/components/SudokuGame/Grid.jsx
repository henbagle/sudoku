import React from 'react';
import Cell from "./Cell"

// Grid - Stateless component
// Manages CSS Grid, breaks out GameState into Cell components

const Grid = ({gameState, selected, selectCell, tryInputNumber, addPossibleValue}) => {
    return (
        <div className="grid grid-cols-9 gap-0 border-2 border-gray-700">

            {gameState.cells.map((cell, i) => {

                let color = ""
                // Todo: Put this logic in the reducer
                if(gameState.invalidCells.includes(cell))
                {
                    color="red";
                }
                
                return (
                <Cell 
                    key={i} 
                    selected={(cell.coord.index === selected)} 
                    onFocus={() => {selectCell(cell.coord.index)}} 
                    tryInputNumber={(e) => {tryInputNumber(e, cell.coord)}}
                    addPossibleValue={(e) => {addPossibleValue(e, cell.coord)}}
                    color={color}
                    cell={cell}
                />)}
            )}

        </div>
    );
}
 
export default Grid;