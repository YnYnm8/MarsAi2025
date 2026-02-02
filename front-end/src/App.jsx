// import { useState } from 'react'
import { Routes, Route } from "react-router";
import Film from "./pages/films/film.jsx";
import Note from "./pages/films/note.jsx";
import PostMovie from "./pages/films/post-movie";
import Register from './pages/auth/register.jsx';
import Logout from './pages/auth/logout.jsx'
import Login from './pages/auth/login.jsx';
import Profile from "./pages/auth/profile.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Home from "./pages/auth/home.jsx";

function App() {

  return (
    <>
      <main>
        <Routes>
          <Route path="/film" element={<Film />} />
          <Route path="/note" element={<Note />} />
          <Route path="/form-movie" element={<PostMovie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />

        </Routes>
      </main>
    </>
  );
}

export default App
