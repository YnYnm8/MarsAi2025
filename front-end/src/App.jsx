// import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router";
import Film from './pages/auth/film';
import { Login } from './components/pages/auth/login';
import { Register } from './components/pages/auth/register';
import Logout from './components/pages/auth/logout'

function App() {

  return (
    <>
      <section>
        <main>
          <Routes>
            <Route path="/film" element={<Film />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </main>
      </section>
    </>
  )
}

export default App