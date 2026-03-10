import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '../utils/theme';

const HomeScreen: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Logout Failed', 'Something went wrong');
    }
  };

  if (!user) {
    return null; // should not render when no user
  }

  const initials = user.name
    .split(' ')
    .map((w: string) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.badge}>
            <Ionicons name="checkmark-circle" size={12} color={COLORS.secondary} style={{ marginRight: 4 }} />
            <Text style={styles.badgeText}>Logged in</Text>
          </View>
        </View>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.username}>{user.name}</Text>
      </View>
      <View style={styles.infoCard}>
        <View style={styles.row}>
          <Ionicons name="mail-outline" size={20} color={COLORS.textPrimary} style={{ marginRight: 12 }} />
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Email Address</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Ionicons name="person-outline" size={20} color={COLORS.textPrimary} style={{ marginRight: 12 }} />
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Display Name</Text>
            <Text style={styles.infoValue}>{user.name}</Text>
          </View>
        </View>
      </View>
      <View style={styles.spacer} />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="log-out-outline" size={16} color={COLORS.error} style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  accentBar: {
    width: 48,
    height: 4,
    backgroundColor: COLORS.primary,
    alignSelf: 'center',
    marginBottom: SPACING.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    marginTop: SPACING.lg,
  },
  avatarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    left: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12
  },
  avatarText: {
    color: COLORS.background,
    fontSize: 28,
    fontWeight: FONT_WEIGHT.bold,
  },
  badge: {
    marginLeft: -16,
    marginTop: 48,
    backgroundColor: 'rgba(78,205,196,0.1)',
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    color: COLORS.secondary,
    fontSize: FONT_SIZE.xs,
  },
  greeting: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.md,
    marginBottom: SPACING.xs,
  },
  username: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
  },
  infoCard: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  icon: {
    fontSize: 20,
    marginRight: 12,
    color: COLORS.textPrimary,
  },
  infoColumn: {
    flex: 1,
  },
  infoLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
  },
  infoValue: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.medium,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  spacer: {
    flex: 1,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: COLORS.error,
    backgroundColor: 'rgba(255,107,138,0.08)',
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
    alignItems: 'center',
  },
  logoutText: {
    color: COLORS.error,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.medium,
  },
});

export default HomeScreen;