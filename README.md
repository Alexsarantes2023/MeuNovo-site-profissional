# Projeto limpo

Versao reorganizada do site, mantendo apenas as paginas e os recursos locais
referenciados pelo site e suas dependencias.

## Estrutura

- `index.html`: pagina principal e ponto de entrada.
- `login.html`: redirecionamento de compatibilidade para `html/login.html`.
- `html/`: demais paginas do site.
- `css/`: folhas de estilo.
- `js/`: scripts.
- `assets/images/`: imagens utilizadas.
- `assets/videos/`: videos utilizados.
- `downloads/`: aplicativo Android para download.

Os caminhos internos foram atualizados para a nova estrutura. O JavaScript
continua separado em `js/`; redirecionamentos relativos sao resolvidos em
relacao a pagina HTML que os carrega.

## Como abrir

Sirva esta pasta com um servidor estatico local e abra `index.html`. Login,
cadastro e mensagens dependem dos servicos Firebase configurados no projeto.
O endereço antigo `/login.html` redireciona para `html/login.html`.
