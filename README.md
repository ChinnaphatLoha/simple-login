# Simple Login

This project is a personal learning exercise designed to explore best practices in user-state management and project structure using modern web development tools. The stack chosen for this project includes Vue 3 Composition API, TypeScript, Vue Router, Pinia for state management, and Axios for handling HTTP requests. Vite is used as the build tool, and NPM is the package manager.

## Stack

- **Vue 3** with Composition API
- **TypeScript**
- **Vue Router**
- **Pinia** for state management
- **Axios** for HTTP requests
- **Vite** as the build tool
- **NPM** as the package manager

## Purpose

The main purpose of this project is to gain hands-on experience with user-state management and to establish a well-structured project that adheres to best practices in frontend development.

## Project Integration

This project integrates with another repository that handles the login API:

- **Login API Repository:** [int222-poc](https://github.com/ChinnaphatLoha/int222-poc)
- **Local API Base URL:** `http://localhost:8080/api`

The `vite.config.ts` file is configured to proxy API requests to the above base URL.

### vite.config.ts

```typescript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

## Project Structure

```plaintext
└── 📁simple-login
    └── 📁public
        └── favicon.ico
    └── 📁src
        └── 📁api
            └── axios-instance.ts
            └── user-api.ts
        └── 📁components
            └── 📁forms
                └── LoginForm.vue
            ├── reusable
        └── 📁errors
            └── ForbiddenError.ts
            └── index.ts
        └── 📁router
            └── index.ts
        └── 📁stores
            └── user.ts
        └── 📁types
            └── auth-response.ts
        └── 📁views
            └── WelcomeView.vue
        └── App.vue
        └── main.ts
        └── style.css
    └── .eslintrc.cjs
    └── .gitignore
    └── .prettierrc.json
    └── env.d.ts
    └── index.html
    └── package-lock.json
    └── package.json
    └── postcss.config.js
    └── README.md
    └── tailwind.config.js
    └── tsconfig.app.json
    └── tsconfig.json
    └── tsconfig.node.json
    └── vite.config.ts
```

### Key Directories and Files

- **src/api/**: Contains API configuration and request handling files.
- **src/components/forms/**: Houses the login form component.
- **src/errors/**: Custom error handling classes.
- **src/router/**: Vue Router configuration.
- **src/stores/**: Pinia store for managing user state.
- **src/types/**: TypeScript types, including authentication response types.
- **src/views/**: Vue components for different views of the application.
- **vite.config.ts**: Vite configuration file, including server proxy settings.

## How to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/ChinnaphatLoha/simple-login.git
   ```

2. Navigate to the project directory:

   ```bash
   cd simple-login
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```
