<h1 align="center"> Spring Boot Crud Api </h1>

## Índice

- [Sobre](#Sobre)
- [Tecnologias Utilizadas](#Tecnologias)
- [Iniciando o projeto](#Iniciando)
- [Testes](#Testes)

<hr>


<!-- About -->

# Sobre

<p align="left"> Challenge Dr. Consulta. </p>
<p align="left"> Api criada para o gerenciamento das vagas das empresas cadastradas. </p>

<!-- TECHNOLOGIES -->

# Tecnologias

- **Tecnologias**
  - [NestJs](https://nestjs.com/)
  - [Docker](https://www.docker.com/)
  - [Spring Boot](https://www.mysql.com/)

<hr>


<!-- TECHNOLOGIES -->

# Iniciando

### Pré-requisitos

- Docker instalado

  ```sh
  https://www.docker.com/
  ```

- Docker Compose instalado

  ```sh
  https://docs.docker.com/compose/
  ```

<hr>

### Uso

1 - Após ter o docker e o docker-compose instalados em sua máquina execute a api executando o comando abaixo no terminal:
      ```sh
        docker-compose up app
      ```

2 - Após a execução do comando aguarde a aplicação iniciar, primeiramente será criada a base de dados, após isso as migrations serão geradas e por fim a api ira iniciar.

3 - Quando receber a mensagem no terminal "App running on port 3000".

4 - A api estará acessivel no [Link](http://localhost:3000) e o link do swagger estará disponível [Aqui](http://localhost:3000/api)

5 - As collections e env's para execução no postman estão disponiveis no diretório deste projeto na pasta collections.

OBS: É criado por default um usuário com perfil de Admin, onde o email é user@gmail.com e a senha 1234.

# Testes
### Execução dos testes automatizados

1 - Para execução dos testes automatizados, execute o comando abaixo no terminal para execução do container de testes:
      ```sh 
        docker-compose run tst bash
      ```
2 - Após carregar o container de teste execute os comandos abaixo para criação da base de teste e execução das migrations:
      ```sh
        npm run db:create && npm run db:migrate
      ```
3 - Por fim uma vez criada a base de dados, execute o comando abaixo para execução dos testes automatizados:
      ```sh
        npm run test
      ```      
OBS: Não foram criados ainda todos os testes de feature/unit os mesmos estão em WIP.

Glauber Oliveira - [Linkedin](https://www.linkedin.com/in/gcolliveira/) - glauber17230@gmail.com 

