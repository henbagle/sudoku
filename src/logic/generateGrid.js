import { GameState } from "./sudokuLib";

const emptyGrid = () => {
    let grid = new GameState();
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let randNumber = Math.floor(Math.random() * 9) + 1;
            const display = Math.random();
            if (display < 0.4) {
                let index = (i * 9) + j;
                grid.cells[index].value = randNumber;
                grid.cells[index].editable = false;
            }
        }
    }

    return grid;
};

export { emptyGrid };
