import React from 'react';

const Cell = ({cell, onFocus, tryInputNumber, color}) => {

    const inputClasses = `h-12 w-12 ${calculateBorderStyle(cell.coord)} ${calculateBgColor(color)} focus:ring focus:ring-inset focus:bg-blue-50 
                        text-2xl text-center ${cell.editable ? "": "font-semibold bg-white"}`
    const displayValue = ((cell.value === null) ? "" : cell.value)

    return ( 
        <input 
            type="text" 
            value={displayValue}
            onFocus={onFocus}
            onChange={tryInputNumber}
            className={inputClasses} 
            disabled={!cell.editable}>
        </input>
    );
}

function calculateBgColor(color)
{
    switch (color) {
        case "row": return "bg-red-100";
        case "col": return "bg-green-100";
        case "grid": return "bg-yellow-100";
        default: return "";
    }
}

function calculateBorderStyle(coord)
{
    const INITIAL_BORDER = "border border-gray-700";
    const T = " border-t-2";
    const L = " border-l-2";
    const R = " border-r-2";
    const B = " border-b-2";

    let outputStyle = INITIAL_BORDER;
    const subgridX = coord.c % 3; // Position within local 3x3 grid
    const subgridY = coord.r % 3;

    switch(subgridX)
    {
        case 0:
            outputStyle += L;
            break;
        case 2:
            outputStyle += R;
            break;
        default: break;
    }

    switch(subgridY)
    {
        case 0:
            outputStyle += T;
            break;
        case 2:
            outputStyle += B;
            break;
        default: break;
    }

    return outputStyle;
}

export default Cell;