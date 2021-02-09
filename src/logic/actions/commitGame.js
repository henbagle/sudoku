export default function commitGame(draft) {
    const lastState = draft.gameStates[draft.currentState];
    draft.gameStates = [lastState];
    for (let cell of draft.gameStates[0].cells) {
        if (cell.value) {
            cell.editable = false;
        }
    }
    draft.currentState = 0;
}
