import produce from "immer";

export default function pushGameState(draft, produceFunc) {
    // If we are in the middle of the history, get rid of everything after currentState.
    if (draft.currentState < draft.gameStates.length - 1) {
        draft.gameStates = draft.gameStates.slice(0, draft.currentState + 1);
    }

    // Run the input producer function on the current state, adding it to the end of the history
    const lastGameState = draft.gameStates[draft.currentState];
    draft.gameStates.push(produce(lastGameState, produceFunc));

    // Increment currentState counter
    draft.currentState = draft.gameStates.length - 1;
}
