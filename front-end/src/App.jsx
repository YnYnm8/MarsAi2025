// import { useState } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import Note from "./pages/films/note.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PostFilm from "./pages/films/post-movie.jsx";
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
import FilmsDetails from "./pages/films/filmsDetails.jsx";
import AdminSelection from "./pages/admin/adminselection.jsx";
import Adminrejected from "./pages/admin/adminrejected.jsx";
import Adminpending from "./pages/admin/adminpending.jsx";
import Reservation from "./pages/reservation/reservation.jsx";
import Jury from "./pages/jury/jury.jsx";
import Gallery from "./pages/gallery/Gallery.jsx";
import EditFilm from "./pages/films/editFilm.jsx";
// import AdminProfile from "./pages/admin/adminprofile.jsx";
import AdminAllFilms from "./pages/admin/adminallfilm.jsx"
import TopNavbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import ComiteProfile from "./pages/films/ComiteProfile.jsx";
import Contact from "./pages/contact/Contact.jsx";


function App() {
  const location = useLocation();
  const isNotePage = location.pathname === "/note";

  return (
    <>
      <TopNavbar />
      <main>
        <Routes>
          {/* PUBLIC */}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/jury" element={<Jury />} />
          <Route path="/top-rated" element={<Gallery />} />

          {/* FILMS*/}
          <Route path="/films/:id" element={<FilmsDetails />} />
          <Route path="/comite/note" element={<Note />} />
          <Route path="/note" element={<Note />} />
           <Route path="/comite/profile" element={<ComiteProfile />} />

          <Route path="/form-movie" element={<PostFilm />} />
          <Route path="/edit/:id" element={<EditFilm />} />

          {/* USER */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />

          {/*ADMINISTRATOR*/}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/admin/dashboard" element={<AdminDash />} />
          <Route path="/admin/statistique" element={<AdminDashboard />} />
          <Route path="/admin/detailsfilms" element={<AdminDetailsFilms />} />
          <Route path="/admin/films/selected" element={<AdminSelection />} />
          <Route path="/admin/films/rejected" element={<Adminrejected />} />
          <Route path="/admin/films/pending" element={<Adminpending />} />

          {/* CONTACT */}
          <Route path="/contact" element={<Contact/>} />

          <Route path="/reservation" element={<Reservation />} />
          <Route path="/jury" element={<Jury />} />
          {/* <Route path="/admin/profile" element={<AdminProfile />} /> */}
          <Route path="/admin/films" element={<AdminAllFilms />} />
          <Route path="/admin/films/:status" element={<AdminAllFilms />} />



        </Routes>
      </main>
      {!isNotePage && <Footer />}    </>
  );
}

export default App;
