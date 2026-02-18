// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Film from "./pages/films/film.jsx";
import Note from "./pages/films/note.jsx";
import PostFilm from "./pages/films/post-movie";
import Register from './pages/auth/register.jsx';
import Logout from './pages/auth/logout.jsx'
import Login from './pages/auth/login.jsx';
import Profile from "./pages/auth/profile.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Home from "./pages/auth/home.jsx";
import Workshop from "./pages/dashboard/workshop.jsx";
import AdminDashboard from "./pages/admin/admin.jsx";
import AdminDetailsFilms from './pages/admin/admindetailsfilms.jsx';
import AdminDash from './pages/admin/admindashboard.jsx';
import FilmsDetails from "./pages/films/filmsDetails.jsx";
import EditFilm from "./pages/films/editFilm.jsx";



function App() {

  return (
    <>
      <main>
        <Routes>

          {/* FILMS*/}
          <Route path="/film" element={<Film />} />
          <Route path="/films/:id" element={<FilmsDetails />} />
          <Route path="/note" element={<Note />} />
          <Route path="/form-movie" element={<PostFilm />} />
          <Route path="/edit/:id" element={<EditFilm/>} />

          {/* USER */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/" element={<Home />} />

          {/*ADMINISTRATOR*/}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/admin/dashboard" element={<AdminDash />} />
          <Route path="/admin/statistique" element={<AdminDashboard />} />
          <Route path="/admin/detailsfilms" element={<AdminDetailsFilms />} />
        </Routes>
      </main>
    </>
  );
}

export default App
