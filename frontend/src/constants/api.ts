//export const URL = "http://localhost:5001/";
//export const URL = "https://training-app-l28l.onrender.com/";

const isDevelopment = process.env.NODE_ENV === "development";

export const URL = isDevelopment
  ? "http://localhost:5001"
  : "https://training-app-l28l.onrender.com/";
