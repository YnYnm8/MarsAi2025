// import { useState } from 'react'
import { Routes, Route } from "react-router";
import Film from "./components/pages/auth/film";
import Note from "./components/pages/auth/note";
import Login from "./components/pages/auth/login";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <section>
        <main>
          <Routes>
            <Route path="/film" element={<Film />} />
            <Route path="/note" element={<Note />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </section>
    </>
  );
}

export default App