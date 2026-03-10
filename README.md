# React Native Authentication App

A complete React Native mobile application implementing a full user authentication flow using TypeScript, React Context API, React Navigation, and AsyncStorage for persistence.

## Features

- **User Authentication**: Login and Signup screens with form validation
- **Session Persistence**: Automatic restoration of user sessions using AsyncStorage
- **Clean Architecture**: Organized folder structure with separation of concerns
- **Reusable Components**: InputField and PrimaryButton components
- **TypeScript**: Full TypeScript support with proper interfaces
- **Modern UI**: Clean, responsive design with password visibility toggle
- **Navigation**: Conditional navigation based on authentication state

## Tech Stack

- React Native
- TypeScript
- React Context API for state management
- React Navigation (Native Stack Navigator)
- AsyncStorage for data persistence
- Expo Vector Icons

## Project Structure

```
src/
├── components/
│   ├── InputField.tsx
│   └── PrimaryButton.tsx
├── context/
│   └── AuthContext.tsx
├── hooks/
│   └── useAuth.ts
├── navigation/
│   └── AppNavigator.tsx
├── screens/
│   ├── LoginScreen.tsx
│   ├── SignupScreen.tsx
│   └── HomeScreen.tsx
├── types/
│   └── user.ts
└── utils/
    └── validators.ts
```

## Setup Instructions

1. **Prerequisites**:
   - Node.js (v14 or later)
   - npm or yarn
   - Expo CLI
   - React Native development environment

2. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd authapp
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Run on device/emulator**:
   - For iOS: `npm run ios`
   - For Android: `npm run android`
   - For Web: `npm run web`

## Implemented Features

### Authentication Flow
- **Login Screen**: Email and password input with validation
- **Signup Screen**: Name, email, and password registration
- **Home Screen**: Displays user information with logout option
- **Session Management**: Automatic login on app restart

### Form Validation
- Email format validation
- Password length requirement (minimum 6 characters)
- Real-time error display
- Button disable/enable based on validation

### UI Components
- **InputField**: Reusable input with label, error display, and password toggle
- **PrimaryButton**: Button with loading and disabled states
- **Responsive Design**: Keyboard avoiding and scrollable content

### State Management
- React Context API for global authentication state
- Custom hook `useAuth` for easy access to auth functions
- AsyncStorage integration for persistence

## Usage

1. **Launch the app**: The app will check for existing user session
2. **If not logged in**: Navigate to Login or Signup screens
3. **Login/Signup**: Enter credentials and submit
4. **Home Screen**: View user info and logout
5. **Logout**: Clears session and returns to login

## Development Notes

- The authentication is mocked for demonstration purposes
- In a real application, replace the mock API calls with actual backend integration
- Form validation can be extended with more complex rules
- UI styling can be customized further with themes or design systems

## Screenshots

(Add screenshots of Login, Signup, Home screens here)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test thoroughly
4. Submit a pull request

## License

This project is licensed under the MIT License.