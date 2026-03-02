import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend) // Dit à i18n d'aller chercher les fichiers .json
  .use(initReactI18next) // Passe i18n à React
  .init({
    fallbackLng: 'fr', // Langue de secours si l'anglais plante
    lng: 'fr', // Langue par défaut au chargement
    
    backend: {
      // Le chemin où i18n va chercher tes fichiers (dans le dossier public)
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    interpolation: {
      escapeValue: false, // Inutile avec React
    }
  });

export default i18n;