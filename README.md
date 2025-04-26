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
- npm or yarn
- NY Times API key (get one from [NY Times Developer Portal](https://developer.nytimes.com/get-started))

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/nyt-most-popular.git
cd nyt-most-popular
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your NY Times API key:

```bash
VITE_NYT_API_KEY=your_api_key_here
```

## Running the Application

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Testing

### Unit Tests

```bash
npm run test
# or
yarn test
```

### Test Coverage

```bash
npm run test:coverage
# or
yarn test:coverage
```

### UI Tests (Cypress)

```bash
npm run cypress:open
# or
yarn cypress:open
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Article/       # Article-related components
│   ├── common/        # Shared components
│   └── layout/        # Layout components
├── containers/        # Container components
├── services/          # API services
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── __tests__/         # Test files
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
