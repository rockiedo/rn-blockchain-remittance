# Blockchain Remittance - React Native

A playground project for learning React Native with Expo. This app demonstrates a blockchain-based remittance solution that converts XSGD to VND through USDT, comparing rates with traditional banking services.

> **Note:** This is a learning project created to explore React Native development, state management, and mobile UI/UX patterns.

## Screenshots

<!-- Add screenshots here -->
<div align="center">
  <p><em>Screenshots coming soon...</em></p>
</div>

## Demo

<!-- Add GIFs/videos here -->
<div align="center">
  <p><em>Demo GIFs coming soon...</em></p>
</div>

## Architecture

This project follows a clean, layered architecture pattern:

```
Services → Hooks → Views
```

### Services Layer (`src/services/`)
The services layer handles all data fetching and business logic:
- `bankService.ts` - Fetches traditional bank exchange rates
- `liquidityPoolService.ts` - Handles liquidity pool rate calculations
- `p2pService.ts` - Manages P2P exchange rates

### Hooks Layer (`src/hooks/`)
Custom React hooks encapsulate state management and side effects:
- `useXsgdToVnd.ts` - Main hook for currency conversion logic, orchestrating multiple services and managing UI state

### Views Layer (`src/app/`)
React components for the user interface, using [UI Kitten](https://akveo.github.io/react-native-ui-kitten/) for consistent design:
- File-based routing powered by [Expo Router](https://docs.expo.dev/router/introduction/)
- `index.tsx` - Main conversion screen

### Navigation
This project uses **Expo Router** for file-based routing, where the file structure in the `src/app/` directory automatically defines the navigation structure.

## Tech Stack

- **Framework:** [Expo](https://expo.dev) / React Native
- **UI Library:** [UI Kitten](https://akveo.github.io/react-native-ui-kitten/)
- **Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/)
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- iOS Simulator (macOS) or Android Emulator

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/blockchain-remittance-rn.git
cd blockchain-remittance-rn
```

2. Install dependencies:

```bash
npm install
```

### Running the Project

Start the development server:

```bash
npx expo start
```

You'll see options to run the app on:
- Press `i` for iOS Simulator (macOS only)
- Press `a` for Android Emulator
- Scan QR code with Expo Go app on your physical device

## Features

- Real-time currency conversion (XSGD → USDT → VND)
- Comparison with traditional bank rates
- Clean, modern UI with thousand separators and decimal formatting
- Loading states and error handling

## Learning Goals

This project helped explore:
- React Native fundamentals and mobile development patterns
- State management with React hooks
- TypeScript integration in React Native
- File-based routing with Expo Router
- Service-oriented architecture
- UI component libraries and styling in React Native

## License

MIT
