## Projeto PAD
#### É um projeto feito para estudar frameworks e para criar uma plataforma de criação de sites.
## Objetivos:
- Estudo de Frameworks (criando uma estrutura com node para facilitar o desenvolvimento web).
- Criar uma plataforma de criação de sites intuitiva e simplificada.
## Requisitos:
- Nodejs instalado.
- Npm
## Tecnologias:
- Node
- Npm
- TypeScript
- JavaScript
- HTML
- CSS
- JQuery
## Estrutura de pastas:
- src
  - Local de desenvolvimento onde o desenvolvedor trabalhara com typescript e estruturas de components.
- build
  - Projeto final onde apos a execução do 'npm run build' sera criado o projeto final com as tecnologias nativas da web html, css e javascript.
## Scripts:
``` bash
npm run build
# Faz um build da pasta src para a pasta buid criando um projeto web nativo.
```
``` bash
npm run server
# Cria um serviço na porta 8080 para ajudar no desenvolvimento do site
```
``` bash
npm run watch
# Cria um serviço de reload onde sempre que ouver alguma alterção na pasta src executara o build do projeto.
```
## Documentação de tags adicionais
- #### comp
  ##### Descrição:
  Esta tag permite o reapromeitamento de codigo criando um componente reutilizavel
  ##### Propriedades:
    - src: indica o caminho para o componente que a tag comp represeta.
    - include: herda a propriedade de seu componente pai ex: para o componente herdar a propriedade class vinda de sua tag pai devisse adicionar a propriedade include="class".
    - propriedades de declaração.
  ##### Exemplo:<p>
  src
  ```htm
    # Declaração do componente ./descricao.html
    <h2><desc></desc></h2>
    # Declaração do componente ./caixa_de_texto.html
    <div class="texto">
      <h1>titúlo</h1>
      <comp src="./descricao.html" desc="descrição" include="class"></comp>
      <comp src="./descricao.html" desc="descrição 2" include="class"></comp>
    <div>
    #Uso do componente ./caixa_de_texto.html
    <comp src="./caixa_de_texto.html"></comp>
  ```
  build
  ```html
  <div class="texto">
    <h1 class="texto">titúlo</h1>
    <h2 class="texto">descrição</h2>
    <h2 class="texto">descrição 2</h2>
  </div>
  ```
- #### content
  ##### Descrição:
  Esta tag permite herdar o conteudo vindo da declaração da tag comp <p>
  ##### Propriedades:
  Não possui propriedades.
  ##### Exemplo:<p>
    src
    ```html
      # component ./my_comp.html
      <div>
        <content></content>
      </div>
      # uso do component
      <comp src="./my_comp.html">
        <h1>Olá</h1>
      </comp>
      ```
    build
    ```html
    <div>
      <h1>Olá</h1>
    </div>
    ```
