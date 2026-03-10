import React, { useCallback } from 'react';
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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { validateEmail, validatePassword } from '../utils/validators';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '../utils/theme';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const form = useForm({
    email: '',
    password: '',
  });

  const validateForm = useCallback(() => {
    const newErrors: { [key: string]: string } = {};

    if (!form.values.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(form.values.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!form.values.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(form.values.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    form.setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleLogin = useCallback(async () => {
    if (!validateForm()) return;

    try {
      await login(form.values.email, form.values.password);
    } catch (err: any) {
      form.setError('general', err.message || 'Invalid email or password.');
    }
  }, [form, login, validateForm]);

  const navigateToSignup = useCallback(() => {
    Keyboard.dismiss(); // Dismiss keyboard when navigating
    navigation.navigate('Signup');
  }, [navigation]);

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const isDisabled = form.isSubmitting;

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
            <View style={styles.logoCircle}>
             <Ionicons name="log-in-outline" style={styles.logoIcon} />
            </View>
          </View>
          <Text style={styles.heading}>Sign in to your account</Text>
          <Text style={styles.subheading}> Welcome back</Text>
          <View style={styles.card}>
            {form.errors.general ? (
              <View style={styles.banner}>
                <Text style={styles.bannerText}>{form.errors.general}</Text>
              </View>
            ) : null}
            <InputField
              label="Email"
              value={form.values.email}
              onChangeText={(text) => form.setValue('email', text)}
              placeholder="you@example.com"
              error={form.errors.email}
              keyboardType="email-address"
            />
            <InputField
              label="Password"
              value={form.values.password}
              onChangeText={(text) => form.setValue('password', text)}
              placeholder="Password"
              error={form.errors.password}
              isPassword
            />
            <PrimaryButton
              title="Sign In"
              onPress={handleLogin}
              disabled={isDisabled}
              loading={form.isSubmitting}
              backgroundColor={COLORS.primary}
              shadowColor={COLORS.primary}
            />
          </View>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text style={styles.footerLink} onPress={navigateToSignup}>
              Create one
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
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },
  logoIcon: {
    color: COLORS.background,
    fontSize: 32,
  },
  heading: {
    fontSize: FONT_SIZE.xxxl,
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
    color: COLORS.primary,
    fontWeight: FONT_WEIGHT.medium,
  },
});

export default LoginScreen;