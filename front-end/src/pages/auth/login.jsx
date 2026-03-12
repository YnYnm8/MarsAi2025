import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/authContext"; 
import { VITE_API_URL_FRONTEND } from "../../services/config";
import mailIcon from "/src/assets/mail.png";
import logo from "/src/assets/icon-stars.png";
import cadenaIcon from "/src/assets/cadena.png";

const loginSchema = z.object({
  email: z.string().email("val_email_invalid"),
  password: z
    .string({ required_error: 'val_pwd_required' })
    .min(8, 'val_pwd_min')
    .regex(/[A-Z]/, 'val_pwd_upper')
    .regex(/[a-z]/, 'val_pwd_lower')
    .regex(/[0-9]/, 'val_pwd_num')
    .regex(/[^a-zA-Z0-9]/, "val_pwd_special"),
});

const Login = () => {
  const { t } = useTranslation("login"); 
  const location = useLocation();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const { refreshAuth } = useAuth(); 

  const successMessage = location.state?.successMessage;

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (formData) => {
    setServerError("");

    try {
      const response = await fetch(`${VITE_API_URL_FRONTEND}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message) {
          setServerError(t(data.message, { defaultValue: t("error_login_failed") }));
        } else {
          setServerError(t("error_login_failed"));
        }
        return; 
      }

      
      console.log("Connexion réussie !");
      await refreshAuth();
      navigate("/profile", { 
        state: { successMessage: "success_login" },
      });

    } catch (err) {
      console.error(err);
      setServerError(t("error_network"));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500 selection:text-white">

      {/* --- BANNIÈRE --- */}
      <div className="h-48 w-full bg-gradient-to-r from-blue-900 via-purple-900 to-black absolute top-0 left-0 z-0">
          <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="min-h-screen flex flex-col items-center px-6 pt-24 pb-12 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-widest text-white drop-shadow-lg">
            {t("title")}
          </h1>

          <div className="flex items-center justify-center gap-3 mt-3">
            <img
              src={logo}
              alt="Logo"
              className="h-5 w-auto object-contain brightness-200"
            />
            <p className="text-xs tracking-[0.25em] text-gray-400 font-medium">
              {t("subtitle")}
            </p>
          </div>
        </div>

        <div className="w-full max-w-sm bg-[#111] border border-gray-800 rounded-2xl shadow-2xl shadow-purple-900/10 px-6 py-8">
          
          {/* Message de succès */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-900/20 border border-green-800/50 rounded text-green-400 text-xs text-center font-bold">
              {t(successMessage)}
            </div>
          )}

          {/* Message d'erreur Serveur */}
          {serverError && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-800/50 rounded text-red-400 text-xs text-center font-bold">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* EMAIL */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 tracking-[0.2em] mb-2 uppercase">
                {t("label_email")}
              </label>
              <div className={`flex items-center bg-black rounded-xl px-4 py-3 border transition-colors ${errors.email ? "border-red-500" : "border-gray-700 focus-within:border-blue-500"}`}>
                <img
                  src={mailIcon}
                  alt="logoMail"
                  className="h-5 w-auto object-contain mr-3 invert opacity-70"
                />
                <input
                  type="email"
                  placeholder={t("placeholder_email")}
                  className="bg-transparent w-full outline-none text-sm text-white placeholder-gray-600 font-medium"
                  {...register("email")}
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">{t(errors.email.message)}</p>}
            </div>

            {/* MOT DE PASSE */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 tracking-[0.2em] mb-2 uppercase">
                {t("label_password")}
              </label>
              <div className={`flex items-center bg-black rounded-xl px-4 py-3 border transition-colors ${errors.password ? "border-red-500" : "border-gray-700 focus-within:border-blue-500"}`}>
                <img
                  src={cadenaIcon}
                  alt="logoCadena"
                  className="h-5 w-auto object-contain mr-3 invert opacity-70"
                />
                <input
                  type="password"
                  placeholder="••••••••••"
                  className="bg-transparent w-full outline-none text-sm text-white placeholder-gray-600 font-medium"
                  {...register("password")}
                />
              </div>
              {errors.password && <p className="text-red-500 text-[10px] mt-1 font-bold">{t(errors.password.message)}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black cursor-pointer hover:bg-gray-200 font-bold py-3 rounded-full transition mt-4 tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t("btn_submitting") : t("btn_submit")}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 border-t border-gray-800"></div>

          {/* Register link */}
          <p className="text-center text-xs text-gray-500 tracking-wide">
            {t("new_user")}{" "}
            <Link
              to="/register"
              className="font-bold text-gray-300 hover:text-white transition-colors ml-1"
            >
              {t("register_link")}
            </Link>
          </p>
        </div>

        {/* Bottom back link */}
        <Link
          to="/"
          className="mt-8 text-sm text-blue-500 hover:text-blue-400 font-semibold flex items-center gap-2 transition-colors"
        >
          {t("back_home")}
        </Link>
      </div>
    </div>
  );
};

export default Login;
