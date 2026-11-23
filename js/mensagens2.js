/* Postagens dos Visitantes: leitura do Firestore e renderizacao em cards */
(function () {
  // O onAuthStateChanged dispara mais de uma vez; a assinatura é criada só na primeira
  var listaIniciada = false;

  function montarData(data) {
    if (!data.createdAt || typeof data.createdAt.toDate !== "function") {
      return "";
    }

    return data.createdAt.toDate().toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function criarCardPostagem(data) {
    var card = document.createElement("article");
    card.classList.add("mensagem-card");

    var topo = document.createElement("div");
    topo.classList.add("mensagem-topo");

    var nome = (data.nome || "Visitante").trim() || "Visitante";

    var avatar = document.createElement("span");
    avatar.classList.add("mensagem-avatar");
    avatar.textContent = nome.charAt(0).toUpperCase();

    var nomeEl = document.createElement("strong");
    nomeEl.classList.add("mensagem-nome");
    nomeEl.textContent = nome;

    var dataEl = document.createElement("span");
    dataEl.classList.add("mensagem-data");
    dataEl.textContent = montarData(data);

    topo.appendChild(avatar);
    topo.appendChild(nomeEl);
    topo.appendChild(dataEl);

    var texto = document.createElement("p");
    texto.classList.add("mensagem-texto");
    texto.textContent = data.mensagem || "";

    card.appendChild(topo);
    card.appendChild(texto);
    return card;
  }

  function criarAviso(classe, mensagem) {
    var aviso = document.createElement("p");
    aviso.classList.add(classe);
    aviso.textContent = mensagem;
    return aviso;
  }

  firebase.auth().onAuthStateChanged(function () {
    if (listaIniciada) return;

    var listaMensagens = document.getElementById("listaMensagens");
    if (!listaMensagens) return;

    listaIniciada = true;

    firebase.firestore().collection("postagens")
      .orderBy("createdAt", "desc")
      .onSnapshot(
        function (snapshot) {
          listaMensagens.innerHTML = "";

          if (snapshot.empty) {
            listaMensagens.appendChild(
              criarAviso("mensagens-vazio", "Ainda não há postagens. Faça login e deixe a sua!")
            );
            return;
          }

          snapshot.forEach(function (doc) {
            listaMensagens.appendChild(criarCardPostagem(doc.data()));
          });
        },
        function (error) {
          console.error("Erro ao carregar mensagens:", error);
          listaMensagens.innerHTML = "";
          listaMensagens.appendChild(
            criarAviso("mensagens-erro", "Não foi possível carregar as postagens agora.")
          );
        }
      );
  });
})();
