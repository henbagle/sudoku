import update from "immutability-helper";

export default function gridReducer(state, action) {
    switch (action.type) {
        case "INP": {
            console.log("in");
            let intVal = parseInt(action.value);
            let targetNumber;
            if (action.value === "") targetNumber = 0;
            else if (!isNaN(intVal) && intVal >= 0 && intVal <= 9)
                targetNumber = intVal;
            else return state;

            return update(state, {
                [action.coords.r]: {
                    [action.coords.c]: { detVal: { $set: targetNumber } },
                },
            });
        }

        default:
            return state;
    }
}
