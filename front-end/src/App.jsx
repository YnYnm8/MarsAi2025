import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute.jsx";
import Note from "./pages/comite/note.jsx";
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
import AdminAllFilms from "./pages/admin/adminallfilm.jsx";
import TopNavbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import AdminPlaylist from './pages/admin/adminplaylist.jsx';
import AdminPlaylistDetail from './pages/admin/adminplaylistdetail.jsx';
import Contact from "./pages/auth/Contact.jsx";
import ComiteProfile from "./pages/comite/ComiteProfile.jsx";

function App() {
  const location = useLocation();
  const isNotePage =
    location.pathname === "/comite/note" ||
    location.pathname === "/comite/profile";

  return (
    <>
      <TopNavbar />
      <main>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/jury" element={<Jury />} />
          <Route path="/top-rated" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/programs" element={<Reservation />} />
          <Route path="/films/:id" element={<FilmsDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />

          {/* CONNECTÉ (tous rôles) */}
          <Route path="/me" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/form-movie" element={
            <ProtectedRoute>
              <PostFilm />
            </ProtectedRoute>
          } />
          <Route path="/edit/:id" element={
            <ProtectedRoute>
              <EditFilm />
            </ProtectedRoute>
          } />
          <Route path="/workshop" element={
            <ProtectedRoute>
              <Workshop />
            </ProtectedRoute>
          } />

          {/* COMITÉ + ADMIN */}
          <Route path="/comite/note" element={
            <ProtectedRoute roles={['admin', 'committee']}>
              <Note />
            </ProtectedRoute>
          } />
          <Route path="/comite/profile" element={
            <ProtectedRoute roles={['admin', 'committee']}>
              <ComiteProfile />
            </ProtectedRoute>
          } />

          {/* ADMIN UNIQUEMENT */}
          <Route path="/dashboard" element={
            <ProtectedRoute roles={['admin']}>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute roles={['admin']}>
              <AdminDash />
            </ProtectedRoute>
          } />
          <Route path="/admin/statistique" element={
            <ProtectedRoute roles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/detailsfilms" element={
            <ProtectedRoute roles={['admin']}>
              <AdminDetailsFilms />
            </ProtectedRoute>
          } />
          <Route path="/admin/films/selected" element={
            <ProtectedRoute roles={['admin']}>
              <AdminSelection />
            </ProtectedRoute>
          } />
          <Route path="/admin/films/rejected" element={
            <ProtectedRoute roles={['admin']}>
              <Adminrejected />
            </ProtectedRoute>
          } />
          <Route path="/admin/films/pending" element={
            <ProtectedRoute roles={['admin']}>
              <Adminpending />
            </ProtectedRoute>
          } />
          <Route path="/admin/films" element={
            <ProtectedRoute roles={['admin']}>
              <AdminAllFilms />
            </ProtectedRoute>
          } />
          <Route path="/admin/films/:status" element={
            <ProtectedRoute roles={['admin']}>
              <AdminAllFilms />
            </ProtectedRoute>
          } />
          <Route path="/admin/playlists" element={
            <ProtectedRoute roles={['admin']}>
              <AdminPlaylist />
            </ProtectedRoute>
          } />
          <Route path="/admin/playlist/:id" element={
            <ProtectedRoute roles={['admin']}>
              <AdminPlaylistDetail />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      {!isNotePage && <Footer />}
    </>
  );
}

export default App;