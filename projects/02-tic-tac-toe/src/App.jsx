import { useState, useEffect } from 'react'
import './App.css'
import './index.css'
import { Square } from './components/Square';
import { WinnerShow } from './components/WinnerShow';
import {TURNS, WINNING_COMBINATIONS} from './constants';

function App() {
  const [board, setBoard] = useState(()=>{
      const boardStored = window.localStorage.getItem('board')
      if(boardStored){
        return JSON.parse(boardStored)
      }else{
        return Array(9).fill(null)
      }
    }
  );

  const [turn, setTurn] = useState(()=>{
    const turnStored = window.localStorage.getItem('turn')
    if(turnStored){
      return turnStored
    }else{
      return TURNS.X
    }
  });

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

  const resetGame =()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

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

  const saveGameToStorage=(board, turn)=>{
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
  }

  const resetGameStorage=()=>{
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  useEffect(()=>{
    saveGameToStorage(board, turn)
  },[turn])

  return (
    <>
      <main className='board'>
        <h1>Tic tac toe</h1>
        <button onClick={resetGame}>Reiniciar partida</button>
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
          <WinnerShow resetGame={resetGame} winner={winner}/>
      </main>
    </>
  )

}

export default App
