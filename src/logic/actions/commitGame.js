export default function commitGame(draft) {
    const lastState = draft.gameStates[draft.currentState];

    if(lastState.invalidCells.length > 0)
    {
        // Prevent user from committing game
        // Grey out commitGame button
    }
    else
    {
        draft.gameStates = [lastState];
        for (let cell of draft.gameStates[0].cells) {
            if (cell.value) {
                cell.editable = false;
            }
        }
        draft.currentState = 0;
    }
}
