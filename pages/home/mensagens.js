// Função que insere quebra de linha a cada 80 caracteres
function formatarMensagem(texto, limite = 80) {
  // Utiliza expressão regular para encontrar blocos de 'limite' caracteres
  // e substitui cada bloco adicionando uma quebra de linha (\n) no final
  return texto.replace(new RegExp(`(.{${limite}})`, "g"), "$1\n");
}

// Cria uma referência ao banco de dados Firestore
const db = firebase.firestore();

// Cria uma referência à coleção "postagens" dentro do Firestore
const postagensRef = db.collection("postagens");

// Escuta mudanças no estado de autenticação (login/logout)
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // 🔹 Exibe o email do usuário logado
    const usuarioInfo = document.getElementById("usuarioInfo");
    usuarioInfo.textContent = `Bem-vindo: ${user.email}`;

    // Referências ao formulário e à lista de mensagens no HTML
    const form = document.getElementById("mensagemForm");
    const listaMensagens = document.getElementById("listaMensagens");

    // Captura o envio do formulário de mensagens
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // Evita recarregar a página ao enviar

      // Pega os campos de nome e mensagem
      const nomeInput = document.getElementById("nome");
      const mensagemInput = document.getElementById("mensagem");

      // Remove espaços extras no início/fim
      let nome = nomeInput.value.trim();
      let mensagem = mensagemInput.value.trim();

      // Se a mensagem estiver vazia, não envia
      if (!mensagem) return;

      // Aplica a função de formatação antes de salvar
      mensagem = formatarMensagem(mensagem);

      try {
        // Adiciona documento na coleção "postagens"
        await postagensRef.add({
          idUsuario: user.uid, // 🔹 salva apenas o UID do usuário
          nome,
          mensagem,
          createdAt: firebase.firestore.FieldValue.serverTimestamp() // salva data/hora do servidor
        });

        // Limpa os campos após salvar
        mensagemInput.value = "";
        nomeInput.value = "";

      } catch (error) {
        // Caso ocorra erro ao salvar
        console.error("Erro ao enviar mensagem:", error);
      }
    });

    // Escuta mudanças em tempo real na coleção "postagens"
    postagensRef.orderBy("createdAt", "desc").onSnapshot((snapshot) => {
      // Limpa a lista antes de renderizar novamente
      listaMensagens.innerHTML = "";

      // Percorre cada documento retornado
      snapshot.forEach((doc) => {
        const data = doc.data(); // Pega os dados do documento

        // Cria um elemento <div> para cada mensagem
        const item = document.createElement("div");
        item.classList.add("mensagem-item");

        // Cria um <span> para o texto da mensagem
        const texto = document.createElement("span");

        // 🔹 Formata a data/hora se existir
        let dataFormatada = "";
        if (data.createdAt) {
          const date = data.createdAt.toDate();
          dataFormatada = date.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          });
        }

        // 🔹 Mostra nome, mensagem e data
        texto.textContent = `${data.nome}: ${formatarMensagem(data.mensagem)}\n(${dataFormatada})`;
        item.appendChild(texto);

        // Se a mensagem foi enviada pelo usuário logado, adiciona botão de excluir
        if (data.idUsuario === user.uid) {
          const btnDelete = document.createElement("button");
          btnDelete.textContent = "🗑️"; // ícone de lixeira
          btnDelete.classList.add("btn-delete");

          // Ao clicar, deleta o documento do Firestore
          btnDelete.onclick = async () => {
            await postagensRef.doc(doc.id).delete();
          };

          item.appendChild(btnDelete);
        }

        // Adiciona o item na lista de mensagens
        listaMensagens.appendChild(item);
      });
    });
  } else {
    // Se não houver usuário logado, mostra mensagem alternativa
    const usuarioInfo = document.getElementById("usuarioInfo");
    usuarioInfo.textContent = "Nenhum usuário logado";
  }
});

