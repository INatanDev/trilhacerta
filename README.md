# TrilhaCerta

Sistema de gerenciamento de trilhas de aprendizado.

---

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- **Node.js** versão 18.0.0 ou superior
- **npm** (vem instalado com o Node.js) ou **yarn**

### Verificando as instalações

Execute os comandos abaixo no terminal para confirmar que as ferramentas estão instaladas corretamente:

```bash
node --version
npm --version
```

---

## Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd trilhacerta
```

### 2. Instale as dependências

Usando npm:

```bash
npm install
```

Ou usando yarn:

```bash
yarn install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e preencha os valores conforme necessário:

```bash
cp .env.example .env
```

Abra o arquivo `.env` e configure as variáveis de ambiente. Exemplo:

```env
# Configurações do servidor
PORT=3000
NODE_ENV=development

# Configurações do banco de dados
DATABASE_URL=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=

# Configurações de autenticação
JWT_SECRET=seu_jwt_secret_aqui
JWT_EXPIRES_IN=7d
```

### 4. Inicialize o banco de dados (se aplicável)

```bash
npm run db:migrate
```

---

## Scripts disponíveis

No diretório do projeto, você pode executar:

### `npm run dev`

Executa a aplicação em modo de desenvolvimento com **hot reload** (reinício automático ao salvar arquivos).

```bash
npm run dev
```

A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000)

### `npm start`

Executa a aplicação em modo de **produção** (sem hot reload).

```bash
npm start
```

### `npm test`

Executa a suíte de testes.

```bash
npm test
```

---

## Estrutura de diretórios (recomendada)

```
trilhacerta/
├── src/
│   ├── controllers/       # Controladores de rotas
│   ├── models/            # Modelos de dados
│   ├── routes/            # Definições de rotas
│   ├── middlewares/       # Middlewares
│   ├── utils/             # Funções utilitárias
│   ├── config/            # Arquivos de configuração
│   └── server.js          # Arquivo de entrada da aplicação
├── public/                # Arquivos estáticos (opcional)
├── tests/                 # Testes automatizados
├── .env                   # Variáveis de ambiente (não versionar)
├── .env.example           # Exemplo de variáveis de ambiente
├── .gitignore
├── package.json
└── README.md
```

---

## Adicionando novas dependências

Para adicionar uma nova dependência de produção:

```bash
npm install nome-da-dependencia
```

Para adicionar uma dependência de desenvolvimento (ex: eslint, prettier, nodemon):

```bash
npm install -D nome-da-dependencia
```
---npm i -D @types/node tsup tsx typescript
```
---npm i fastify
```
---npm i dotenv zod
```
---npm i -D @typescript-eslint/eslint-plugin@6.21.0 @typescript-eslint/parser@6.21.0 eslint@8.57.0 eslint-config-prettier@9.1.0 eslint-config-standard@17.1.0 eslint-plugin-import@2.29.1 eslint-plugin-n@16.6.2 eslint-plugin-prettier@5.1.3 eslint-plugin-promise@6.1.1 prettier@3.2.5
```
---npm i pg
```
---npm i -D @types/pg
```
---npm i typeorm
```
npm install reflect-metadata

## Configurações adicionais
```
---npx tsc --init
```
```
docker run -d --name myPostegres -p 5432:5432 -e POSTGRES_PASSWORD=123456 postgres:latest
docker run -d --name myPostegres -p 5432:5432 -e POSTGRES_USER=user -e POSTGRES_PASSWORD=123456 postgres:latest
```

### ESLint e Prettier (opcional)

Para configurar linting e formatação de código, instale os pacotes:

```bash
npm install -D eslint prettier eslint-config-prettier
```

Crie os arquivos de configuração:

`.eslintrc.json`:
```json
{
  "extends": ["eslint:recommended", "prettier"]
}
```

`.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### Nodemon (alternativa ao --watch)

Se preferir usar o Nodemon em vez do `--watch` nativo do Node.js:

```bash
npm install -D nodemon
```

E atualize o script `dev` no `package.json`:

```json
"dev": "nodemon src/server.js"
```

---

## Problemas comuns

### Erro: "No such file or directory: src/server.js"

Crie a estrutura de diretórios e o arquivo de entrada:

```bash
mkdir -p src
touch src/server.js
```

Exemplo de conteúdo inicial para `src/server.js`:

```javascript
import http from 'node:http';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'TrilhaCerta API rodando!' }));
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
```

### Erro de versão do Node.js

Verifique se a versão do Node.js é >= 18.0.0. Use o [nvm](https://github.com/nvm-sh/nvm) (Linux/Mac) ou [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) para gerenciar versões do Node.js.

---

## Contribuindo

1. Crie um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça o push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## Licença

ISC
