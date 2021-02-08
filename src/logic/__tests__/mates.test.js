// tests for mate finding functions 
// These are only for 9x9 grid. Haven't generalized them to arb grid size
import * as sl from "../sudokuLib.js";

test('test corner rowMates', () => {
    let c = new sl.Coord(0,0); let mates = sl.rowMates(c);
    expect(mates).toContainEqual(new sl.Coord(0,1));
    expect(mates).toContainEqual(new sl.Coord(0,8));
    expect(mates.length).toBe(8);

    c = new sl.Coord(0,8); mates = sl.rowMates(c);
    expect(mates).toContainEqual(new sl.Coord(0,0));
    expect(mates).toContainEqual(new sl.Coord(0,7));
    expect(mates.length).toBe(8);

    c = new sl.Coord(8,0); mates = sl.rowMates(c);
    expect(mates).toContainEqual(new sl.Coord(8,1));
    expect(mates).toContainEqual(new sl.Coord(8,8));
    expect(mates.length).toBe(8);

    c = new sl.Coord(8,8); mates = sl.rowMates(c);
    expect(mates).toContainEqual(new sl.Coord(8,0));
    expect(mates).toContainEqual(new sl.Coord(8,7));
    expect(mates.length).toBe(8);
})
test('test internal cell rowMates', () => {
    let c = new sl.Coord(3,3); let mates = sl.rowMates(c);
    expect(mates).toContainEqual(new sl.Coord(3,0));
    expect(mates).toContainEqual(new sl.Coord(3,2));
    expect(mates).not.toContainEqual(new sl.Coord(3,3));
    expect(mates).toContainEqual(new sl.Coord(3,4));
    expect(mates).toContainEqual(new sl.Coord(3,8));
    expect(mates.length).toBe(8);
})
test('test corner colMates', () => {
    let c = new sl.Coord(0,0); let mates = sl.colMates(c);
    expect(mates).toContainEqual(new sl.Coord(1,0));
    expect(mates).toContainEqual(new sl.Coord(8,0));
    expect(mates.length).toBe(8);

    c = new sl.Coord(0,8); mates = sl.colMates(c);
    expect(mates).toContainEqual(new sl.Coord(1,8));
    expect(mates).toContainEqual(new sl.Coord(8,8));
    
    c = new sl.Coord(8,0); mates = sl.colMates(c);
    expect(mates).toContainEqual(new sl.Coord(0,0));
    expect(mates).toContainEqual(new sl.Coord(7,0));
    
    c = new sl.Coord(8,8); mates = sl.colMates(c);
    expect(mates).toContainEqual(new sl.Coord(0,8));
    expect(mates).toContainEqual(new sl.Coord(7,8));
})
test('test internal cell colMates', () => {
    let c = new sl.Coord(6,5); let mates = sl.colMates(c);
    expect(mates).toContainEqual(new sl.Coord(0,5));
    expect(mates).toContainEqual(new sl.Coord(5,5));
    expect(mates).not.toContainEqual(new sl.Coord(6,5));
    expect(mates).toContainEqual(new sl.Coord(7,5));
    expect(mates).toContainEqual(new sl.Coord(8,5));
    expect(mates.length).toBe(8);
})
test('test gridRowMates', () => {
    let c = new sl.Coord(0,0); let mates = sl.gridRowMates(c);
    expect(mates).toContainEqual(new sl.Coord(0,1));
    expect(mates).toContainEqual(new sl.Coord(0,2));
    expect(mates.length).toBe(2);

    c = new sl.Coord(1,1); mates = sl.gridRowMates(c);
    expect(mates).toContainEqual(new sl.Coord(1,0));
    expect(mates).toContainEqual(new sl.Coord(1,2));
    expect(mates.length).toBe(2);

    c = new sl.Coord(4,8); mates = sl.gridRowMates(c);
    expect(mates).toContainEqual(new sl.Coord(4,6));
    expect(mates).toContainEqual(new sl.Coord(4,7));
    expect(mates.length).toBe(2);
})
test('test gridColMates', () => {
    let c = new sl.Coord(0,0); let mates = sl.gridColMates(c);
    expect(mates).toContainEqual(new sl.Coord(1,0));
    expect(mates).toContainEqual(new sl.Coord(2,0));
    expect(mates.length).toBe(2);

    c = new sl.Coord(1,1); mates = sl.gridColMates(c);
    expect(mates).toContainEqual(new sl.Coord(0,1));
    expect(mates).toContainEqual(new sl.Coord(2,1));
    expect(mates.length).toBe(2);

    c = new sl.Coord(5,8); mates = sl.gridColMates(c);
    expect(mates).toContainEqual(new sl.Coord(3,8));
    expect(mates).toContainEqual(new sl.Coord(4,8));
    expect(mates.length).toBe(2);
})
test('test gridOffMates', () => {
    let c = new sl.Coord(0,0); let mates = sl.gridOffMates(c);
    expect(mates).toContainEqual(new sl.Coord(1,1));
    expect(mates).toContainEqual(new sl.Coord(1,2));
    expect(mates).toContainEqual(new sl.Coord(2,1));
    expect(mates).toContainEqual(new sl.Coord(2,2));
    expect(mates.length).toBe(4);

    c = new sl.Coord(4,4); mates = sl.gridOffMates(c);
    expect(mates).toContainEqual(new sl.Coord(3,3));
    expect(mates).toContainEqual(new sl.Coord(3,5));
    expect(mates).toContainEqual(new sl.Coord(5,3));
    expect(mates).toContainEqual(new sl.Coord(5,5));
    expect(mates.length).toBe(4);
})
test('test gridMates', () => {
    let c = new sl.Coord(0,0); let mates = sl.gridMates(c);
    expect(mates.length).toBe(8);
})
test('test mates', () => {
    let c = new sl.Coord(0,0); let mates = sl.mates(c);
    expect(mates.length).toBe(20);
})
