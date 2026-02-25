import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next"; 
import TopNavbar from "../../components/navbar";

const profileSchema = z.object({
  firstName: z.string().min(2, "val_min_2").optional(), 
  lastName: z.string().min(2, "val_min_2").optional(),
  bio: z.string().optional(),
  school: z.string().optional(),
  country: z.string().max(100).optional(),
  instagram: z.string().optional(),
});

const Profile = () => {
  const { t, i18n } = useTranslation("profile"); 

  const [user, setUser] = useState(null);
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const navigate = useNavigate();

  const { 
    register,      
    handleSubmit,  
    setValue,     
    formState: { isSubmitting, errors } 
  } = useForm({
    resolver: zodResolver(profileSchema) 
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch('http://localhost:3000/me', { credentials: 'include' });
        
        if (userRes.status === 401) { navigate('/login'); return; }
        
        const userData = await userRes.json();
        
        if (userRes.ok) {
          const currentUser = userData.user || userData;
          setUser(currentUser);
          setValue("firstName", currentUser.firstName);
          setValue("lastName", currentUser.lastName);
          setValue("bio", currentUser.bio || "");
          setValue("school", currentUser.school || "");
          setValue("country", currentUser.country || "");
          setValue("instagram", currentUser.socialNetworks?.instagram || "");
        }

        const filmsRes = await fetch('http://localhost:3000/my-films', { credentials: 'include' });
        if (filmsRes.ok) {
          const filmsData = await filmsRes.json();
          setFilms(Array.isArray(filmsData) ? filmsData : (filmsData.data || []));
        }

      } catch (error) { console.error("Erreur", error); } 
      finally { 
        setLoading(false); 
      }
    };
    fetchData();
  }, [navigate, setValue]); 

  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("bio", data.bio || "");
      formData.append("school", data.school || "");
      formData.append("country", data.country || "");
      
      if (data.instagram) {
        formData.append("instagram", data.instagram);
      }

      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      const res = await fetch('http://localhost:3000/profile', {
        method: 'PUT',
        credentials: 'include',
        body: formData 
      });

      if (res.ok) {
        const updatedData = await res.json();
        setUser(updatedData.user);
        setIsEditing(false);
        setSelectedFile(null);
        setPreviewUrl(null);
      } else {
        console.error("Erreur lors de la mise à jour");
      }
    } catch (error) { console.error(error); }
  };

  const handleDeleteFilm = async (filmId, e) => {
    e.stopPropagation();
    // Traduction de l'alerte
    if (!window.confirm(t("confirm_delete"))) return;
    
    try {
      const res = await fetch(`http://localhost:3000/films/${filmId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        setFilms(prevFilms => prevFilms.filter(film => film.id !== filmId));
      } else {
        alert(t("error_delete"));
      }
    } catch (error) {
      console.error("Erreur suppression", error);
    }
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-500/20 border-green-500 text-green-400';
      case 'rejected': return 'bg-red-500/20 border-red-500 text-red-400';
      case 'submitted': return 'bg-blue-500/20 border-blue-500 text-blue-400';
      default: return 'bg-gray-500/20 border-gray-500 text-gray-400'; 
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'approved': return t("status_approved");
      case 'rejected': return t("status_rejected");
      case 'submitted': return t("status_submitted");
      default: return t("status_submitted"); 
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const locale = i18n.language === 'en' ? 'en-US' : 'fr-FR';
    return new Date(dateString).toLocaleDateString(locale, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">{t("loading_text")}</div>;
  if (!user) return null;

  const initials = (user.firstName?.[0] + (user.lastName?.[0] || "")).toUpperCase();
  
  const filmsCount = films.length;
  const totalViews = films.reduce((acc, film) => acc + (film.views || 0), 0);
  const totalShares = films.reduce((acc, film) => acc + (film.shares || 0), 0);

  const avatarSrc = previewUrl 
    ? previewUrl 
    : (user.avatar ? `http://localhost:3000/${user.avatar.replace(/\\/g, "/")}` : null);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500 selection:text-white">
      <TopNavbar />

      <div className="h-48 w-full bg-gradient-to-r from-blue-900 via-purple-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-10 pb-20">
        
        {/* SECTION 1 : IDENTITÉ ET AVATAR */}
        <div className="flex flex-col items-center">
          
          <div className="relative group">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 flex items-center justify-center shadow-xl overflow-hidden">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-3xl font-bold tracking-widest overflow-hidden relative">
                {avatarSrc ? (
                  <img 
                    src={avatarSrc} 
                    alt="Avatar" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
            </div>

            {isEditing && (
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange} 
                />
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </label>
            )}
          </div>

          {!isEditing ? (
            <>
              <h1 className="mt-4 text-2xl font-bold uppercase tracking-wide text-center">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-500 text-xs mt-1">{user.email}</p> 
            </>
          ) : (
            <div className="mt-4 w-full max-w-xs space-y-2 flex flex-col items-center">
               <input {...register("firstName")} className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-center text-white" placeholder={t("placeholder_firstname")} />
               {errors.firstName && <span className="text-red-500 text-[10px]">{t(errors.firstName.message)}</span>}
               
               <input {...register("lastName")} className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-center text-white" placeholder={t("placeholder_lastname")} />
               {errors.lastName && <span className="text-red-500 text-[10px]">{t(errors.lastName.message)}</span>}
            </div>
          )}

          <div className="flex items-center gap-3 mt-6">
            {isEditing ? (
              <>
                <button onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="bg-green-600 text-white font-bold py-2 px-6 rounded-full text-xs hover:bg-green-500 transition">
                  {t("btn_save")}
                </button>
                <button onClick={() => { setIsEditing(false); setPreviewUrl(null); setSelectedFile(null); }} className="bg-gray-800 text-white font-bold py-2 px-4 rounded-full text-xs border border-gray-700">
                  {t("btn_cancel")}
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="px-4 py-2 border border-gray-700 rounded-full text-xs text-gray-300 hover:bg-gray-900 transition flex items-center gap-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                {t("btn_edit")}
              </button>
            )}
          </div>
        </div>

        {/* SECTION 2 : DETAILS */}
        <div className="mt-6 text-center space-y-3 max-w-md mx-auto">
          {!isEditing ? (
            <p className="text-gray-300 text-sm italic">{user.bio || ""}</p>
          ) : (
            <textarea {...register("bio")} className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-white text-sm" rows="2" placeholder={t("placeholder_bio")} />
          )}
          
          <div className="flex items-center justify-center gap-4 text-xs font-bold text-gray-500">
            <div className="flex items-center gap-1">
              <span className="text-blue-500">🏫</span>
              {!isEditing ? (user.school || t("no_school")) : <input {...register("school")} className="bg-[#111] border border-gray-700 rounded px-2 py-1 w-24 text-center" placeholder={t("placeholder_school")} />}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-green-500">🌍</span>
              {!isEditing ? (user.country || t("no_country")) : <input {...register("country")} className="bg-[#111] border border-gray-700 rounded px-2 py-1 w-20 text-center" placeholder={t("placeholder_country")} />}
            </div>
          </div>

          {isEditing && <input {...register("instagram")} className="bg-[#111] border border-gray-700 rounded px-3 py-2 text-white text-xs w-full text-center mt-2" placeholder={t("placeholder_instagram")} />}
          
          {!isEditing && user.socialNetworks?.instagram && (
            <a href={user.socialNetworks.instagram.startsWith('http') ? user.socialNetworks.instagram : `https://${user.socialNetworks.instagram}`} target="_blank" rel="noopener noreferrer" className="inline-block text-pink-500 text-xs font-bold border border-pink-500/30 px-3 py-1 rounded-full hover:bg-pink-900/20 transition mt-2">
              {t("link_instagram")}
            </a>
          )}
        </div>

        {/* SECTION 3 : STATS */}
        <div className="grid grid-cols-3 gap-4 mt-10 mb-10">
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{filmsCount}</div>
            <div className="text-[10px] text-gray-500 uppercase font-bold">{t("stat_films")}</div>
          </div>
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{totalViews.toLocaleString()}</div>
            <div className="text-[10px] text-gray-500 uppercase font-bold">{t("stat_views")}</div>
          </div>
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-pink-400">{totalShares.toLocaleString()}</div>
            <div className="text-[10px] text-gray-500 uppercase font-bold">{t("stat_shares")}</div>
          </div>
        </div>

        {/* SECTION 4 : GALERIE DES FILMS */}
        <h3 className="text-white text-sm font-bold tracking-widest mb-4 border-l-4 border-blue-600 pl-3 flex justify-between items-end">
          <span>{t("my_submissions")}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {films.length > 0 ? (
            films.map((film) => (
              <div 
                key={film.id} 
                onClick={() => navigate(`/films/${film.id}`)} 
                className="bg-[#0F0F0F] rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition group flex flex-col cursor-pointer relative"
              >
                <button 
                  onClick={(e) => handleDeleteFilm(film.id, e)}
                  className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-600 text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition z-20 backdrop-blur-sm"
                  title={t("title_delete")}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>

                <div className="relative h-48 bg-gray-900">
                  <div className={`absolute top-2 left-2 px-2 py-1 rounded-md text-[10px] font-bold z-10 uppercase tracking-wide border backdrop-blur-md ${film.generateAi === 'fullAi' ? 'bg-purple-600/80 border-purple-400 text-white' : 'bg-cyan-600/80 border-cyan-400 text-white'}`}>
                    {film.generateAi === 'fullAi' ? t("badge_full_ai") : t("badge_hybrid")}
                  </div>
                  <div className={`absolute bottom-2 text-yellow-400 right-2 px-2 py-1 rounded-md text-[10px] font-bold z-10 uppercase tracking-wider border backdrop-blur-md shadow-lg ${getStatusStyle(film.status)}`}>
                    {getStatusLabel(film.status)}
                  </div>
                  {film.Files?.[0]?.poster_url ? (
                    <img src={film.Files[0].poster_url} alt={film.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 text-xs bg-gray-900">
                      <svg className="w-8 h-8 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {t("no_poster")}
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-bold text-white leading-tight mb-1">{film.title}</h4>
                      <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                        {film.category} • {film.duration} min
                      </span>
                    </div>
                    {film.collaborateur && (
                      <div className="text-[10px] text-gray-400 text-right bg-gray-800/50 px-2 py-1 rounded border border-gray-700">
                        {t("feat")} <span className="text-white font-bold">{film.collaborateur}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs line-clamp-3 mb-4 flex-1 font-light leading-relaxed">
                    {film.description}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-gray-800 pt-3 mt-auto">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400" title={t("title_views")}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        {film.views}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400" title={t("title_shares")}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                        {film.shares}
                      </div>
                    </div>
                    <div className="text-[10px] text-gray-600">
                      {formatDate(film.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 border border-dashed border-gray-800 rounded-xl text-gray-500 text-sm bg-[#0F0F0F]">
              {t("no_films")}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;