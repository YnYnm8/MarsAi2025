// import { useState } from 'react'
import './App.css'
import{Routes,Route} from "react-router";
import Film from './pages/auth/film';

function App() {
  // const [count, setCount] = useState(0)

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