# Contributing to JSON Schema Form Element

Thank you for your interest in contributing to JSFE! This document will guide you through the process of setting up the development environment and submitting your contributions.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 20 LTS or later)
- [pnpm](https://pnpm.io/) (version 9.12.3 or later)
- Git

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:

   ```bash
   git clone https://github.com/YOUR_USERNAME/jsfe.git
   cd jsfe
   ```

3. Launch the local CI to bootstrap the monorepo and to check that everything is OK on your machine:
   ```bash
   ./local-ci.sh
   ```

## Development Workflow

1. Create a new branch for your feature/fix:

   ```bash
   git checkout -b feat/your-feature-name
   # or
   git checkout -b fix/your-fix-name
   ```

2. Start the development tasks:

   ```bash
   pnpm dev
   ```

3. Make your changes and ensure they follow our coding standards:

   ```bash
   # Run linting
   pnpm lint

   # Fix linting issues
   pnpm lint:fix

   # Check formatting
   pnpm format:check

   # Fix formatting
   pnpm format
   ```

4. Run tests:

   ```bash
   # Run unit tests
   pnpm test:unit

   # Run e2e tests
   pnpm test:e2e

   # Run tests in watch mode during development
   pnpm test:unit:dev
   pnpm test:e2e:dev
   ```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification. Your commit messages should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts
- `chore`: Changes to the build process or auxiliary tools

Examples:

```bash
git commit -m "feat(engine): add support for custom validators"
git commit -m "fix(webawesome): resolve styling issues in dark mode"
git commit -m "docs: update API documentation"
git commit -m "build: update typescript to 5.8.3"
git commit -m "ci: add node 21 to test matrix"
```

## Submitting a Pull Request

1. Push your changes to your fork:

   ```bash
   git push origin feat/your-feature-name
   ```

2. Go to the original repository on GitHub and create a Pull Request

3. In your PR description:
   - Clearly describe the problem and solution
   - Include the relevant issue number if applicable
   - Include screenshots/GIFs for UI changes

4. Wait for the maintainers to review your PR. Make any requested changes.

## Project Structure

```
packages/
  ├── engine/        # Core form engine
  ├── generics/      # Generic utilities, form HTML element and helpers
  ├── webawesome/    # Web components form implementation
  ├── ...
e2e/                 # End-to-end tests
example-app/         # Example application
scripts/             # Build and utility scripts
```

## Need Help?

If you need help or have questions:

1. Check the documentation
2. Open an issue with a clear title and description
3. Be respectful and constructive in all interactions

Thank you for contributing to JSON Schema Form Element! 💖
