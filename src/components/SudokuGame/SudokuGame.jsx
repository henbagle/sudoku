import React, {useState, useReducer} from 'react';
import Grid from "./Grid";
import { gameReducer, initializeGame } from "../../logic/gameReducer";

// Component that manages game logic
// Stores all game state and reducer logic

const buttonClasses = "font-bold text-white bg-blue-400 m-2 hover:bg-blue-500 p-2 rounded-md"

const SudokuGame = (props) => {
    const [state, dispatch] = useReducer(gameReducer, initializeGame())
    const [selected, setSelected] = useState(null)

    return ( 
    <div className="">
        <div>
            <button className={buttonClasses} onClick={() => (dispatch({type:"GO_BACK"}))}>Back</button>
            <button className={buttonClasses} onClick={() => (dispatch({type:"GO_FORWARD"}))}>Forward</button>
            <button className={buttonClasses} onClick={() => (dispatch({type:"COMMIT_GAME"}))}>Commit</button>
        </div>
        <Grid 
            gameState={state.gameStates[state.currentState]} 
            selected={selected} 
            selectCell={(c) => {setSelected(c)}}
            tryInputNumber={(e, coord) => {
                dispatch({type: "INPUT_NUMBER", value:e.target.value, coord})
            }}
            addPossibleValue={(e, coord) => {
                dispatch({type: "INPUT_POSSIBLE_NUMBER", coord, event: e})
            }
            }/>
    </div> );
}
 
export default SudokuGame;
