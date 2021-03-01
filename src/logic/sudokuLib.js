import { immerable } from "immer";
//
// Sudoku classes, reasoning utilities
//
class GameParams {
    constructor(gridBase) {
        this.gridBase = gridBase;         // the grid is gridBase^2 x gridBase^2
        this.numRows  = this.gridBase**2; // number of rows and cols
        this.numCols  = this.numRows;
        this.minCoord = 0;                // coords are 0 .. maxCoord
        this.maxCoord = this.numRows - 1;
        this.minValue = 1;                // values are 1 .. maxValue
        this.maxValue = this.numRows;
    }
}
const gameParams = new GameParams(3);   // only 3 works for now

class GameState {
    // A GameState is the representation of Sudoku board at a point in time
    [immerable] = true;
    constructor() {
        this.cells = [];
        this.invalidCells = [];
        for (let i = 0; i < gameParams.numRows; i++) {
            for (let j = 0; j < gameParams.numCols; j++) {
                this.cells.push(new Cell(i, j));
            }
        }
        this.lastCellIndex = this.cells.length -1
    }
    setCellValue(r,c,v) {
        // Set the value of the cell w/ Coords (r,c).
        let newCell = new Cell(r,c,v);
        this.cells[newCell.coord.index].setValue(newCell.value);
    }
    getInvalidCells() {
        // Return list of Cells from the GameState that are invalid,
        //   e.g., Cells in the same row, col, or grid that have the same
        //         value
        // If the empty list is returned, there are no row, col, or grid
        //   contradictions
        for (let i = gameParams.minCoord; i <= gameParams.maxCoord; i++) {
            let dupsFromRow = findDupValueCells(this.getRow(i));
            let dupsFromCol = findDupValueCells(this.getCol(i));
            let dupsFromGrid = findDupValueCells(this.getGrid(i));
            for (let dups of [dupsFromRow, dupsFromCol, dupsFromGrid]) {
                if (dups.length > 0) return dups;
            }
        }
        return [];               // no dups found
    }
    getRow(i) {
        // Return list of Cells in row i (0 <= i <= gameParams.maxRow)
        let startI = i * gameParams.numCols
        let endI   = startI + gameParams.numCols
        return this.cells.slice(startI, endI)
    }
    getCol(i) {
        // Return list of Cells in col i (0 <= i <= gameParams.maxCol)
        let colCells = []
        for (let j=i; j <= this.lastCellIndex; j += gameParams.numRows) {
            colCells.push(this.cells[j])
        }
        return colCells
    }
    getGrid(i) {
        // Return list of Cells from the i'th grid
        let gridCells = []
        let firstCoord = [ [0,0], [0,3], [0,6],
                           [3,0], [3,3], [3,6],
                           [6,0], [6,3], [6,6], ];
        let fc = firstCoord[i];
        for (let r=0; r < gameParams.gridBase; r++) {
            for (let c=0; c < gameParams.gridBase; c++) {
                let coord = new Coord(fc[0]+r, fc[1]+c);
                gridCells.push(this.cells[coord.index]);
            }
        }
        return gridCells
    }
}
function findDupValueCells(arrayOfCells) {
    // Scan arrayOfCells for duplicate values.
    // Return an array of cells that have duplicate values.
    // Return an empty array if all the cells have distinct values (or null)
    let vals = new Map();         // vals.get(i) is [Cells w/ value i]
    for (let cell of arrayOfCells) {
        if (cell.value != null) {
            let v = cell.value;
            if (!vals.has(v)) {     // 1st time we've seen v
                vals.set(v, []);
            }
            vals.get(v).push(cell)
        }
    }
    for (let [v, cellList] of vals) {
        if (cellList.length > 1) {  // return 1st duplicates found
            return cellList;
        }
    }
    return []                       // no duplicates found
}

class Cell {
    // A Cell in a GameState
    [immerable] = true;

    constructor(r, c, value = null) {
        this.coord = new Coord(r, c);
        this.editable = true;
        this.possibleValues = [];
        this.isValid = true;

        if (value != null) {
            this.setValue(value);
        } else {
            this.value = null;
        }
    }

    setValue(value) {
        // Set this Cell's value
        if (!this.editable) {
            let m = `Cell (${this.coord.r},${this.coord.c}) is not editable`;
            throw new Error(m);
        }
        if (
            !isNaN(value) &&
            gameParams.minValue <= value &&
            value <= gameParams.maxValue
        ) {
            this.value = value;
        } else {
            throw new Error(`Invalid cell value: ${value}`);
        }
    }
}

class Coord {
    // A Coord is a row, col pair of integers: (r,c). zero based
    constructor(r,c) {
        this.r = this.validateCoord(r);
        this.c = this.validateCoord(c);
        this.index = (r * gameParams.numRows) + c;
    }
    validateCoord(i) {
        if (i < gameParams.minCoord || i > gameParams.maxCoord) {
            throw new Error(`Invalid cell coordinate: ${i}`);
        }
        return i;
    }
}

// Mate finding functions. Should these become methods of a Coord?
function mates(coord) {
    // Return array of distinct Coords of the mates of this coord
    return rowMates(coord).concat(colMates(coord), gridOffMates(coord));
}
function rowMates(coord) {
    // Return array of Coords for the row mates of this Coord.
    let mates = []
    for (let c = gameParams.minCoord; c <= gameParams.maxCoord; c++) {
        if (c !== coord.c) {
            mates.push(new Coord(coord.r, c))
        }
    }
    return mates
}
function colMates(coord) {
    // Return array of Coords for the column mates of this Coord.
    let mates = []
    for (let r = gameParams.minCoord; r <= gameParams.maxCoord; r++) {
        if (r !== coord.r) {
            mates.push(new Coord(r, coord.c))
        }
    }
    return mates
}
function gridMates(coord) {
    // Return array of Coords for the grid mates of this Coord.
    return gridRowMates(coord).concat(gridColMates(coord), gridOffMates(coord))
}
function gridRowMates(coord) {
    // Return array of Coords for the grid row mates of this Coord.
    // (the row mates that are in coord's 3x3 grid)
    // Assumes gridBase = 3
    let mates = []
    switch (coord.c % gameParams.gridBase) {
    case 0:  {
        mates.push(new Coord(coord.r, coord.c+1));
        mates.push(new Coord(coord.r, coord.c+2));
        break;
        }
    case 1: {
        mates.push(new Coord(coord.r, coord.c-1));
        mates.push(new Coord(coord.r, coord.c+1));
        break;
        }
    case 2: {
        mates.push(new Coord(coord.r, coord.c-2));
        mates.push(new Coord(coord.r, coord.c-1));
        break;
        }
    default:    // shouldn't happen!
    }
    return mates
}
function gridColMates(coord) {
    // Return array of Coords for the grid column mates of this Coord.
    // (the col mates that are in coord's 3x3 grid)
    // Assumes gridBase = 3
    let mates = []
    switch (coord.r % gameParams.gridBase) {
    case 0:  {
        mates.push(new Coord(coord.r+1, coord.c));
        mates.push(new Coord(coord.r+2, coord.c));
        break;
        }
    case 1: {
        mates.push(new Coord(coord.r-1, coord.c));
        mates.push(new Coord(coord.r+1, coord.c));
        break;
        }
    case 2: {
        mates.push(new Coord(coord.r-2, coord.c));
        mates.push(new Coord(coord.r-1, coord.c));
        break;
        }
    default:    // shouldn't happen!
    }
    return mates
}
function gridOffMates(coord) {
    // Return array of Coords for the grid "off" mates of this Coord.
    // (the off mates that are in coord's 3x3 grid, but not in same row or col)
    let mates = []
    let rOffsets = getOffMateOffsets(coord.r)
    let cOffsets = getOffMateOffsets(coord.c)
    for (let i of rOffsets) {
        for (let j of cOffsets) {
            mates.push(new Coord(coord.r + i, coord.c + j));
        }
    }
    return mates
}
function getOffMateOffsets(i) {
    // Return array of 2 offsets, the values to add to i to get the coord
    // values for the Off Mates on i's axis.
    // (the off mates that are in coord's 3x3 grid, but not in same row or col)
    // Assumes gridBase = 3
    let offsets = []
    switch (i % gameParams.gridBase) {
        case 0: {
            offsets = [1, 2];
            break;
        }
        case 1: {
            offsets = [-1, 1];
            break;
        }
        case 2: {
            offsets = [-2, -1];
            break;
        }
        default:
            break;
    }
    return offsets
}

export {
    gameParams,
    GameState,
    findDupValueCells,
    Cell,
    Coord,
    mates,
    rowMates,
    colMates,
    gridMates,
    gridColMates,
    gridOffMates,
    gridRowMates,
};
