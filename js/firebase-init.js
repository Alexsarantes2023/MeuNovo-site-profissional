const firebaseConfig = {
    apiKey: 'AIzaSyAnfkXpd2nJNEZnoxc4EMx8sg0OfvRMqW0',
    authDomain: 'login-vanila-puro.firebaseapp.com',
    projectId: 'login-vanila-puro',
    storageBucket: 'login-vanila-puro.firebasestorage.app',
    messagingSenderId: '805528192149',
    appId: '1:805528192149:web:9dcbe615c77e62a469479c'
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// A pagina pode estar na raiz (index.html) ou dentro de /html/.
// O caminho do login tem de ser relativo ao HTML que carregou este script.
const caminhoLogin = window.location.pathname.indexOf('/html/') !== -1
    ? './login.html'
    : './html/login.html';

auth.onAuthStateChanged((user) => {
    const btn = document.getElementById('logoutBtn');
    const info = document.getElementById('usuarioInfo');

    // Nem toda pagina tem a barra de usuario (login e cadastro, por exemplo).
    if (info) {
        info.textContent = user
            ? (user.displayName || user.email)
            : 'Faça login para acessar sua conta';
    }

    if (btn) {
        btn.textContent = user ? 'Exit' : 'Login';
        btn.onclick = user
            ? logout
            : function () {
                window.location.href = caminhoLogin;
            };
    }
});

function logout() {
    auth.signOut().catch((error) => {
        console.error('Erro ao fazer logout:', error);
    });
}
