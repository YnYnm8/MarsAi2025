// import { useState } from 'react'

import { Routes, Route } from "react-router";
import Film from "./pages/film/film";
import Note from "./pages/film/note";

function App() {

  return (
    <>
      <section>
        <main>
          <Routes>
            <Route path="/film" element={<Film />} />
            <Route path="/note" element={<Note/>}/>
          
          </Routes>
        </main>
      </section>
    </>
  );
}

export default App