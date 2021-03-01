import produce from "immer";
import { emptyGrid } from "./generateGrid";
import inputNumber from "./actions/inputNumber";
import commitGame from "./actions/commitGame";
import inputPossibleNumber from "./actions/inputPossibleNumber";

const gameReducer = produce((draftState, action) => {
    switch (action.type) {
        case "INPUT_NUMBER": {
            inputNumber(draftState, action);
            return;
        }

        case "INPUT_POSSIBLE_NUMBER": {
            inputPossibleNumber(draftState, action);
            return;
        }

        case "COMMIT_GAME": {
            commitGame(draftState);
            return;
        }

        case "GO_BACK": {
            if (draftState.currentState > 0) {
                draftState.currentState = draftState.currentState - 1;
            }
            return;
        }

        case "GO_FORWARD": {
            if (draftState.currentState < draftState.gameStates.length - 1) {
                draftState.currentState = draftState.currentState + 1;
            }
            return;
        }

        default:
            return;
    }
});

const initializeGame = () => {
    return {
        gameStates: [emptyGrid()],
        currentState: 0,
    };
};

export { gameReducer, initializeGame };
