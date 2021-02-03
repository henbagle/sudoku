import produce from "immer";
import inputNumber from "./actions/inputNumber";

const gameReducer = produce((draftState, action) => {
    switch (action.type) {
        case "INPUT_NUMBER": {
            inputNumber(draftState, action);
            return;
        }

        default:
            return;
    }
});

export default gameReducer;
