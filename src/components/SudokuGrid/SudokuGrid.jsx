import React from 'react';
import Cell from "./Cell"

const SudokuGrid = ({gridState, selected, selectCell, tryInputNumber}) => {
    return (
        <div className="grid grid-cols-9 gap-0 border-2 border-gray-700">

            {gridState.flat().map((el, i) => 
                (<Cell 
                    key={i} 
                    selected={(el.coords === selected)} 
                    onFocus={() => {selectCell(el.coords)}} 
                    tryInputNumber={(e) => {tryInputNumber(e, el.coords)}}
                    {...el} 
                />)
            )}

        </div>
    );
}
 
export default SudokuGrid;