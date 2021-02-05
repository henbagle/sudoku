// tests for mate finding functions 
import * as sl from "../sudokuLib.js";

test('test rowMates', () => {
    let c = new sl.Coord(1,8);
    let mates = sl.rowMates(c)
    expect(mates[0]).toEqual(new sl.Coord(1,0));
    expect(mates[mates.length -1]).toEqual(new sl.Coord(1,7));
    expect(mates.length).toBe(8);
})
