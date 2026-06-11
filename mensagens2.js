// Função para formatar mensagens longas
function formatarMensagem(texto, limite = 80) {
  return texto.replace(new RegExp(`(.{${limite}})`, "g"), "$1\n");
}

const db = firebase.firestore();
const postagensRef = db.collection("postagens");

firebase.auth().onAuthStateChanged((user) => {
  const usuarioInfo = document.getElementById("usuarioInfo");
  const listaMensagens = document.getElementById("listaMensagens");

  if (user) {
    usuarioInfo.textContent = `${user.email}`;
  } else {
    usuarioInfo.textContent = "Visitante (não logado)";
  }

  // 🔹 LISTAGEM DAS POSTAGENS (sempre visível)
  postagensRef.orderBy("createdAt", "desc").onSnapshot(
    (snapshot) => {
      listaMensagens.innerHTML = "";

      if (snapshot.empty) {
        listaMensagens.textContent = "Nenhuma mensagem encontrada.";
        return;
      }

      snapshot.forEach((doc) => {
        const data = doc.data();
        const item = document.createElement("div");
        item.classList.add("mensagem-item");

        const texto = document.createElement("span");

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

        texto.textContent = `${data.nome}: ${formatarMensagem(data.mensagem)}\n(${dataFormatada})`;
        item.appendChild(texto);

        listaMensagens.appendChild(item);
      });
    },
    (error) => {
      console.error("Erro ao carregar mensagens:", error);
      listaMensagens.textContent = "Erro ao carregar mensagens: " + error.message;
    }
  );
});

