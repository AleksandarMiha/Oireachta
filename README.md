 ## Getting started

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Run tests
yarn test:run
yarn test:ui 

# Check code quality
yarn check-lint
yarn check-types

# Check all ( lint, type and tests )
yarn check-all
```

## Developer setup

This project uses **Yarn Berry (v4)** with `node_modules` linking, so make sure you have **Node.js 20+** and **Corepack** enabled.  

Enable Corepack and install the correct Yarn version (only needed once per machine):  

```bash
corepack enable
corepack install
```


## Project structure

```
src/
├── components/         # UI components
├── hooks/              # Custom React hooks
├── pages/              # Main application pages
├── tests/              # Unit and component tests
└── lib/                # Utilities and configurations
```

## API

API configuration is stored in a `.env` file - copy `.env.example` and update values as needed.

For API questions or issues, contact someone from the team.

## Development

The project uses ESLint and Prettier for code quality, with GitHub Actions CI/CD pipeline that runs linting, type checking, and tests on every push.



