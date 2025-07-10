//import { useState } from 'react'
import './App.css'
import { CardTwitter } from './CardTwitter.jsx'

function App() {
  //const [count, setCount] = useState(0)

  const users = [
    { name: 'Antonio Cubero', userName: 'cocoteuros', isFollowing: true },
    { name: 'Juan Perez', userName: 'juanperez', isFollowing: false },
    { name: 'Maria Lopez', userName: 'marialopez', isFollowing: true },
    { name: 'Pedro Gomez', userName: 'pedrogomez', isFollowing: false }
  ]

  return (
    <>
      {
        users.map(({name, userName, isFollowing}) => (
          <CardTwitter
            key={userName}
            userName={userName}
            initialIsFollowing={isFollowing}
          >
            {name}
          </CardTwitter>
        ))
      }

    </>
  )
}

export default App
