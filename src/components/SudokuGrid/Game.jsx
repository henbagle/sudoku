import React, {useState, useReducer} from 'react';
import SudokuGrid from "./SudokuGrid";
import {emptyGrid} from "../../logic/generateGrid";
import gameReducer from "../../logic/gameReducer";

const Game = (props) => {
    const [gridState, dispatch] = useReducer(gameReducer, emptyGrid())
    const [selected, setSelected] = useState({r:null, c:null})

    return ( 
    <div className="">
        <SudokuGrid 
            gridState={gridState} 
            selected={selected} 
            selectCell={(c) => {setSelected(c)}}
            tryInputNumber={(e, coords) => {
                dispatch({type: "INPUT_NUMBER", value:e.target.value, coords:coords})
            }}/>

        <pre className="mt-3 text-sm">
            {(selected.r != null ? JSON.stringify(gridState[selected.r][selected.c]): null)}
        </pre>
    </div> );
}
 
export default Game;
