import React from "react";
import renderer from "react-test-renderer";
import Cell from "../Cell.jsx";

const emptyCell = {
    detVal: 0,
    editable: true,
    coords: { r: 1, c: 1 },
    onFocus: () => {},
    tryInputNumber: () => {},
};
const defaultCell = {
    detVal: 1,
    editable: false,
    coords: { r: 2, c: 2 },
    onFocus: () => {},
    tryInputNumber: () => {},
};

test("Cell gets rendered", () => {
    const emptyComponent = renderer.create(<Cell {...emptyCell} />);
    const defaultComponent = renderer.create(<Cell {...defaultCell} />);

    let tree1 = emptyComponent.toJSON();
    expect(tree1).toMatchSnapshot();

    let tree2 = defaultComponent.toJSON();
    expect(tree2).toMatchSnapshot();
});
