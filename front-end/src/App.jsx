// import { useState } from 'react'

import { Routes, Route } from "react-router";
import Film from './pages/auth/film';
import { Routes, Route } from "react-router";
import Dashboard from "./components/pages/dashboard/dashboard";

function App() {

  return (
    <>
      <section>
        <main>
          <Routes>
            <Route path="/film" element={<Film />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </section>
    </>
  )
}

export default App
