<img width="434" height="79" alt="app-full-logo" src="https://github.com/user-attachments/assets/ab19f66a-37e1-4298-b0b8-7f089140cd41" />

# WeRoster - Rostering App for Clinicians

> A mobile rostering application for healthcare clinicians

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [iOS Setup](#ios-setup-macos-only)
- [Android Setup](#android-setup)
- [Common Issues & Solutions](#common-issues--solutions)
- [Running the Application](#running-the-application)
- [Next Steps](#next-steps)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Acknowledgements](#acknowledgements)

---

## About

WeRoster is a modern mobile rostering application designed specifically for healthcare clinicians to manage their shifts seamlessly. Built with React Native and Expo, WeRoster provides an intuitive interface for viewing personal schedules, monitoring team availability, and managing shift changes—all from your iOS or Android device. With real-time calendar views and comprehensive request tracking, WeRoster simplifies workforce management and gives clinicians greater control over their work schedules.

---

## Features

- 📅 **Personal Calendar View** - View all your assigned shifts in an intuitive calendar interface
- 👥 **Team Schedule** - See your team members' shifts and availability
- 🔓 **Open Shifts** - Browse and apply for available open shifts in the same intuitive calendar interface
- 🔄 **Shift Swapping** - Request to swap shifts with team members
- 📝 **Request Management** - Track all your leave requests, shift applications, and swap requests
- 🔐 **Secure Authentication** - Login securely to access your personalized schedule
- 📱 **Cross-Platform** - Available on both iOS and Android

---

## Prerequisites

Before you begin, ensure you have the following installed:

### Required
- **Node.js** (v20.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **MySQL** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/mysql/)
- **Expo CLI** - Install globally: `npm install -g expo-cli`

### For Mobile Development
- **iOS Development (macOS only)**:
  - Xcode (v14.0 or higher) - [Download from Mac App Store](https://apps.apple.com/us/app/xcode/id497799835)
  - iOS Simulator (included with Xcode)
  - CocoaPods - Install: `sudo gem install cocoapods`
  - Xcode Command Line Tools: `xcode-select --install`

- **Android Development**:
  - [Android Studio](https://developer.android.com/studio) (latest version)
  - Android SDK (API level 33 or higher)
  - Android Emulator or physical Android device
  - Java Development Kit (JDK) 17 or higher
  - Configure Android environment variables (`ANDROID_HOME`, etc.)

### Optional but Recommended
- **EAS CLI** (for building production apps) - Install: `npm install -g eas-cli`
- **Maestro** (for E2E testing) - [Installation Guide](https://maestro.mobile.dev/getting-started/installing-maestro)
  - Or run: `npm run maestro:setup`

### Environment Setup
- For Android development, ensure `adb` (Android Debug Bridge) is accessible from your terminal
- For iOS development on physical devices, you'll need an Apple Developer account

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/weroster-team41.git
cd weroster-team41
```

### 2. Install Dependencies
```bash
npm run installs
```

This command installs dependencies for both the frontend and backend.

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory:
```bash
cd backend
cp .env.example .env
```

Update the `.env` file with your configuration:
```env
DATABASE_URL="mysql://username:password@localhost:3306/weroster"
JWT_SECRET="your-secret-key"
PORT=3000
```

### 4. Set Up the Database
```bash
cd backend
npx prisma generate
npx prisma db push
# Optional: Seed the database
npx prisma db seed
cd ..
```

### 5. Platform-Specific Setup

Choose your target platform and follow the appropriate setup instructions:

---

## iOS Setup (macOS only)

### Step 1: Install Xcode

1. Download Xcode from the [Mac App Store](https://apps.apple.com/us/app/xcode/id497799835)
2. Open Xcode and complete the initial setup
3. Accept the Xcode license agreement:
```bash
sudo xcodebuild -license accept
```

### Step 2: Install iOS Simulator

1. Open Xcode → **Settings** (or **Preferences**) → **Platforms**
2. Download **iOS 18.4 Simulator** (or your preferred iOS version)
3. Wait for the download and installation to complete

### Step 3: Verify Simulator Installation

List available simulators:
```bash
xcrun simctl list devices
```

You should see a list of installed iOS simulators.

### Step 4: Install CocoaPods Dependencies
```bash
cd ios
pod install
cd ..
```

### Step 5: Run the App
```bash
npm run ios
```

**Note:** The first build may take 10-15 minutes. Subsequent builds will be faster.

#### Optional: Manually Boot a Simulator
```bash
# Boot a specific simulator
xcrun simctl boot "iPhone 16 Pro"

# Open Simulator app
open -a Simulator
```

---

## Android Setup

### Step 1: Install Android Studio

1. Download [Android Studio](https://developer.android.com/studio)
2. Run the installer and complete the setup wizard
3. During setup, ensure you install:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)
4. Accept all license agreements when prompted

### Step 2: Configure Android Environment Variables

Add the following to your shell configuration file (`~/.zshrc` for Zsh or `~/.bash_profile` for Bash):
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
```

**Why is this needed?** Unlike Xcode (which auto-installs to standard macOS locations), Android SDK can be installed anywhere, so we need to explicitly define these paths.

Apply the changes:
```bash
source ~/.zshrc  # or source ~/.bash_profile
```

### Step 3: Create an Android Virtual Device (AVD)

1. Open Android Studio
2. Click **More Actions** → **Virtual Device Manager**
3. Click **Create Device** (or select an existing device)
4. Choose a device definition (e.g., Pixel 6)
5. Select a system image (e.g., API 34 - Android 14)
6. Click **Finish**
7. Start the emulator by clicking the **▶ Play** button

### Step 4: Verify Android Setup

Check that ADB recognizes your emulator:
```bash
adb devices
```

You should see your emulator listed (e.g., `emulator-5554`).

### Step 5: Configure Port Forwarding

If testing on a physical device or encountering connection issues:
```bash
npm run adb
```

This forwards the necessary ports for backend communication.

### Step 6: Run the App
```bash
npm run android
```

**Note:** The first build may take 10-15 minutes. Subsequent builds will be faster.

---

## Common Issues & Solutions

### iOS Issues

**Problem:** `xcrun: error: unable to find utility "simctl"`
- **Solution:** Install Xcode Command Line Tools: `xcode-select --install`

**Problem:** `CocoaPods could not find compatible versions`
- **Solution:** Update CocoaPods: `cd ios && pod repo update && pod install`

### Android Issues

**Problem:** `ANDROID_HOME is not set`
- **Solution:** Verify environment variables are correctly set and restart your terminal

**Problem:** `[CXX1101] NDK at /path/to/ndk did not have a source.properties file`
- **Solution:**
  1. Open Android Studio → **Settings** (⌘,) → **SDK Manager** → **SDK Tools** tab
  2. Check **Show Package Details** (bottom right)
  3. Find the NDK version mentioned in the error (e.g., 27.1.12297006)
  4. Install that specific NDK version
  5. Click **Apply** and wait for installation
  6. Retry: `npm run android`

**Problem:** `No connected devices` when running `adb devices`
- **Solution:** Ensure your emulator is running. Start it from Android Studio's Device Manager

**Problem:** `Metro bundler connection issues`
- **Solution:** Run `npm run adb` to configure port forwarding

---

## Running the Application

After completing platform-specific setup, you can use these commands:
```bash
# Run on iOS
npm run ios

# Run on Android  
npm run android

# Run backend only
cd backend && npm run dev

# Run everything concurrently (backend + iOS + Android)
npm run start
```

---

## Next Steps

Once the app is running, you can:
- Login with test credentials (see [Testing](#Testing) section)
- Explore the calendar and roster features
- Run E2E tests: `npm run test:e2e`

---

## Project Structure
```
weroster-team41/
├── app/                          # Main application directory
│   └── frontend/                 # React Native Expo mobile application
│       ├── components/           # Reusable UI components (buttons, cards, etc.)
│       ├── context/              # React Context providers for global state
│       ├── navigators/           # Navigation configuration and stack navigators
│       ├── screens/              # Main app screens
│       └── services/             # API connection layer and custom React hooks
├── assets/                       # Static files (images, fonts, icons)
├── backend/                      # Decoupled Node.js backend server
│   ├── prisma/                   # Database schema, migrations, and Prisma client
│   └── src/
│       ├── routes/               # API endpoint definitions and route handlers
│       ├── services/             # Business logic and data service layer
│       ├── middleware/           # Express middleware (auth, validation, error handling)
│       ├── constants/            # Shared constants and configuration values
│       ├── types/                # TypeScript type definitions and interfaces
│       └── tests/                # Unit and integration tests for backend
├── scripts/                      # Miscellaneous helper and automation scripts
└── .maestro/                     # End-to-end mobile UI tests and Maestro flows
```

---

## API Documentation

[Link to API documentation]

---

## Testing
```bash
npm test
```

---

## Acknowledgements

[Add acknowledgements here]
