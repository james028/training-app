import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        Sun: "Sunday",
        Mon: "Monday",
        Tue: "Tuesday",
        Wed: "Wednesday",
        Thu: "Thursday",
        Fri: "Friday",
        Sat: "Saturday",
        January: "January",
        February: "February",
        March: "March",
        April: "April",
        May: "May",
        June: "June",
        July: "July",
        August: "August",
        September: "September",
        October: "October",
        November: "November",
        December: "December",
        CountOfTrainingsByMonths:
          "Number of training sessions in a given month",
      },
    },
    pl: {
      translation: {
        Sun: "Niedziela",
        Mon: "Poniedziałek",
        Tue: "Wtorek",
        Wed: "Środa",
        Thu: "Czwartek",
        Fri: "Piątek",
        Sat: "Sobota",
        January: "Styczeń",
        February: "Luty",
        March: "Marzec",
        April: "Kwiecień",
        May: "Maj",
        June: "Czerwiec",
        July: "Lipiec",
        August: "Sierpień",
        September: "Wrzesień",
        October: "Październik",
        November: "Listopad",
        December: "Grudzień",
        CountOfTrainingsByMonths: "Ilość treningów w danym miesiącu",
      },
    },
    // Dodaj więcej języków, jeśli jest to potrzebne
  },
  lng: "pl",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // Nie escapuj wartości (np. dla HTML)
  },
});

export default i18n;
