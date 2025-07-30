# Drink Coffee - React Frontend

This is the React frontend for the Drink Coffee online coffee shop application. It provides a modern, responsive user interface for customers to browse coffee products, add them to cart, and place orders.

## Technology Stack

- React 18
- Vite build tool
- React Router for navigation
- Context API for state management
- Tailwind CSS with shadcn/ui components
- JWT authentication

## Features

- User authentication (register, login, logout)
- Coffee menu browsing
- Shopping cart management
- Order placement and history
- Responsive design for mobile and desktop

## Setup Instructions

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd drink_coffee_frontend
```

2. Install dependencies
```bash
# Using npm
npm install

# Using pnpm (recommended)
pnpm install

# Using yarn
yarn install
```

3. Configure environment variables
Create a `.env` file in the root directory with:
```
VITE_API_BASE_URL=http://localhost:3001
```

4. Start the development server
```bash
# Using npm
npm run dev

# Using pnpm
pnpm run dev

# Using yarn
yarn dev
```

The application will be available at `http://localhost:5173`.

## Project Structure

```
src/
├── components/         # UI components
│   ├── Auth/           # Authentication components
│   ├── Coffee/         # Coffee menu components
│   ├── Cart/           # Shopping cart components
│   ├── Order/          # Order components
│   ├── Layout/         # Layout components
│   └── ui/             # UI library components
├── context/            # React context providers
│   ├── AuthContext.jsx # Authentication state
│   └── CartContext.jsx # Shopping cart state
├── App.jsx             # Main application component
└── main.jsx           # Application entry point
```

## Component Overview

### Authentication Components

- `Login.jsx` - User login form
- `Register.jsx` - User registration form
- `ProtectedRoute.jsx` - Route guard for authenticated pages

### Coffee Components

- `CoffeeList.jsx` - Displays all coffee items
- `CoffeeItem.jsx` - Individual coffee item card

### Cart Components

- `Cart.jsx` - Shopping cart page
- `CartItem.jsx` - Individual cart item

### Order Components

- `OrderHistory.jsx` - Displays user's order history

## State Management

The application uses React Context API for state management:

- `AuthContext` - Manages user authentication state and JWT tokens
- `CartContext` - Manages shopping cart state and operations

## API Integration

The frontend communicates with the Rails backend through RESTful API endpoints. All API calls include JWT tokens for authenticated requests.

## Building for Production

```bash
# Using npm
npm run build

# Using pnpm
pnpm run build

# Using yarn
yarn build
```

The built files will be in the `dist` directory, ready for deployment.

## Deployment

The built application can be deployed to any static hosting service:

```bash
# Example using surge.sh
npm install -g surge
surge dist your-domain.surge.sh
```

## Testing

```bash
# Using npm
npm run test

# Using pnpm
pnpm run test

# Using yarn
yarn test
```

## License

This project is licensed under the MIT License.

