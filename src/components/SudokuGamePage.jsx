import React from 'react';
import SudokuGame from "./SudokuGame/SudokuGame"

const SudokuGamePage = () => {
    return ( <main>
        <div className="flex justify-center mt-12">
            <SudokuGame />
        </div>
    </main> );
}
 
export default SudokuGamePage;