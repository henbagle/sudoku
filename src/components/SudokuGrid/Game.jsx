import React, {useState, useReducer} from 'react';
import SudokuGrid from "./SudokuGrid";
import {emptyGrid} from "../../logic/generateGrid";
import gameReducer from "../../logic/gameReducer";

// Component that manages game logic
// Stores all game state and reducer logic

const Game = (props) => {
    const [gameState, dispatch] = useReducer(gameReducer, emptyGrid())
    const [selected, setSelected] = useState(null)

    return ( 
    <div className="">
        <SudokuGrid 
            gameState={gameState} 
            selected={selected} 
            selectCell={(c) => {setSelected(c)}}
            tryInputNumber={(e, coord) => {
                dispatch({type: "INPUT_NUMBER", value:e.target.value, coord})
            }}/>

        <pre className="mt-3 text-sm w-12">
            {(selected != null ? JSON.stringify(gameState.cells[selected]): null)}
        </pre>
    </div> );
}
 
export default Game;
