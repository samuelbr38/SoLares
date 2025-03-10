// Importações do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signOut
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

// Função para exibir notificações
export function showNotification(message, type = "success") {
    const notificationContainer = document.getElementById("notification-container");

    // Cria a notificação
    const notification = document.createElement("div");
    notification.classList.add("notification", type);

    // Ícone da notificação
    const icon = document.createElement("span");
    icon.classList.add("notification-icon");

    switch (type) {
        case "success":
            icon.innerHTML = "✔️"; // Ícone de sucesso
            break;
        case "error":
            icon.innerHTML = "❌"; // Ícone de erro
            break;
        case "info":
            icon.innerHTML = "ℹ️"; // Ícone de informação
            break;
        default:
            icon.innerHTML = "ℹ️"; // Ícone padrão
    }

    // Mensagem da notificação
    const messageText = document.createElement("span");
    messageText.innerText = message;

    // Botão de fechar
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close-btn");
    closeBtn.innerHTML = "&times;"; // Ícone de "X"
    closeBtn.onclick = () => {
        notification.style.animation = "slideOut 0.5s ease-out";
        setTimeout(() => {
            notification.remove();
        }, 500); // Remove após a animação
    };

    // Adiciona os elementos à notificação
    notification.appendChild(icon);
    notification.appendChild(messageText);
    notification.appendChild(closeBtn);

    // Adiciona a notificação ao container
    notificationContainer.appendChild(notification);

    // Remove a notificação após 5 segundos
    setTimeout(() => {
        notification.style.animation = "slideOut 0.5s ease-out";
        setTimeout(() => {
            notification.remove();
        }, 500); // Remove após a animação
    }, 5000);
}

// Função para criar conta
export async function criarConta(email, senha, nome) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        // Envia e-mail de verificação
        await sendEmailVerification(user);

        // Salva o nome do usuário no Firestore
        await setDoc(doc(db, "usuarios", user.uid), {
            nome: nome,
            email: email,
            emailVerificado: false // Adiciona um campo para verificação de e-mail
        });

        showNotification("Conta criada com sucesso! Verifique seu e-mail.", "success");
        window.location.href = "/9a8b7c6d-5e4f-3a2b-1c0d-9e8f7a6b5c4d"; // Redireciona para o login (URL aleatória)
    } catch (error) {
        showNotification("Erro ao criar conta: " + error.message, "error");
    }
}

// Função para login
export async function fazerLogin(email, senha) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        // Verifica se o e-mail foi confirmado
        if (!user.emailVerified) {
            showNotification("Por favor, verifique seu e-mail antes de fazer login.", "error");
            await signOut(auth); // Desloga o usuário
            return;
        }

        showNotification("Login realizado com sucesso!", "success");
        window.location.href = "/a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d"; // Redireciona para o dashboard (URL aleatória)
    } catch (error) {
        showNotification("Erro ao fazer login: " + error.message, "error");
    }
}

// Função para recuperar senha
export async function recuperarSenha(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        showNotification("E-mail de redefinição de senha enviado!", "success");
    } catch (error) {
        showNotification("Erro ao enviar e-mail de redefinição: " + error.message, "error");
    }
}