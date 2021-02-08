import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Cell from "../Cell";

const testCellProps = {
    detVal: 5,
    editable: true,
    coords: { r: 1, c: 2 },
    onFocus: jest.fn(),
    tryInputNumber: jest.fn(),
    color: null,
};

const testCellProps2 = {
    detVal: 6,
    editable: false,
    coords: { r: 1, c: 2 },
    onFocus: jest.fn(),
    tryInputNumber: jest.fn(),
    color: null,
};

test("Cell renders a form element", () => {
    const { getByDisplayValue } = render(<Cell {...testCellProps} />);

    const element = getByDisplayValue(/5/);

    expect(element).toBeTruthy();
    expect(element).not.toHaveAttribute("disabled");

    fireEvent.focus(element);
    expect(testCellProps.onFocus).toHaveBeenCalled();

    fireEvent.change(element, { target: { value: "1" } });
    expect(testCellProps.tryInputNumber).toHaveBeenCalled();
});

test("Cell is disabled when it is a default value", () => {
    const { getByDisplayValue } = render(<Cell {...testCellProps2} />);
    const element = getByDisplayValue(/6/);

    expect(element).toBeTruthy();
    expect(element).toBeDisabled();
});
