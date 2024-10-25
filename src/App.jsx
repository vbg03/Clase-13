import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './routes/Login'
import Home from './routes/Home'
import { UserContext } from './context/UserProvider'
import Navbar from './componentes/navbar'
import RequireAuth from './componentes/RequireAuth'

function App() {
  const [count, setCount] = useState(0)
  const {user} = useContext(UserContext)
  if(user==false){
    return <p>cargando...</p>
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<RequireAuth><Home></Home></RequireAuth>} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/register' element={<Register />} ></Route>
      </Routes>
    </>
  )
}

export default App
