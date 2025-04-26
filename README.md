# NY Times Most Popular Articles

A React application that displays the most popular articles from the New York Times API.

## Features

- View most popular articles from NY Times
- Filter articles by time period (1, 7, or 30 days)
- Detailed view for each article
- Responsive design with Tailwind CSS
- Unit and integration tests
- End-to-end testing with Cypress

## Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- NY Times API key (get it from https://developer.nytimes.com/get-started)

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd nyt-most-popular
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory and add your NY Times API key:

```bash
VITE_NYT_API_KEY=your_api_key_here
```

## Development

To start the development server:

```bash
pnpm dev
```

## Testing

### Unit Tests

```bash
# Run unit tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests with UI
pnpm test:ui
```

### E2E Tests

```bash
# Open Cypress
pnpm cypress:open

# Run Cypress tests headlessly
pnpm cypress:run
```

## Building for Production

```bash
pnpm build
```

## Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable UI components
├── containers/     # Container components
├── hooks/          # Custom React hooks
├── services/       # API services
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── __tests__/      # Test files
    ├── unit/       # Unit tests
    └── integration/# Integration tests
```

## Technologies Used

- React 19
- TypeScript
- Tailwind CSS
- React Query
- React Router
- Vitest
- Cypress
- Axios

## License

MIT
