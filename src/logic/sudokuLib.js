
class Coord {
    // A Coord is a row, col pair of integers: (r,c)
    //   zero based: 0-8
    constructor(r,c) {
        this.r = r;
        this.c = c;
    }
}
// Mate finding functions. Should these become methods of a Coord?
function rowMates(coord) {
    // Return array of Coords for the row mates of this Coord.
    let mates = []
    for (let c = 0; c < 9; c++) {
        if (c !== coord.c) {
            mates.push(new Coord(coord.r, c))
        }
    }
    return mates
}
function colMates(coord) {
    // Return array of Coords for the column mates of this Coord.
    let mates = []
    for (let r = 0; r < 9; r++) {
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
    let mates = []
    switch (coord.c % 3) {
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
    let mates = []
    switch (coord.r % 3) {
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
    for (i of rOffsets) {
        for (j of cOffsets) {
            mates.push(new Coord(coord.r + i, coord.c + j))
        }
    }
    return mates
}
function getOffMateOffsets(i) {
    // Return array of 2 offsets, the values to add to i to get the coord
    // values for the Off Mates on i's axis.
    // (the off mates that are in coord's 3x3 grid, but not in same row or col)
    let offsets = []
    switch (i % 3) {
    case 0: { offsets = [1,2];   break; }
    case 1: { offsets = [-1,1];  break; }
    case 2: { offsets = [-2,-1]; break; }
    }
    return offsets
}
