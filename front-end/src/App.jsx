// import { useState } from 'react'

import { Routes, Route } from "react-router";
import Film from './pages/auth/film';

function App() {

  return (
    <>
      <section>
        <main>
          <Routes>
            <Route path="/film" element={<Film />} />
          
          </Routes>
        </main>
      </section>
    </>
  )
}

export default App