# Task Track - Guia de Configuração e Execução

Este projeto consiste em uma aplicação full-stack com backend em Spring Boot (Java) e frontend em Angular.

## 📋 Pré-requisitos

Antes de começar, você precisa instalar as seguintes ferramentas:

### 1. Java Development Kit (JDK) 21
- **Download**: [Oracle JDK 21](https://www.oracle.com/java/technologies/downloads/#java21) ou [OpenJDK 21](https://adoptium.net/)
- **Verificação**: Após instalar, execute no terminal:
  ```bash
  java -version
  ```
  Deve mostrar a versão 21.x.x

### 2. Maven
- **Download**: [Apache Maven](https://maven.apache.org/download.cgi)
- **Instalação**: 
  - Baixe o arquivo binário (apache-maven-x.x.x-bin.zip)
  - Extraia para uma pasta (ex: `C:\Program Files\Apache\maven`)
  - Adicione `C:\Program Files\Apache\maven\bin` ao PATH do sistema
- **Verificação**: Execute no terminal:
  ```bash
  mvn -version
  ```

### 3. Node.js e npm
- **Download**: [Node.js](https://nodejs.org/) (versão LTS recomendada)
- **Verificação**: Após instalar, execute no terminal:
  ```bash
  node --version
  npm --version
  ```

### 4. Angular CLI
- Após instalar Node.js, execute:
  ```bash
  npm install -g @angular/cli
  ```
- **Verificação**:
  ```bash
  ng version
  ```

### 5. PostgreSQL
- **Download**: [PostgreSQL](https://www.postgresql.org/download/windows/)
- **Instalação**:
  - Execute o instalador
  - Defina uma senha para o usuário `postgres` (anote-a!)
  - Mantenha a porta padrão (5432)
- **Verificação**: Após instalar, você pode usar pgAdmin (incluído na instalação) ou executar:
  ```bash
  psql -U postgres -h localhost
  ```

### 6. Visual Studio Code (Opcional - para desenvolvimento)
- **Download**: [VS Code](https://code.visualstudio.com/)
- **Extensões recomendadas**:
  - Extension Pack for Java
  - Spring Boot Extension Pack
  - Angular Language Service

## 🚀 Configuração e Execução

### Passo 1: Configurar o Banco de Dados

1. **Abra o pgAdmin** (instalado com PostgreSQL ou outro administrador de banco de dados)
2. **Conecte ao servidor** (localhost:5432)
3. **Crie um novo banco de dados**:
   - Clique com botão direito em "Databases"
   - Selecione "Create" > "Database"
   - Nome: `task_track`
   - Clique em "Save"

### Passo 2: Configurar as Credenciais do Backend

1. **Abra o arquivo** `back-end/task-track/src/main/resources/application.properties`
2. **Atualize as credenciais** do banco de dados:
   ```properties
   spring.datasource.username=SEU_USUARIO_POSTGRES
   spring.datasource.password=SUA_SENHA_POSTGRES
   ```
   - Substitua `SEU_USUARIO_POSTGRES` pelo seu usuário PostgreSQL
   - Substitua `SUA_SENHA_POSTGRES` pela senha que você definiu durante a instalação

### Passo 3: Configurar o Backend

**Opção A: Executar via Terminal/CMD**

1. **Abra o terminal** e navegue até a pasta do backend:
   ```bash
   cd back-end/task-track
   ```

2. **Compile e execute o projeto**:
   ```bash
   mvn spring-boot:run
   ```

3. **Aguarde** até ver a mensagem:
   ```
   Started TaskTrackApplication in X.XXX seconds
   ```

**Opção B: Executar via VS Code (Recomendado para desenvolvimento)**

1. **Abra o VS Code** e abra a pasta do projeto:
   ```bash
   code .
   ```

2. **Navegue até a pasta do backend**:
   - No VS Code, abra a pasta `back-end/task-track`
   - Ou use: `File > Open Folder > back-end/task-track`

3. **Aguarde o VS Code carregar** as extensões Java e Spring Boot
   
   **Extensões obrigatórias para o backend:**
   - **Extension Pack for Java** (Microsoft) - Inclui:
     - Language Support for Java by Red Hat
     - Debugger for Java
     - Test Runner for Java
     - Maven for Java
     - Project Manager for Java
   - **Spring Boot Extension Pack** (Pivotal) - Inclui:
     - Spring Boot Tools
     - Spring Initializr Java Support
     - Spring Boot Dashboard
   - **Spring Boot Tools** (Pivotal)
   - **Spring Boot Dashboard** (Pivotal)
   
   **Para instalar as extensões:**
   - Pressione `Ctrl + Shift + X` para abrir a aba Extensions
   - Procure por cada extensão e clique em "Install"
   - Ou instale via linha de comando:
     ```bash
     code --install-extension vscjava.vscode-java-pack
     code --install-extension Pivotal.vscode-spring-boot
     code --install-extension Pivotal.vscode-boot-dashboard
     ```

4. **Execute o projeto**:
   - Pressione `Ctrl + Shift + P` para abrir a paleta de comandos
   - Digite "Spring Boot Dashboard" e selecione
   - Na aba Spring Boot Dashboard, clique no ícone ▶️ ao lado de "task-track"
   - Ou use: `Ctrl + F5` para executar sem debug
   - Ou use: `F5` para executar com debug

5. **Aguarde** até ver a mensagem:
   ```
   Started TaskTrackApplication in X.XXX seconds
   ```

6. **Verifique se está funcionando** acessando:
   - http://localhost:8080 (deve mostrar uma página de erro 404, que é normal)
   - http://localhost:8080/swagger-ui.html (documentação da API)

### Passo 4: Configurar o Frontend

1. **Abra um novo terminal** e navegue até a pasta do frontend:
   ```bash
   cd front-end/task-control
   ```

2. **Instale as dependências**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Execute o projeto**:
   ```bash
   npm start
   ```

4. **Aguarde** até ver a mensagem:
   ```
   Compiled successfully.
   ```

5. **Acesse a aplicação** em:
   - http://localhost:4200

## 📁 Estrutura do Projeto

```
task-track/
├── back-end/                    # Backend Spring Boot
│   └── task-track/
│       ├── src/main/java/       # Código Java
│       ├── src/main/resources/  # Configurações
│       └── pom.xml             # Dependências Maven
└── front-end/                   # Frontend Angular
    └── task-control/
        ├── src/app/            # Código TypeScript/Angular
        ├── src/environments/   # Configurações de ambiente
        └── package.json        # Dependências npm
```

## 🔧 Configurações Importantes

### Backend (application.properties)
- **Porta**: 8080
- **Banco**: PostgreSQL (localhost:5432/task_track)
- **Usuário**: Configure suas próprias credenciais PostgreSQL
- **Senha**: Configure sua própria senha PostgreSQL

### Frontend
- **Porta**: 4200
- **Proxy**: Configurado para redirecionar chamadas API para o backend

### Web
- **Login Admin(Email)**: admin@tasktrack.com
- **Senha Admin**: admin123

## 🐛 Solução de Problemas

### Erro de Conexão com Banco
- Verifique se o PostgreSQL está rodando
- Confirme se o banco `task_track` foi criado
- Verifique se as credenciais no `application.properties` estão corretas
- Teste a conexão: `psql -U SEU_USUARIO -h localhost -d task_track`

### Erro de Porta em Uso
- Backend (8080): `netstat -ano | findstr :8080` e mate o processo
- Frontend (4200): `netstat -ano | findstr :4200` e mate o processo

### Erro de Dependências
- Backend: `mvn clean install`
- Frontend: `npm install --legacy-peer-deps`

### Problemas no VS Code
- Verifique se as extensões Java e Spring Boot estão instaladas
- Reinicie o VS Code após instalar as extensões
- Use `Ctrl + Shift + P` > "Java: Reload Projects" se necessário

## 📝 Comandos Úteis

### Backend
```bash
# Compilar
mvn compile

# Executar testes
mvn test

# Limpar e recompilar
mvn clean install

# Executar
mvn spring-boot:run
```

### Frontend
```bash
# Instalar dependências
npm install --legacy-peer-deps

# Executar em desenvolvimento
npm start

# Build para produção
npm run build

# Executar testes
npm test
```

## 🎯 Próximos Passos

Após configurar tudo:
1. Acesse http://localhost:4200
2. Crie uma conta de usuário
3. Faça login
4. Comece a usar a aplicação!

## 📞 Suporte

Se encontrar problemas:
1. Verifique se todas as ferramentas estão instaladas corretamente
2. Confirme se as portas não estão sendo usadas por outros serviços
3. Verifique se as credenciais do banco estão configuradas corretamente
4. Verifique os logs no terminal para identificar erros específicos