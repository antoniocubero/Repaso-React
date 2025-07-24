import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [position, setPosition] = useState({x:0, y:0})
  const [enable, setEnable] = useState(false)

  useEffect(()=>{
    const handleMove = (event)=>{
      setPosition({x:event.clientX, y:event.clientY})
    }
    if (enable) {
      window.addEventListener('pointermove', handleMove)
    }

    return ()=>{
      window.removeEventListener('pointermove', handleMove)
    }
  },[enable])

  const clickHandle = ()=>{
    setEnable(!enable)
  }

  return (
    <>
      <div
        style={{
          width:40,
          height:40,
          backgroundColor:'#a5a',
          position:'absolute',
          top: position.y-20,
          left: position.x-20,
          borderRadius:'50%',
          pointerEvents:'none',
          opacity:0.6,
          filter:'blur(3px)'
        }}/>
        <button onClick={clickHandle}>{enable ? 'Desactivar': 'Activar'} movimiento</button>
    </>
  )
}

export default App
