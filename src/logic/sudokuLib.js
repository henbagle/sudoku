import { immerable } from "immer";
//
// Sudoku classes, reasoning utilities
//
class GameParams {
    constructor(gridBase) {
        this.gridBase = gridBase;         // the grid is gridBase^2 x gridBase^2
        this.numRows  = this.gridBase**2; // number of rows and cols
        this.minCoord = 0;                // coords are 0 .. maxCoord
        this.maxCoord = this.numRows - 1;
        this.minValue = 1;                // values are 1 .. maxValue
        this.maxValue = this.numRows;
    }
}
const gameParams = new GameParams(3);   // only 3 works for now

class GameState {
    [immerable] = true;
    constructor() {
        this.cells = [];
        for (let i = 0; i < gameParams.numRows; i++) {
            for (let j = 0; j < gameParams.numRows; j++) {
                this.cells.push(new Cell(i, j));
            }
        }
    }
}

class Cell {
    // A Cell in a GameState

    [immerable] = true;

    constructor(r, c, value = null) {
        this.coord = new Coord(r, c);

        if (value == null) {
            this.editable = true; // cell can be changed
            this.value = null;
        } else {
            this.editable = false; // cell is part of initial setup
            this.setValue(value);
        }
    }
    setValue(value) {
        // Set this Cell's value
        if (!isNaN(value) &&
            gameParams.minValue <= value &&
            value <= gameParams.maxValue) 
        {
            this.value = value;
        } else {
            throw new Error("Invalid cell value: ${value}\n");
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
            throw(new Error("Invalid cell coordinate: ${i}\n"));
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
    case 0: { offsets = [1,2];   break; }
    case 1: { offsets = [-1,1];  break; }
    case 2: { offsets = [-2,-1]; break; }
    }
    return offsets
}

export {
    gameParams,
    GameState,
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
