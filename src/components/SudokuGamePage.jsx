import React from 'react';
import Game from "./SudokuGrid/Game"

const SudokuGamePage = () => {
    return ( <main>
        <div className="flex justify-center mt-12">
            <Game />
        </div>
    </main> );
}
 
export default SudokuGamePage;