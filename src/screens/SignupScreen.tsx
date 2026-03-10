import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/validators';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '../utils/theme';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigation = useNavigation<SignupScreenNavigationProp>();

  const handleSignup = useCallback(async () => {
    const newErrors: { name?: string; email?: string; password?: string; general?: string } = {};

    if (!name) {
      newErrors.name = 'Name is required';
    }
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      await signup(name, email, password);
    } catch (err: any) {
      setErrors({ general: err.message || 'Unable to create account.' });
    } finally {
      setLoading(false);
    }
  }, [name, email, password, signup]);

  const navigateToLogin = useCallback(() => {
    Keyboard.dismiss(); // Dismiss keyboard when navigating
    navigation.navigate('Login');
  }, [navigation]);

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const isDisabled = loading;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoWrapper}>
            <View style={[styles.logoCircle, { backgroundColor: COLORS.secondary }]}
            >
              <Ionicons name="person-add-outline" style={styles.logoIcon} />
            </View>
          </View>
          <Text style={styles.heading}>Sign Up</Text>
          <Text style={styles.subheading}>Create account</Text>
          <View style={styles.card}>
            {errors.general ? (
              <View style={styles.banner}>
                <Text style={styles.bannerText}>{errors.general}</Text>
              </View>
            ) : null}
            <InputField
              label="Name"
              value={name}
              onChangeText={(text) => {
                setName(text);
                setErrors({});
              }}
              placeholder="Your name"
              error={errors.name}
            />
            <InputField
              label="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors({});
              }}
              placeholder="you@example.com"
              error={errors.email}
              keyboardType="email-address"
            />
            <InputField
              label="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors({});
              }}
              placeholder="Password"
              error={errors.password}
              isPassword
            />
            <PrimaryButton
              title="Create Account"
              onPress={handleSignup}
              disabled={isDisabled}
              loading={loading}
              backgroundColor={COLORS.secondary}
              textColor={COLORS.background}
              shadowColor={COLORS.secondary}
            />
          </View>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text style={styles.footerLink} onPress={navigateToLogin}>
              Sign in
            </Text>
          </Text>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },
  logoIcon: {
    fontSize: 32,
    color: COLORS.background,
  },
  heading: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subheading: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
  },
  banner: {
    backgroundColor: COLORS.error,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.md,
  },
  bannerText: {
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontWeight: FONT_WEIGHT.medium,
  },
  footerText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.xl,
    fontSize: FONT_SIZE.md,
  },
  footerLink: {
    color: COLORS.secondary,
    fontWeight: FONT_WEIGHT.medium,
  },
});

export default SignupScreen;