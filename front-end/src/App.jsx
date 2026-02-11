// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Film from "./pages/films/Film.jsx";
import Note from "./pages/films/note.jsx";
import PostMovie from "./pages/films/post-movie.jsx";
import Refused from "./pages/films/Refused.jsx";
import Register from "./pages/auth/register.jsx";
import Logout from "./pages/auth/logout.jsx";
import Login from "./pages/auth/login.jsx";
import Profile from "./pages/auth/profile.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Home from "./pages/auth/home.jsx";
import Workshop from "./pages/dashboard/workshop.jsx";
import AdminDashboard from "./pages/admin/admin.jsx";
import AdminDetailsFilms from './pages/admin/admindetailsfilms.jsx';
import AdminDash from './pages/admin/admindashboard.jsx';



function App() {
  return (
    <main>
      <Routes>
        <Route path="/film/:id" element={<Film />} />
        <Route path="/note" element={<Note />} />
        <Route path="/form-movie" element={<PostMovie />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/me" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/workshop" element={<Workshop />} />
        <Route path="/refused" element={<Refused />} />          <Route path="/admin/dashboard" element={<AdminDash/>} />
        <Route path="/admin/statistique" element={<AdminDashboard/>} />
        <Route path="/admin/detailsfilms" element={<AdminDetailsFilms />} />
      </Routes>
    </main>
  );
}

export default App;
