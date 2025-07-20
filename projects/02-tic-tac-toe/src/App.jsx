import { useState } from 'react'
import './App.css'
import './index.css'
import { Square } from './Square';
import {TURNS, WINNING_COMBINATIONS} from './constants';

function App() {
  //TODO: Reset de partida
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  const [winner, setWinner] = useState(null)

  const updateBoard = (index)=>{
    // Comprobar si la casilla ya está ocupada o hay ganador
    if (board[index] || winner) {
      return;
    }

    // Actualizar tablero
    const newBoard = [...board]
    newBoard[index]=turn
    setBoard(newBoard)

    // Cambiar turno
    const newTurn = (turn==TURNS.X ? TURNS.O : TURNS.X)
    setTurn(newTurn)

    // Comprobar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    }else if (checkFullBoard(newBoard)) {
      setWinner(false)
    }
  }

  const winnerText = winner == false ? 'Empate' : 'Ganó: '

  const checkWinner = (boardToCheck)=>{
    for (const combo of WINNING_COMBINATIONS) {
      if (boardToCheck[combo[0]] &&
        boardToCheck[combo[0]] == boardToCheck[combo[1]] &&
        boardToCheck[combo[0]] == boardToCheck[combo[2]]
      ) {
        return boardToCheck[combo[0]]
      }
    }
    return null
  }

  function checkFullBoard(boardToCheck){
    return boardToCheck.every((square)=>square !== null)
  }

  return (
    <>
      <main className='board'>
        <h1>Tic tac toe</h1>
        <section className='game'>
          {board.map((value, index) => (
            <Square 
            key={index}
            index={index}
            updateBoard={updateBoard}
            >
              {value}
            </Square>
          ))}
        </section>
        <section className='turn'>
          <Square isSelected={turn===TURNS.O}>
            {TURNS.O}
          </Square>
          <Square isSelected={turn===TURNS.X}>
            {TURNS.X}
          </Square>
        </section>
        <section className='winner'>
          <div className='text'>
            <h2>{winnerText}</h2>
            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>
          </div>
        </section>
      </main>
    </>
  )

}

export default App
