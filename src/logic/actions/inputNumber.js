import pushGameState from "./pushGameState";

export default function inputNumber(draft, action) {
    pushGameState(draft, (gs) => {
        // Set the new number
        const targetCell = gs.cells[action.coord.index];
        const desiredValue = parseSudokuNumber(action.value);
        targetCell.value = desiredValue;

        // Clear any possibilities
        if (desiredValue !== null) {
            targetCell.possibleValues = [];
        }

        // Check the game state for invalid cells
        gs.invalidCells = gs.getInvalidCells();
    });
}

function parseSudokuNumber(number) {
    const input = parseInt(number); // Attempt to parse whatever the user has input

    let targetNumber = null;
    if (!isNaN(input) && input > 0 && input <= 9) {
        targetNumber = input;
    }
    return targetNumber;
}

