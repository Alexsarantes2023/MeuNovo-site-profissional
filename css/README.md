# Organização do CSS

Este diretório foi reorganizado para eliminar duplicidade entre folhas de estilo.
Cada página carrega no máximo quatro arquivos, sempre na ordem:

1. base compartilhada (quando existir)
2. layout/componentes compartilhados
3. layout/componentes de uso amplo
4. CSS específico da página (`pages/...`)

## Estrutura

```text
css/
|-- global.css                # Base das páginas de autenticação (home, register)
|-- style.css                 # Reset/cores do site + carrossel principal (hero)
|-- stylescybersecurity.css   # Header, menu, rodapé e ícones fixos + estilos da página cyber
|-- components.css            # Cards, planos, perguntas, pagamentos, contato, rodapé (margem dos ícones)
|-- usuarioPosts.css          # Barra de usuário (header2) e ícones fixos
|-- mensagens.css             # Componente de lista de mensagens (index + home)
|-- pages/
|   |-- beneficios.css        # Carrossel da seção "Benefícios" (antigo styles2.css)
|   |-- dev.css               # Layout das páginas dev-web-fullstack e dev-desktop-mobile (antigo styles7.css)
|   |-- dev-desktop.css       # Ajustes exclusivos de dev-desktop-mobile (antigo styles8.css)
|   |-- lgpd.css              # Termos de uso/LGPD (antigo styles4.css + base que vinha de index_login.css)
|   |-- login.css             # Login completo (stylelogin + index_login + global2)
|   |-- home/home.css         # Página protegida de postagens
|   |-- register/register.css # Página de cadastro
```

## Quem carrega o quê

| Página | Folhas |
|---|---|
| `index.html` | `style.css`, `pages/beneficios.css`, `components.css`, `stylescybersecurity.css`, `usuarioPosts.css`, `mensagens.css` |
| `html/cyber-security.html` | `usuarioPosts.css`, `stylescybersecurity.css` |
| `html/dev-web-fullstack.html` | `style.css`, `components.css`, `pages/dev.css`, `usuarioPosts.css`, `stylescybersecurity.css` |
| `html/dev-desktop-mobile.html` | idem + `pages/dev-desktop.css` |
| `html/lei_geral_lgpd.html` | `style.css`, `components.css`, `pages/lgpd.css`, `stylescybersecurity.css` |
| `html/login.html` | `stylescybersecurity.css`, `pages/login.css` |
| `html/pages/home/home.html` | `global.css`, `pages/home/home.css`, `mensagens.css` |
| `html/pages/register/register.html` | `global.css`, `pages/register/register.css` |

## O que foi consolidado

- `global2.css` e `index_login.css` deixaram de existir: o conteúdo do login foi para
  `pages/login.css` e as regras que a LGPD usava foram para `pages/lgpd.css`.
- O rodapé e os ícones fixos estavam duplicados em `styles3.css` e
  `stylescybersecurity.css`. Passaram a existir só em `stylescybersecurity.css`
  (carregado por todas as páginas públicas que têm rodapé).
- `styles2.css`, `styles3.css`, `styles4.css`, `styles7.css` e `styles8.css` foram
  renomeados para nomes que dizem a que página pertencem.
- O bloco `.mensagem-item` estava duplicado em `usuarioPosts.css` e
  `pages/home/home.css`. Virou `mensagens.css`, usado só por index e home.
- Foram removidos blocos de CSS comentado (código morto) em `pages/home/home.css`.

## Regras ao adicionar estilos

- Estilo usado por mais de uma página: criar/editar um arquivo compartilhado
  (`components.css` ou `stylescybersecurity.css`), nunca copiar para outra folha.
- Estilo de uma única página: colocar em `pages/<pagina>.css`.
- `url(...)` em CSS é relativo ao **arquivo CSS**, não à página. Ao mover uma
  folha de pasta, ajuste os `../` (foi o que quebrou o fundo do login quando a
  regra saiu de `css/index_login.css` para `css/pages/login.css`).
- Respeitar a ordem de carregamento das tabelas acima; CSS de página entra por último
  para poder sobrescrever o compartilhado sem `!important`.
- `login.css` e `lgpd.css` são autocontidos de propósito: login e LGPD não carregam
  `global.css` nem `components.css`.

## Observação sobre `@keyframes`

`pages/beneficios.css` mantém `showMainImage`/`hideMainImage` repetidos dentro de
media queries. Não são duplicatas: são variantes por breakpoint (CSS não permite
escopar `@keyframes` por largura de tela). Não remover as repetições.
