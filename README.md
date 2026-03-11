# ⭐ Skyerate – Plataforma de Avaliações de Mídias e Conteúdos

Projeto desenvolvido para a competência *_Criar Serviços Web com REST e GraphQL_*.

## 👥 Integrantes do Grupo

- Ana Luisa Rodrigues de Veras
- Carolina Genovez Gonçalves
- Julia Fialho de Lima
- Lavinia Donato Ribeiro
- Sabrina Vitória Ferreira Atanásio

## 🎯 Contexto

O **Skyerate** é uma plataforma digital criada para reunir avaliações de diferentes tipos de mídias em um único lugar.

A proposta da aplicação é permitir que usuários registrem suas opiniões sobre conteúdos diversos, organizando avaliações e criando um histórico pessoal de experiências com diferentes tipos de mídia.

A plataforma permite avaliar conteúdos como:

- 📚 Livros
- 🎬 Filmes
- 📺 Séries
- 🎌 Animes
- 🎵 Músicas
- ⛸️ Performances de Patinação Artística

Cada usuário possui um **perfil pessoal**, onde pode visualizar suas avaliações, editar informações do perfil e interagir com diferentes conteúdos avaliados dentro da plataforma.

O sistema foi desenvolvido com foco na organização das avaliações e na estruturação de dados que permita expandir futuramente funcionalidades sociais e estatísticas sobre consumo de mídia.

## 💫 Tecnologias Utilizadas

O backend do projeto foi desenvolvido utilizando as seguintes tecnologias:
- Node.js
- Express
- GraphQL
- Apollo Server
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Dotenv

## 💜 Arquitetura do Projeto
```plaintext
SKYERATE/
│
├─ node_modules/                # Dependências do projeto
├─ src/                         # Código-fonte principal
│   ├─ config/                  # Configurações do sistema
│   │   └─ db.js                # Conexão com o banco de dados
│   │
│   ├─ controllers/             # Lógica das operações da aplicação
│   ├─ graphql/                 # Schema, resolvers e configuração do GraphQL
│   ├─ middlewares/             # Middlewares (auth, tratamento de erros)
│   ├─ models/                  # Modelos do banco de dados
│   └─ seeds/                   # Dados de exemplo para popular o banco
│
├─ app.js                       # Configuração principal da aplicação
├─ server.js                    # Inicialização do servidor
│
├─ .env                         # Variáveis de ambiente
├─ .gitignore
├─ LICENSE
├─ package.json
├─ package-lock.json
└─ README.md

```
## 🔗 Relacionamento entre Entidades

O banco de dados foi modelado considerando os seguintes relacionamentos entre as entidades principais da aplicação.

### Usuário → Perfil

1 Usuário possui 1 Perfil

O perfil armazena informações adicionais como:
- Biografia
- Privacidade da conta
- Mídias favoritas

### Usuário → Avaliações

1 Usuário pode criar várias Avaliações

Cada avaliação representa a opinião do usuário sobre uma mídia específica.

### Mídia → Avaliações

1 Mídia pode receber várias Avaliações

Diferentes usuários podem avaliar o mesmo conteúdo.

### Perfil → Interações

O perfil também permite armazenar:
- Lista de favoritos
- Mídia favorita do mês

Esses relacionamentos permitem organizar as interações dentro da plataforma.

## 🔄 Comunicação da Aplicação

O backend da aplicação foi desenvolvido utilizando **Node.js**.

A comunicação entre cliente e servidor é realizada através de **GraphQL**, permitindo consultas e modificações de dados por meio de queries e mutations.

Essa abordagem permite que o cliente solicite apenas os dados necessários, tornando as requisições mais eficientes.

A estrutura do backend é organizada em camadas como:
- Models – estrutura dos dados no banco
- Controllers / Resolvers – lógica das operações
- Middlewares – autenticação e tratamento de erros
- Configurações – conexão com banco e ajustes do sistema

## ⚠️ Observação sobre validação de dados

Durante o desenvolvimento, foi identificado um problema relacionado à validação de valores definidos como enum nos modelos do banco de dados.

Como os valores do enum são case-sensitive, ocorreram erros quando os dados enviados pelo controller estavam em um formato diferente do definido no modelo.

**Exemplo**:

Enum no modelo:
```plaintext
"Book"
```

Valor enviado:
```plaintext
"book"
```

Para resolver esse problema, foi necessário padronizar os valores enviados para o banco de dados, garantindo que o formato utilizado no controller correspondesse exatamente ao definido no enum do modelo.

🚀 Como executar o projeto
### Back-end
### ENV
**Incluímos o arquivo .env no repositório para permitir o acesso direto ao nosso banco de dados.**
``` plaintext
PORT
MONGO_URI
JWT_SECRET 
JWT_EXPIRES_IN
```
1. Abra o terminal na pasta do backend.
2. Instale as dependências:
``` plaintext
npm install
```
3. Inicie o servidor em modo desenvolvimento:
``` plaintext
npm run dev
```
4. O backend rodará em: 
``` plaintext
http://localhost:3333/graphql
```

Nesse endereço é possível testar todas as queries e mutations GraphQL da aplicação.

## 💡 Funcionalidades Implementadas no Backend
### 👤 Usuários

- Cadastro de usuários
- Login com autenticação JWT
- Listagem de usuários
- Exclusão de usuários
- Controle de roles (admin / user)

### 📚 Mídias

CRUD completo para diferentes tipos de mídia:

- Livros
- Filmes
- Animes
- Músicas
- Séries
- Performances de Patinação Artística

### ⭐ Sistema de Avaliações

Usuários podem criar avaliações contendo:

- Nota final
- Subnotas por categoria
- Comentário
- Marcação como favorito

Também é possível:

- Buscar avaliações feitas por um usuário
- Buscar avaliações de uma mídia específica

### 👤 Perfis de Usuário

Cada usuário possui um perfil com:
- Nome
- Biografia
- Privacidade da conta
- Lista de favoritos

## 📡 Testando a API

Todas as operações podem ser testadas diretamente na interface GraphQL.

```plaintext
http://localhost:3333/graphql
```

Para rotas protegidas é necessário enviar o token JWT no header da requisição:

```plaintext
Authorization: Bearer SEU_TOKEN
```

O token é obtido através da mutation de login.

## 📌 Próximos Passos do Projeto

Atualmente o projeto possui foco no desenvolvimento do backend.

Os próximos passos incluem o desenvolvimento do frontend da plataforma, que permitirá:

- Interface para cadastro e login
- Visualização das mídias cadastradas
- Criação de avaliações através da interface
- Perfil de usuário com histórico de avaliações
- Lista de favoritos
- Interação entre usuários

O frontend será responsável por consumir a API GraphQL desenvolvida neste projeto.

## 💌 Conclusão

O Skyerate foi desenvolvido com o objetivo de criar uma estrutura de backend capaz de organizar avaliações de diferentes tipos de mídia em uma única plataforma.

A aplicação demonstra a utilização de:
- Node.js
- GraphQL
- MongoDB
- Mongoose
- Autenticação com JWT

Além da modelagem de relacionamentos entre usuários, perfis, mídias e avaliações.

Essa base permite futuras expansões da aplicação, como funcionalidades sociais, rankings de conteúdo e estatísticas de consumo de mídia.

## 📚 Lições aprendidas

Durante o desenvolvimento do projeto, o grupo aprofundou conhecimentos em:

- Criação de APIs com Node.js
- Implementação de GraphQL
- Modelagem de dados com MongoDB e Mongoose
- Autenticação utilizando JWT
- Organização de backend em arquitetura modular

## ⚠️ Pontos a melhorar

Algumas melhorias futuras incluem:

- Implementar validações mais robustas no backend
- Melhorar o tratamento de erros da API
- Implementar ranking de conteúdos em alta
- Desenvolver e integrar o frontend da aplicação