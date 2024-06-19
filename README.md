# Chapter Portal Frontend

## Code Structure

- `components/`: Reusable components
- `layouts/`: Layouts for the application
- `pages/`: Application pages
- `plugins/`: Vue plugins
- `assets/`: Static assets such as tailwind, css, badges, items, etc.
- `stores/`: Vuex stores for state management. This is where API calls should be made.
- `static/`: Static files that are served as-is
- `public/`: Static files that are copied to the root of the output directory
- `middleware/`: Custom middleware
- `composables/`: Reusable logic for components
- `tests/`: Unit tests
- `.dockerignore`: Files to ignore when building Docker images
- `/eslintignore`: Files to ignore when linting
- `/eslintrc.cjs`: ESLint configuration
- `/eslintrc.js`: ESLint configuration
- `/gitignore`: Files to ignore when committing to Git
- `.npmrc`: NPM configuration
- `.prettierrc.json`: Prettier configuration
- `app.vue`: Root component
- `docker-compose.yml`: Docker Compose configuration
- `Dockerfile`: Docker configuration
- `Dockerfile.local`: Docker configuration for local development
- `nuxt.config.js`: Nuxt configuration
- `package.json`: NPM configuration
- `pnpm-lock.yaml`: PNPM lockfile
- `tsconfig.json`: TypeScript configuration
- `vitests.config.mts`: Vite configuration

## Setup

Make sure to install the dependencies. Would recommend pnpm:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
pnpm run dev
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```

## Linting and Formatting

Lint and format the code:

```bash
pnpm run lint:fix
```

```bash
pnpm run format
```

```bash
pnpm run format:check
```

## Testing

Run the tests:

```bash
pnpm run test
```
