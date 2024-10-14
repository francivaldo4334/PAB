# Projeto PAD (Plan And Build).

### Descrição
O **Projeto PAD** tem como objetivo estudar frameworks e criar uma plataforma simplificada para construção de sites. A plataforma visa proporcionar uma experiência intuitiva para desenvolvedores, facilitando a criação e o gerenciamento de sites através de uma estrutura modular e reutilizável.

### Objetivos
- Explorar e estudar diferentes frameworks de desenvolvimento web.
- Criar uma plataforma fácil de usar para construção de sites.
- Estabelecer uma arquitetura baseada em **Node.js** para facilitar o desenvolvimento web.

### Requisitos
- Node.js instalado.
- NPM (Node Package Manager).

### Tecnologias Utilizadas
- **Node.js**
- **NPM**: Gerenciamento de pacotes e scripts.
- **TypeScript**: Linguagem utilizada no desenvolvimento.
- **JavaScript**, **HTML**, **CSS**: Tecnologias nativas da web.
- **JQuery**: Biblioteca JavaScript para simplificar a manipulação de elementos HTML.

### Estrutura de Pastas
- **src/**: Diretório de desenvolvimento, onde o código é escrito em TypeScript e organizado em componentes reutilizáveis.
- **build/**: Diretório de produção, gerado após a execução do comando `npm run build`. Aqui, o código é convertido para HTML, CSS e JavaScript nativos.

### Scripts
- `npm run build`: Realiza o build da pasta `src` para a pasta `build`, criando o projeto final com tecnologias web nativas.
- `npm run server`: Inicia um servidor de desenvolvimento na porta 8080 para auxiliar na visualização e teste do site.
- `npm run watch`: Configura um serviço de monitoramento que recompila o projeto sempre que houver alterações no diretório `src`.

### Documentação das Tags Adicionais:
---
- ### Tag `comp`
  ##### Descrição
  A tag `comp` permite a criação de componentes reutilizáveis, facilitando o reaproveitamento de código.

  ##### Propriedades
  - `src`: Indica o caminho para o arquivo que define o componente.
  - `include`: Herda as propriedades do elemento pai, como classes e outros atributos. Exemplo: para herdar a classe CSS de um componente pai, utiliza-se `include="class"`.

  ##### Exemplo
  **src**
  ```html
  <!-- Declaração do componente ./descricao.html -->
  <h2><desc></desc></h2>
  
  <!-- Declaração do componente ./caixa_de_texto.html -->
  <div class="texto">
  <h1>Título</h1>
    <comp src="./descricao.html" desc="descrição" include="class"></comp>
    <comp src="./descricao.html" desc="descrição 2" include="class"></comp>
  </div>

  <!-- Uso do componente ./caixa_de_texto.html -->
  <comp src="./caixa_de_texto.html"></comp>
  ```

  **build**
  ```html
  <div class="texto">
    <h1 class="texto">Título</h1>
    <h2 class="texto">descrição</h2>
    <h2 class="texto">descrição 2</h2>
  </div>
  ```
---
### Tag `content`
- ##### Descrição
  A tag `content` permite a herança de conteúdo dentro de um componente declarado pela tag `comp`.

  ##### Propriedades
  A tag `content` não possui propriedades.

  ##### Exemplo
  **src**
  ```html
  <!-- Componente ./my_comp.html -->
  <div>
    <content></content>
  </div>
  
  <!-- Uso do componente -->
  <comp src="./my_comp.html">
    <h1>Olá</h1>
  </comp>
  ```

  **build**
  ```html
  <div>
    <h1>Olá</h1>
  </div>
  ```
