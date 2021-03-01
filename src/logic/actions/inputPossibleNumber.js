import { produce, current } from "immer";
// Action Format: {coord, event: KeyboardEvent}

export default function inputPossibleNumber(draft, action) {
    // Do not push a new gameState, add this to the current state
    const gs = draft.gameStates[draft.currentState];
    const cell = gs.cells[action.coord.index];
    if (action.event.shiftKey && !action.event.repeat) {
        action.event.preventDefault();
        switch (action.event.keyCode) {
            case 49:
                addPossibleValue(cell, 1);
                break;
            case 50:
                addPossibleValue(cell, 2);
                break;
            case 51:
                addPossibleValue(cell, 3);
                break;
            case 52:
                addPossibleValue(cell, 4);
                break;
            case 53:
                addPossibleValue(cell, 5);
                break;
            case 54:
                addPossibleValue(cell, 6);
                break;
            case 55:
                addPossibleValue(cell, 7);
                break;
            case 56:
                addPossibleValue(cell, 8);
                break;
            case 57:
                addPossibleValue(cell, 9);
                break;
            case 8:
                cell.possibleValues.pop();
                break;
            default:
                break;
        }
    }
}

function addPossibleValue(cell, value) {
    if (!cell.possibleValues.includes(value)) {
        cell.possibleValues.push(value);
    }
}
