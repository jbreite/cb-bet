# Your Native Expo App 👋

This is an [Expo](https://expo.dev) project that utilizes native capabilities, requiring a development build to run properly.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running the App](#running-the-app)
- [Development](#development)
- [What is this?](#what-is-this)
- [APIs Used](#apis-used)
- [Troubleshooting](#troubleshooting)
- [Video Demo](#video-demo)

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)
- For iOS development:
  - Mac computer
  - [Xcode](https://apps.apple.com/us/app/xcode/id497799835)
  - iOS Simulator
- For Android development:
  - [Android Studio](https://developer.android.com/studio)
  - Android Emulator

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a development build:
   ```bash
   npx expo prebuild
   ```

3. Start the development server:
   ```bash
   npx expo start --dev-client
   ```

## Running the App

Since this app uses native features, you'll need to run it using one of these methods:

### iOS
```bash
npx expo run:ios
```

### Android
```bash
npx expo run:android
```

> **Note**: This project cannot run in Expo Go due to its native dependencies.

## Development

- The main application code lives in the **app** directory.
- This project uses [Expo Router](https://docs.expo.dev/router/introduction/) for file-based routing.
- Edit files in the **app** directory to start developing your application.
- Ensure to use development builds to test native features effectively.

## What is this?

A cross-platform sports betting application built on Overtime Markets and the Coinbase Smart Wallet.

## APIs Used

- [Zerion](https://www.zerion.io/) - Used to get the user's assets and balances.
- [Pimlico](https://pimlico.io/) - Used to pay for the user's gas (optional with a couple of changes).
- [Supabase](https://supabase.com/) - Used to call edge functions.
- [PostHog](https://posthog.com/) - Used to track the user's events (optional).

## Troubleshooting

If you encounter build issues:

1. Clear the build cache:
   ```bash
   npx expo prebuild --clean
   ```

2. Remove node_modules and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```

## Video Demo

### Betting on a Game
[Watch Betting on a Game](https://www.joshbreite.com/bsquared/kcOverOpendingDaySquare.mov)

### Bet Tab Interaction States
[Watch Bet Tab Interaction States](https://www.joshbreite.com/bsquared/betTabInteractionStates.mov)

### Onboarding Flow
[Watch Onboarding Flow](https://www.joshbreite.com/bsquared/bsquaredIosOnboarding.mov)