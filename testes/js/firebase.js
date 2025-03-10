// Importações do Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAO4rL10qFCi2zZWpPKPwclhzKu_oCLdhY",
    authDomain: "solares-ef0ad.firebaseapp.com",
    projectId: "solares-ef0ad",
    storageBucket: "solares-ef0ad.appspot.com",
    messagingSenderId: "179859486528",
    appId: "1:179859486528:web:a69040ae4d5105b95f2ca5"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços
export const auth = getAuth(app);
export const db = getFirestore(app);