import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../hooks/useAuth';

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
    return null; // Should not happen
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Home</Text>
        <Text style={styles.info}>Name: {user.name}</Text>
        <Text style={styles.info}>Email: {user.email}</Text>
        <PrimaryButton title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default HomeScreen;