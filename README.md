# NY Times Most Popular Articles

A React application that displays the most popular articles from The New York Times using their public API.

## Features

- View most popular articles from NY Times
- Filter articles by time period (1, 7, or 30 days)
- Detailed article view
- Responsive design
- Loading states and error handling

## Prerequisites

- Node.js (v14 or higher)
- pnpm, npm or yarn
- NY Times API key (get one from [NY Times Developer Portal](https://developer.nytimes.com/get-started))

## Installation

1. Clone the repository:

```bash
git clone https://github.com/talha786-wahid/nyt-most-popular.git
cd nyt-most-popular
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
```

## Environment Variables

> **Note:**  
> We do **not** share or push `.env` files to GitHub.

Since this is an **assessment project**, I have included a `.env.development` file for easier setup.

In real-world projects, we **only add** a `.env.example` file (containing only the variable names, no real values), and developers must obtain the actual environment values privately from the team.

### Setting Up Your Environment

3. Create a `.env.development` file in the root directory and add your NY Times API key:
4. Add your NY Times API key to it:

```bash
VITE_NYT_API_KEY=your_api_key_here
```

## Running the Application

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Testing

### Unit Tests

```bash
pnpm test
# or
npm run test
# or
yarn test
```

### Test Coverage

```bash
pnpm test:coverage
# or
npm run test:coverage
# or
yarn test:coverage
```

### UI Tests (Cypress)

```bash
pnpm cypress:open
# or
npm run cypress:open
# or
yarn cypress:open
```

## Project Structure

```
src/
└── __tests__/         # Test files
├── assets/            # Assets (icons, images and fonts)
├── components/        # Reusable UI components
│   ├── Article/       # Article-related components
├── hooks/             # Custom hooks
├── pages/             # Custom pages
├── services/          # API services
├── types/             # TypeScript type definitions
```

## Technologies Used

- React
- TypeScript
- Vite
- React Query
- Tailwind CSS
- Jest
- React Testing Library
- Cypress

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Code Quality

### Linting

```bash
pnpm lint
# or
npm run lint
# or
yarn lint
```
