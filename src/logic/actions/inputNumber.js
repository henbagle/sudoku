export default function inputNumber(draftState, action) {
    const intVal = parseInt(action.value); // Attempt to parse whatever the user has input

    let targetNumber = null;
    if (!isNaN(intVal) && intVal > 0 && intVal <= 9) {
        targetNumber = intVal;
    }

    // Set the new number
    draftState.cells[action.coord.index].setValue(targetNumber);
}
