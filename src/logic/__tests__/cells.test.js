// tests for Cell and Coord classes
// These are only for 9x9 grid. Haven't generalized them to arb grid size
import * as sl from "../sudokuLib.js";

test('test Coord class', () => {
    expect( () => {new sl.Coord(-1,0)} ).toThrowError('Invalid');
    expect( () => {new sl.Coord(1,24)} ).toThrowError('Invalid');
    expect( () => {new sl.Coord(1,1)}  ).not.toThrowError('Invalid');
    expect(new sl.Coord(0,0).index).toBe(0);
    expect(new sl.Coord(0,1).index).toBe(1);
    expect(new sl.Coord(3,3).index).toBe(30);
    expect(new sl.Coord(8,8).index).toBe(80);
})
test('test Cell class', () => {
    expect( () => {new sl.Cell(-1, 0)} ).toThrowError('Invalid');
    expect( () => {new sl.Cell(1, 54)} ).toThrowError('Invalid');
    expect( () => {new sl.Cell(2, 2)}  ).not.toThrowError('Invalid');

    expect( () => {new sl.Cell(1, 4, 0)}  ).toThrowError('Invalid');
    expect( () => {new sl.Cell(1, 4, 10)} ).toThrowError('Invalid');
    expect( () => {new sl.Cell(1, 4, 9)}  ).not.toThrowError('Invalid');

    expect(new sl.Cell(0, 0).editable   ).toBe(true);
    expect(new sl.Cell(0, 0).value      ).toBe(null);
    expect(new sl.Cell(0, 0, 5).editable).toBe(false);
    expect(new sl.Cell(0, 0, 5).value   ).toBe(5);
})
