import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth"; // Importe o serviço de autenticação do Firebase
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCG-cLXqXjKZya_HY7fgsi6-jixLSMB1t4",
  authDomain: "cycletrack-ts.firebaseapp.com",
  projectId: "cycletrack-ts",
  storageBucket: "cycletrack-ts.appspot.com",
  messagingSenderId: "619328327967",
  appId: "1:619328327967:web:0d0856de25bbe25003202a",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; // Exporte o serviço de autenticação
