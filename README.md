# Portfolio

Este é o repositório para o meu portfólio pessoal.

## Tecnologias Utilizadas

- **React:** Uma biblioteca JavaScript para construir interfaces de usuário.
- **TypeScript:** Um superconjunto de JavaScript que adiciona tipagem estática.
- **Vite:** Um build tool que visa fornecer uma experiência de desenvolvimento mais rápida e enxuta para projetos web modernos.
- **Tailwind CSS:** Um framework CSS utilitário para criar designs personalizados rapidamente.
- **React Router:** Para roteamento declarativo em aplicações React.
- **Docker:** Para containerização e fácil implantação.

## Como Executar o Projeto Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. **Navegue até o diretório do projeto:**
   ```bash
   cd seu-repositorio
   ```
3. **Instale as dependências:**
   ```bash
   npm install
   ```
4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
5. **Abra seu navegador e acesse `http://localhost:5173`**

## Estrutura do Projeto

O projeto está estruturado da seguinte forma:

- **`app/`**: Contém o código-fonte da aplicação.
  - **`components/`**: Componentes React reutilizáveis.
  - **`routes/`**: Componentes de página para cada rota.
  - **`services/`**: Lógica de negócios e chamadas de API.
  - **`assets/`**: Imagens, fontes e outros arquivos estáticos.
- **`public/`**: Arquivos estáticos que são servidos diretamente.
- **`Dockerfile`**: Define o ambiente para construir e rodar a aplicação em um container Docker.
- **`package.json`**: Lista as dependências do projeto e define os scripts.
- **`vite.config.ts`**: Arquivo de configuração para o Vite.
