import React from 'react';

const Cell = ({detVal, editable, coords, onFocus, tryInputNumber}) => {

    const inputClasses = `h-12 w-12 ${calculateBorderStyle(coords)} focus:ring focus:ring-inset focus:bg-blue-50 
                        text-2xl text-center ${editable ? "": "font-semibold bg-white"}`
    const value = ((detVal === 0) ? "" : detVal)

    return ( 
        <input 
            type="text" 
            value={value}
            onFocus={onFocus}
            onChange={tryInputNumber}
            className={inputClasses} 
            disabled={!editable}>
        </input>
    );
}

function calculateBorderStyle(coords)
{
    const INITIAL_BORDER = "border border-gray-700";
    const T = " border-t-2";
    const L = " border-l-2";
    const R = " border-r-2";
    const B = " border-b-2";

    let outputStyle = INITIAL_BORDER;
    const subgridX = coords[0] % 3; // Position within local 3x3 grid
    const subgridY = coords[1] % 3;

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