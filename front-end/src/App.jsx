// import { useState } from 'react'
import { Routes, Route } from "react-router";
import Film from './pages/auth/film';
import Register from './pages/auth/register.jsx';
import Logout from './pages/auth/logout.jsx'
import Login from './pages/auth/login.jsx';

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