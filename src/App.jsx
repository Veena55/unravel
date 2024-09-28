import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RoomCard from './components/RoomCard'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import RoomDetails from './components/RoomDetails'
import RoomList from './components/RoomList'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RoomList />} />
          <Route path='/room-in-detail/:roomId' element={<RoomDetails />} />
        </Routes>
      </BrowserRouter>
    </Provider>

  )
}

export default App
