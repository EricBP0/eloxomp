# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

Planejamento do Front-End - EloXomp

1. Visão Geral

    O front-end do EloXomp será desenvolvido em React + Vite, utilizando TailwindCSS para estilização, React Router para navegação e Axios para requisições HTTP. O objetivo é criar uma experiência fluida e intuitiva para os usuários que desejam contratar serviços de Elojob, Duo Boost e Coaching.


2. Estrutura do Projeto

    2.1. Tecnologias Utilizadas

        React (Vite) - Para a construção do front-end
        
        TailwindCSS - Para estilização rápida e responsiva
        
        React Router - Para gerenciar as rotas
        
        Axios - Para chamadas à API do back-end
        
        ShadCN/UI - Para componentes visuais modernos

2.2. Estrutura de Diretórios
```
/src
├── assets/        # Imagens e ícones
├── components/    # Componentes reutilizáveis
├── pages/         # Páginas principais do sistema
├── services/      # Comunicação com a API
├── utils/         # Funções utilitárias
├── routes/        # Configuração de rotas
├── hooks/         # Hooks personalizados
├── App.tsx        # Componente principal
├── main.tsx       # Entrada principal do React
```

3. Telas do Projeto

    3.1 Páginas Públicas

        Home (Landing Page)
        
        Banner principal
        
        Destaques dos serviços
        
        Depoimentos
        
        Chamada para ação (Comprar Elojob/Duo Boost)
        
        Serviços
        
        Lista de serviços disponíveis
        
        Filtro por jogo (LoL, TFT, Valorant, etc.)
        
        Detalhes do Serviço
        
        Escolha do tipo de serviço
        
        Opções de personalização (Duo, Coaching, Streaming, etc.)
        
        Simulação de preço
        
        Botão para iniciar compra
        
        Login / Cadastro
        
        Formulário de login
        
        Registro de novos usuários
        
        Autenticação via API
        
        Contato
        
        Formulário para enviar mensagens
        
        Links para suporte (WhatsApp, Discord, etc.)

3.2. Páginas Restritas (Usuário Logado)

    Dashboard
    
    Exibição dos pedidos do usuário
    
    Status do serviço contratado
    
    Detalhes do Pedido
    
    Acompanhamento do progresso do serviço
    
    Chat com o booster
    
    Histórico de atualizações
    
    Perfil do Usuário
    
    Informações do cliente
    
    Opção de alterar senha/email
    
    Gerenciamento de métodos de pagamento
    
    Histórico de Pedidos
    
    Listagem de serviços concluídos
    
    Avaliação do serviço
    
3.3. Páginas Restritas (Administração)
    
    Painel Administrativo
    
    Gestão de pedidos
    
    Gerenciamento de usuários
    
    Relatórios de vendas
    
    Gestão de Boosters
    
    Cadastro de boosters
    
    Acompanhamento de pedidos ativos
    
    Pagamentos e comissões

4. Fluxo do Usuário

    O usuário acessa a Home e vê os serviços disponíveis.
    
    Escolhe um serviço e é direcionado para Detalhes do Serviço.
    
    Personaliza sua compra e faz login ou cadastro.
    
    Realiza o pagamento e acompanha o serviço via Dashboard.
    
    Após a conclusão, pode avaliar o serviço e verificar o histórico.
