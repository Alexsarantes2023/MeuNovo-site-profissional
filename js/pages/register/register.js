firebase.auth().onAuthStateChanged(user => {
    // Observa mudanças no estado de autenticação do usuário (logado ou não)
    if (user) {
        // Se o usuário estiver logado, redireciona para a página "home"
        window.location.href = "../home/home.html";
    }
})

function irparalogin() {
    // Função que redireciona para a página de login
    window.location.href = "../../login.html";
}

function onChangeEmail() {
    const email = form.email().value; // Pega o valor digitado no campo de email
    
    // Mostra ou esconde mensagem de "email obrigatório"
    form.emailRequiredError().style.display = email ? "none" : "block";

    // Mostra ou esconde mensagem de "email inválido"
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

    // Atualiza o estado do botão de registro (habilitado/desabilitado)
    toggleRegisterButtonDisable();
}

function onChangePassword() {
    const password = form.password().value; // Pega o valor digitado no campo de senha
    
    // Mostra ou esconde mensagem de "senha obrigatória"
    form.passwordRequiredError().style.display = password ? "none" : "block";

    // Mostra ou esconde mensagem de "senha muito curta"
    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";

    // Valida se as senhas coincidem
    validatePasswordsMatch();
    // Atualiza o estado do botão de registro
    toggleRegisterButtonDisable();
}

function onChangeConfirmPassword() {
    // Valida se senha e confirmação são iguais
    validatePasswordsMatch();
    // Atualiza o botão de registro
    toggleRegisterButtonDisable();
}

function register() {
    showLoading(); // Mostra tela de carregamento

    const email = form.email().value; // Pega email digitado
    const password = form.password().value; // Pega senha digitada
    
    // Cria usuário no Firebase com email e senha
    firebase.auth().createUserWithEmailAndPassword(
        email, password
    ).then(() => {
        hideLoading(); // Esconde tela de carregamento
        window.location.href = "../../pages/home/home.html"; // Redireciona para home
    }).catch(error => {
        hideLoading(); // Esconde tela de carregamento
        alert(getErrorMessage(error)); // Mostra mensagem de erro
    })
}

function getErrorMessage(error) {
    // Se o erro for "email já em uso", retorna mensagem personalizada
    if (error.code == "auth/email-already-in-use") {
        return "Email já está em uso";
    }
    // Caso contrário, retorna a mensagem padrão do Firebase
    return error.message;
}

function validatePasswordsMatch() {
    const password = form.password().value; // Pega senha
    const confirmPassword = form.confirmPassword().value; // Pega confirmação
    
    // Mostra ou esconde mensagem de "senhas não coincidem"
    form.confirmPasswordDoesntMatchError().style.display =
        password == confirmPassword ? "none" : "block";
}

function toggleRegisterButtonDisable() {
    // Habilita ou desabilita o botão de registro conforme a validação do formulário
    form.registerButton().disabled = !isFormValid();
}

function isFormValid() {
    const email = form.email().value;
    // Email vazio ou inválido → formulário inválido
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = form.password().value;
    // Senha vazia ou menor que 6 caracteres → inválido
    if (!password || password.length < 6) {
        return false;
    }

    const confirmPassword = form.confirmPassword().value;
    // Senha e confirmação diferentes → inválido
    if (password != confirmPassword) {
        return false;
    }

    // Se passou por todas as verificações → válido
    return true;
}

const form = {
    // Mapeia os elementos do formulário pelo ID para facilitar acesso
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    registerButton: () => document.getElementById('register-button')
}
