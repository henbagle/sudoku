import React, {useState, useReducer} from 'react';
import SudokuGrid from "./SudokuGrid";
import {emptyGrid} from "../../logic/generateGrid";
import gridReducer from "../reducer";

const Game = (props) => {
    const [gridState, dispatch] = useReducer(gridReducer, emptyGrid())
    const [selected, setSelected] = useState([])

    return ( 
    <div className="">
        <SudokuGrid 
            gridState={gridState} 
            selected={selected} 
            selectCell={(c) => {setSelected(c)}}
            tryInputNumber={(e, coords) => {
                dispatch({type: "INP", value:e.target.value, coords:coords})
            }}/>

        <pre className="mt-3">
            {(selected.length > 0 ? JSON.stringify(gridState[selected[1]][selected[0]]): null)}
        </pre>
    </div> );
}
 
export default Game;
