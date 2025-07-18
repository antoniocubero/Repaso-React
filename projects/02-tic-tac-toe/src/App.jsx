import { useState } from 'react'
import './App.css'
import './index.css'
import { Square } from './Square';
import {TURNS, WINNING_COMBINATIONS} from './constants';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  const updateBoard = (index)=>{
    //TODO: 
    // Comprobar si la casilla ya está ocupada
    // Actualizar tablero
    // Cambiar turno
    // Comprobar si hay ganador
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
            >
              {value}
            </Square>
          ))}
        </section>
      </main>
    </>
  )

}

export default App
