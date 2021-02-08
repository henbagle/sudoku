import React, {useMemo} from 'react';
import Cell from "./Cell"
import {colMates, rowMates, gridOffMates} from "../../logic/sudokuLib";

// SudokuGrid - Stateless component
// Manages CSS Grid, breaks out GameState into Cell components

const SudokuGrid = ({gameState, selected, selectCell, tryInputNumber}) => {
    // const mates = {
    //     col: colMates(selected).map((el) => (JSON.stringify(el))),
    //     row: rowMates(selected).map((el) => (JSON.stringify(el))),
    //     grid: gridOffMates(selected).map((el) => (JSON.stringify(el)))
    // }
    return (
        <div className="grid grid-cols-9 gap-0 border-2 border-gray-700">

            {gameState.cells.map((cell, i) => {

                let color = ""
                // if (mates.col.includes(JSON.stringify(el.coords))) color="col";
                // if (mates.row.includes(JSON.stringify(el.coords))) color="row";
                // if (mates.grid.includes(JSON.stringify(el.coords))) color="grid";
                
                return (
                <Cell 
                    key={i} 
                    selected={(cell.coord.index === selected)} 
                    onFocus={() => {selectCell(cell.coord.index)}} 
                    tryInputNumber={(e) => {tryInputNumber(e, cell.coord)}}
                    color={color}
                    {...cell} 
                />)}
            )}

        </div>
    );
}
 
export default SudokuGrid;