import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Cell from "../Cell";
import { Cell as CellObj } from "../../../logic/sudokuLib";

const testCellProps = {
    cell: new CellObj(2, 2, 5),
    onFocus: jest.fn(),
    tryInputNumber: jest.fn(),
    color: null,
};

testCellProps.cell.possibleValues = [4, 6];

const testCellProps2 = {
    cell: new CellObj(1, 2, 6),
    onFocus: jest.fn(),
    tryInputNumber: jest.fn(),
    color: null,
};
testCellProps2.cell.editable = false;

test("Cell renders a form element", () => {
    const { getByDisplayValue } = render(<Cell {...testCellProps} />);

    const element = getByDisplayValue(/5/);

    expect(element).toBeTruthy();
    expect(element).not.toHaveAttribute("disabled");

    fireEvent.focus(element);
    expect(testCellProps.onFocus).toHaveBeenCalled();

    fireEvent.input(element, { target: { value: "1" } });
    expect(testCellProps.tryInputNumber).toHaveBeenCalled();
});

test("Cell renders possible values", () => {
    const { getByLabelText } = render(<Cell {...testCellProps} />);

    const possibleValues = getByLabelText("possible values");

    expect(possibleValues).toBeTruthy();
    expect(possibleValues).toHaveTextContent("4 6");
});

test("Cell is disabled when it is a default value", () => {
    const { getByDisplayValue, getByLabelText } = render(
        <Cell {...testCellProps2} />
    );
    const element = getByDisplayValue(/6/);
    expect(element).toBeTruthy();
    expect(element).toBeDisabled();
});
