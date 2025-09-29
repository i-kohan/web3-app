# Web3 Message Signer & Verifier

Full-stack Web3 app with Dynamic.xyz headless authentication, message signing, and backend verification.

## 🚀 Live Demo

- **Frontend (Vercel):** https://web3-app-web.vercel.app/
- **Backend API (Render):** https://web3-app-swhb.onrender.com

## Features

- **Headless email authentication** with OTP verification (no Dynamic widget)
- **Multi-factor authentication** for enhanced security
- **Custom message signing** with embedded wallet
- **Signature verification** on Node.js backend
- **Message history** with localStorage persistence
- **Dark/light theme** toggle
- **Responsive design** with modern UI

## Tech Stack

### Frontend (React 19)

- **Dynamic.xyz** - Headless embedded wallet authentication
- **Feature-Sliced Design** - Scalable architecture
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Styling with dark/light theme
- **Radix UI** - Accessible components
- **Vite** - Build tool
- **Error Boundaries** - Graceful error handling
- **Suspense** - Loading states
- **Performance** - React.memo and useCallback optimizations

### Backend (Node.js + Express)

- **Domain-Driven Design** - Clean architecture
- **Ethers.js** - Signature verification
- **TypeScript** - Full type coverage
- **Vitest** - Testing suite
- **Modular structure** - Separated concerns

## Setup Instructions

### Prerequisites

- Node.js 18+
- pnpm (recommended package manager)

### Installation

1. **Clone and install dependencies:**

```bash
git clone https://github.com/DM-SaaS/legacy-fe-candidate-assignment.git
cd legacy-fe-candidate-assignment
pnpm install
```

2. **Environment setup:**

Create `apps/web/.env`:

```
VITE_DYNAMIC_ENV_ID=env_idfdfq
VITE_API_URL=http://localhost:4000
```

Create `apps/api/.env` (optional):

```
PORT=4000
```

3. **Get Dynamic.xyz credentials:**

- Sign up at [Dynamic.xyz](https://dynamic.xyz)
- Create a new project
- Copy your Environment ID
- Add it to `VITE_DYNAMIC_ENV_ID`

### Running the app

**Development mode:**

```bash
# Start backend (terminal 1)
pnpm --filter api dev

# Start frontend (terminal 2)
pnpm --filter web dev
```

**Production build:**

```bash
pnpm build
pnpm --filter api start
pnpm --filter web preview
```

### Testing

```bash
# Run backend tests
pnpm --filter api test

# Watch mode
pnpm --filter api test:watch
```

## Architecture Highlights

### Backend - Domain-Driven Design + Hexagonal Architecture

```
apps/api/src/
├── modules/signature/           # Bounded Context
│   ├── domain/                  # Core Business Logic
│   │   ├── entities/            # Domain Entities
│   │   ├── value-objects/       # Value Objects
│   │   └── errors.ts            # Domain Errors
│   ├── app/                     # Application Layer
│   │   └── use-cases/           # Business Use Cases
│   ├── infra/                   # Infrastructure Layer
│   │   ├── ports/               # Interfaces
│   │   └── adapters/            # External Implementations
│   └── __tests__/               # Domain Tests
└── core/                        # Shared Kernel
    └── http/                    # HTTP Infrastructure
```

**Key Patterns:**

- **Clean separation** of domain, application, and infrastructure layers
- **Value objects** for type safety (Address, Message, SignatureHex)
- **Use cases** for business logic isolation
- **Ports & adapters** pattern for external dependencies
- **Comprehensive test coverage** for domain logic

### Frontend - Feature-Sliced Design

```
apps/web/src/
├── shared/                      # Shared Kernel
│   ├── ui/                      # Reusable Components
│   ├── api/                     # API Layer
│   └── lib/                     # Utilities
├── entities/                    # Business Entities
│   ├── wallet/                  # Wallet Entity
│   ├── signature/               # Signature Entity
│   └── history/                 # History Entity
├── features/                    # Business Features
│   ├── auth/                    # Authentication
│   ├── sign-message/            # Message Signing
│   └── verify-signature/        # Signature Verification
├── widgets/                     # Composite Blocks
│   └── signer-panel/            # Main Signer Widget
└── pages/                       # Application Pages
    └── home/                    # Home Page
```

**Key Patterns:**

- **Layered architecture** - shared, entities, features, widgets, pages
- **Public APIs** through index.ts files
- **Isolated features** - auth, sign-message, verify-signature
- **Reusable entities** - wallet, signature, history
- **Error boundaries** for fault tolerance
- **Suspense boundaries** for loading states
- **React optimizations** - memo and useCallback for performance

## Trade-offs & Improvements

### Trade-offs Made

- **In-memory storage** instead of database for simplicity
- **Basic error handling** - could add more specific error types
- **No rate limiting** on API endpoints

### Areas for Improvement

- **Database integration** for persistent data
- **User roles & permissions** system
- **Batch signing** for multiple messages
- **Export/import** functionality for signatures
- **Real-time notifications** for signature events
- **Advanced MFA** with biometric options
- **Audit logging** for compliance

## Testing Coverage

- **Domain entities** - SignatureProof, value objects
- **Use cases** - signature verification logic
- **Value object validation** - Address, Message, SignatureHex
- **Integration tests** for API endpoints

The app demonstrates production-ready patterns with clean architecture, proper error handling, and scalable design decisions.
