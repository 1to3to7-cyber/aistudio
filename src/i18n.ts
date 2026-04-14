import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "app_name": "RWANDA TVET LOGBOOK FORM",
      "home": "Home",
      "logbook": "Logbook",
      "stats": "Stats",
      "profile": "Profile",
      "about": "About",
      "new_entry": "New Entry",
      "export_pdf": "Export PDF",
      "save_log": "Save Log Entry",
      "task_performed": "Task Performed",
      "hours_spent": "Hours Spent",
      "tools": "Tools",
      "materials": "Materials",
      "steps": "Key Steps",
      "magic_fill": "Magic Fill",
      "suggest": "Suggest",
      "assistant_greeting": "Muraho! I am your Imigongo Assistant. How can I help you with your TVET logbook today?",
      "ask_placeholder": "Ask about the platform...",
      "total_hours": "Total Hours",
      "badges": "Badges",
      "trade": "Trade",
      "theme": "Theme",
      "language": "Language",
      "date": "Date of Task",
      "trade_student": "{{trade}} Student",
      "select_trade": "Select Your Trade",
      "choose_theme": "Choose Theme",
      "school": "School Name",
      "level": "Level (e.g. A2)",
      "id_number": "National ID Number",
      "phone": "Phone Number",
      "email": "Email Address",
      "year": "Academic Year",
      "dev_info": "Developer Info",
      "dev_name": "Bizimana Fils"
    }
  },
  rw: {
    translation: {
      "app_name": "RWANDA TVET LOGBOOK FORM",
      "home": "Ahabanza",
      "logbook": "Igitabo cy'akazi",
      "stats": "Imibare",
      "profile": "Umwirondoro",
      "about": "Ibyerekeye",
      "new_entry": "Andika akazi",
      "export_pdf": "Sohora PDF",
      "save_log": "Bika akazi",
      "task_performed": "Akazi kagezweho",
      "hours_spent": "Amasaha yakoreshejwe",
      "tools": "Ibikoresho",
      "materials": "Ibikoresho by'ibanze",
      "steps": "Intambwe z'akazi",
      "magic_fill": "Ubufasha bwa AI",
      "suggest": "Ehura",
      "assistant_greeting": "Muraho! Ndi umufasha wawe wa Imigongo. Ngufashe iki uyu munsi?",
      "ask_placeholder": "Baza ikibazo...",
      "total_hours": "Amasaha yose",
      "badges": "Imidari",
      "trade": "Umwuga",
      "theme": "Isura",
      "language": "Ururimi",
      "date": "Itariki",
      "trade_student": "Umunyeshuri wa {{trade}}",
      "select_trade": "Hitamo umwuga wawe",
      "choose_theme": "Hitamo isura",
      "school": "Izina ry'ishuri",
      "level": "Icyiciro (urugero: A2)",
      "id_number": "Indangamuntu",
      "phone": "Nimero ya terefone",
      "email": "Imeri",
      "year": "Umwaka w'ishuri",
      "dev_info": "Ibyerekeye uwakoze porogaramu",
      "dev_name": "Bizimana Fils"
    }
  },
  fr: {
    translation: {
      "app_name": "RWANDA TVET LOGBOOK FORM",
      "home": "Accueil",
      "logbook": "Carnet",
      "stats": "Stats",
      "profile": "Profil",
      "about": "À propos",
      "new_entry": "Nouvelle entrée",
      "export_pdf": "Exporter PDF",
      "save_log": "Enregistrer l'entrée",
      "task_performed": "Tâche effectuée",
      "hours_spent": "Heures passées",
      "tools": "Outils",
      "materials": "Matériaux",
      "steps": "Étapes clés",
      "magic_fill": "Remplissage IA",
      "suggest": "Suggérer",
      "assistant_greeting": "Muraho ! Je suis votre assistant Imigongo. Comment puis-je vous aider aujourd'hui ?",
      "ask_placeholder": "Posez une question...",
      "total_hours": "Heures totales",
      "badges": "Badges",
      "trade": "Métier",
      "theme": "Thème",
      "language": "Langue",
      "date": "Date de la tâche",
      "trade_student": "Étudiant en {{trade}}",
      "select_trade": "Choisissez votre métier",
      "choose_theme": "Choisissez le thème",
      "school": "Nom de l'école",
      "level": "Niveau (ex: A2)",
      "id_number": "Numéro d'identité",
      "phone": "Numéro de téléphone",
      "email": "Adresse e-mail",
      "year": "Année académique",
      "dev_info": "Infos développeur",
      "dev_name": "Bizimana Fils"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
