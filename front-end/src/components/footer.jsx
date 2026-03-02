import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faYoutube,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from 'react-i18next'; 

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); 
  const [message, setMessage] = useState("");

  const { t } = useTranslation("common");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:3000/api/newsletter/subscribe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage('footer.msg_success'); 
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || 'footer.msg_error_default'); 
      }
    } catch {
      setStatus("error");
      setMessage('footer.msg_error_network'); 
    }
  };

  return (
    <footer className="bg-[#282828] flex flex-col justify-center items-center py-24 px-2.5 w-full">
      <div className="flex flex-col justify-center items-center gap-20 w-full max-w-290">
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-20 w-full max-w-285">
          
          {/* Left Content */}
          <div className="flex flex-col items-start gap-9 w-full max-w-132.5 p-2.5">
            <div className="flex flex-row justify-center items-center p-5 w-31.25 h-15 bg-brand-blue rounded-xl">
              <span className="font-['Inter'] font-extrabold text-[18px] leading-5.5 uppercase text-[#FFFFFF]">
                MARS.A.I
              </span>
            </div>

            <p className="font-['Plus_Jakarta_Sans'] font-[500] text-[16px] leading-[20px] tracking-[0.16em] text-[#F2F3F5] max-w-[510px]">
             {t('footer.description')}
            </p>

            <div className="flex flex-row flex-wrap items-start content-start gap-[36px] w-full max-w-[510px]">
              <a href="#" className="w-[42px] h-[42px] bg-[#333333] rounded-full flex items-center justify-center text-white hover:bg-[#246BAD] transition-colors">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="w-[42px] h-[42px] bg-[#333333] rounded-full flex items-center justify-center text-white hover:bg-[#246BAD] transition-colors">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="w-[42px] h-[42px] bg-[#333333] rounded-full flex items-center justify-center text-white hover:bg-[#246BAD] transition-colors">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a href="#" className="w-[42px] h-[42px] bg-[#333333] rounded-full flex items-center justify-center text-white hover:bg-[#246BAD] transition-colors">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </div>
          </div>

          {/* Right Content / StatCard */}
          <div className="flex flex-col justify-center items-center p-[10px] gap-[10px] w-full max-w-[530px]">
            <div className="box-border flex flex-col justify-center items-center p-[32px] gap-[24px] w-full max-w-[510px] min-h-[262px] bg-[#333333] border border-[#484848] shadow-[0px_4px_10px_rgba(0,0,0,0.05)] rounded-[24px]">
              <h3 className="font-['Plus_Jakarta_Sans'] font-[800] text-[32px] leading-[40px] text-center uppercase text-[#FFFFFF]">
                {t('footer.newsletter_title')}
              </h3>

              <form
                onSubmit={handleSubscribe}
                className="box-border flex flex-row justify-between items-center py-[10px] pl-[24px] pr-[10px] w-full max-w-[363px] min-h-[57px] bg-[#3D3D3D] border border-[#484848] rounded-[999px]"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter_placeholder')}
                  disabled={status === "loading"}
                  required
                  className="bg-transparent outline-none font-['Inter'] font-[200] text-[14px] leading-[17px] text-[#FFFFFF] placeholder-[#FFFFFF]/60 w-full mr-4"
                />

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex flex-row justify-center items-center cursor-pointer py-[10px] px-[24px] bg-[#246BAD] rounded-[999px] font-['Inter'] font-[700] text-[14px] leading-[17px] uppercase text-[#FFFFFF] hover:bg-[#1a5287] transition-colors disabled:opacity-70 whitespace-nowrap"
                >
                  {status === "loading" ? t('footer.newsletter_loading') : t('footer.newsletter_btn')}
                </button>
              </form>

              {message && (
                <span className={`text-sm ${status === "success" ? "text-green-400" : "text-red-400"}`}>
                  {t(message)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1140px] gap-8 md:gap-0">
          <div className="flex flex-row flex-wrap justify-center items-center gap-[40px] md:gap-[80px]">
            <Link
              to="/content/mentions-legales"
              className="font-['Plus_Jakarta_Sans'] cursor-pointer font-[700] text-[14px] leading-[18px] uppercase text-[#64748B] hover:text-[#FFFFFF] transition-colors"
            >
              {t('footer.link_legal')}
            </Link>
            <Link
              to="/content/presse"
              className="font-['Plus_Jakarta_Sans'] cursor-pointer font-[700] text-[14px] leading-[18px] uppercase text-[#64748B] hover:text-[#FFFFFF] transition-colors"
            >
              {t('footer.link_press')}
            </Link>
            <Link
              to="/contact"
              className="font-['Plus_Jakarta_Sans'] cursor-pointer font-[700] text-[14px] leading-[18px] uppercase text-[#64748B] hover:text-[#FFFFFF] transition-colors"
            >
              {t('footer.link_contact')}
            </Link>
          </div>

          <div className="font-['Plus_Jakarta_Sans'] cursor-pointer font-[700] text-[14px] leading-[18px] uppercase text-[#64748B]">
            © {new Date().getFullYear()} MARS.A.I
          </div>
        </div>
      </div>
    </footer>
  );
}