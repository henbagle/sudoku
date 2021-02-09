import pushGameState from "./pushGameState";

export default function inputNumber(draft, action) {
    pushGameState(draft, (gs) => {
        // Set the new number
        gs.cells[action.coord.index].value = parseSudokuNumber(action.value);
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

