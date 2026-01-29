// import { useState } from 'react'

import { Routes, Route } from "react-router";
import Film from './pages/auth/film';
import PostMovie from "./pages/films/post-movie";

function App() {

  return (
    <>
        <main>
          <Routes>
            <Route path="/film" element={<Film />} />
          <Route path="/form-movie" element={<PostMovie/>}/>
          </Routes>
        </main>
    </>
  )
}

export default App