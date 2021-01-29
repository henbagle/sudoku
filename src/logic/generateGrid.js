const emptyGrid = () => {
    let grid = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            let randNumber = Math.floor(Math.random() * 9) + 1;
            const display = Math.random();
            row[j] = { detVal: randNumber, coords: [j, i], editable: false };
            if (display > 0.4) {
                row[j].detVal = 0;
                row[j].editable = true;
            }
        }
        grid[i] = row;
    }

    return grid;
};

export { emptyGrid };
