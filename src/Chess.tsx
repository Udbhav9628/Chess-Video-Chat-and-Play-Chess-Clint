import './App.css';
import { Chess } from "chess.js";
import { useState } from 'react'
import Chessboard from "chessboardjsx";

const ChessboardComp = () => {
    const [chess] = useState<any>(new Chess());

    const [fen, setFen] = useState(chess.fen());

    const handleMove = (move: object) => {
        try {
            if (chess.move(move)) {
                // setTimeout(() => {
                //     const moves = chess.moves();

                //     if (moves.length > 0) {
                //         const computerMove = moves[Math.floor(Math.random() * moves.length)];
                //         chess.move(computerMove);
                //         setFen(chess.fen());
                //     }
                // }, 300);

                setFen(chess.fen());
            }
        } catch (error) {
            alert("Invalid Move")
        }
    };

    return (
        <div className='Container'>
            <Chessboard width={400} position={fen} onDrop={(move) => {
                handleMove({
                    from: move.sourceSquare,
                    to: move.targetSquare,
                    promotion: "q",
                })
            }}
            />
        </div>
    )
}

export default ChessboardComp;