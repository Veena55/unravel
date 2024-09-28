import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RoomCard from './components/RoomCard'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import RoomDetails from './components/RoomDetails'
import RoomList from './components/RoomList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RoomList />} />
        <Route path='/room-in-detail' element={<RoomDetails />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
