// tests for GameState classes
// These are only for 9x9 grid. Haven't generalized them to arb grid size
import * as sl from "../sudokuLib.js";

test('test GameState.getRow()', () => {
    let gs = new sl.GameState();
    let result = gs.getRow(0);
    expect(result.length).toBe(sl.gameParams.numCols);
    expect(result[0]).toEqual(new sl.Cell(0,0));
    expect(result[result.length -1]).toEqual(new sl.Cell(0,8));
    result = gs.getRow(8);
    expect(result.length).toBe(sl.gameParams.numCols);
    expect(result[0]).toEqual(new sl.Cell(8,0));
    expect(result[result.length -1]).toEqual(new sl.Cell(8,8));
})
test('test GameState.getCol()', () => {
    let gs = new sl.GameState();
    let result = gs.getCol(0);
    expect(result.length).toBe(sl.gameParams.numRows);
    expect(result[0]).toEqual(new sl.Cell(0,0));
    expect(result[result.length -1]).toEqual(new sl.Cell(8,0));
    result = gs.getCol(8);
    expect(result.length).toBe(sl.gameParams.numRows);
    expect(result[0]).toEqual(new sl.Cell(0,8));
    expect(result[result.length -1]).toEqual(new sl.Cell(8,8));
    result = gs.getCol(4);
    expect(result.length).toBe(sl.gameParams.numRows);
    expect(result[0]).toEqual(new sl.Cell(0,4));
    expect(result[result.length -1]).toEqual(new sl.Cell(8,4));
})
test('test GameState.getGrid()', () => {
    let gs = new sl.GameState();
    let result = gs.getGrid(0);
    expect(result.length).toBe(sl.gameParams.numRows);
    expect(result[0]).toEqual(new sl.Cell(0,0));
    expect(result[result.length -1]).toEqual(new sl.Cell(2,2));

    result = gs.getGrid(4);
    expect(result.length).toBe(sl.gameParams.numRows);
    expect(result[0]).toEqual(new sl.Cell(3,3));
    expect(result[result.length -1]).toEqual(new sl.Cell(5,5));
})
test('test findDupValueCells()', () => {
    let cells = [];                                     // test empty list
    expect(sl.findDupValueCells(cells)).toEqual([]);
    cells = [new sl.Cell(0,0,1)];                       // test singleton
    expect(sl.findDupValueCells(cells)).toEqual([]);

    let c1 = new sl.Cell(0,0,1);            // test array w/ dups
    let c2 = new sl.Cell(3,3,3);
    let c3 = new sl.Cell(2,2,1);
    cells = [c1, c2, c3];
    expect(sl.findDupValueCells(cells)).toContain(c1);
    expect(sl.findDupValueCells(cells)).toContain(c3);
    expect(sl.findDupValueCells(cells)).not.toContain(c2);

    c1 = new sl.Cell(0,0,1);                // test array w/ no dups
    c2 = new sl.Cell(3,3,3);
    c3 = new sl.Cell(2,2,4);
    cells = [c1, c2, c3];
    expect(sl.findDupValueCells(cells)).toEqual([]);
})
test('test GameState.getInvalidCells() rows', () => {
    let gs = new sl.GameState();                // blank gameState
    expect(gs.getInvalidCells()).toEqual([]);

    gs.setCellValue(0,0,1);                     // row w/ singleton
    expect(gs.getInvalidCells()).toEqual([]);

    gs = new sl.GameState();                    // row w/ dup values
    gs.setCellValue(0,0,1);
    gs.setCellValue(0,4,2);
    gs.setCellValue(0,8,1);
    expect(gs.getInvalidCells().length).toEqual(2);
    expect(gs.getInvalidCells()).toContainEqual(new sl.Cell(0,8,1));
})
test('test GameState.getInvalidCells() cols', () => {
    let gs = new sl.GameState();                // blank gameState

    gs.setCellValue(0,0,1);                     // col w/ singleton
    expect(gs.getInvalidCells()).toEqual([]);

    gs = new sl.GameState();                    // col w/ dup values
    gs.setCellValue(2,3,1);
    gs.setCellValue(4,3,2);
    gs.setCellValue(6,3,1);
    expect(gs.getInvalidCells().length).toEqual(2);
    expect(gs.getInvalidCells()).toContainEqual(new sl.Cell(6,3,1));
})
test('test GameState.getInvalidCells() grids', () => {
    let gs = new sl.GameState();                // blank gameState

    gs.setCellValue(0,0,1);                     // grid w/ singleton
    expect(gs.getInvalidCells()).toEqual([]);

    gs = new sl.GameState();                    // grid w/ dup values
    gs.setCellValue(3,3,6);
    gs.setCellValue(4,4,7);
    gs.setCellValue(5,5,6);
    expect(gs.getInvalidCells().length).toEqual(2);
    expect(gs.getInvalidCells()).toContainEqual(new sl.Cell(5,5,6));
})
