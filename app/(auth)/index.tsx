import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Section from '@/components/coinbaseComponents/section';
import { useAuth } from '@/components/AuthContext';
import { useDisconnect } from '@/hooks/cbHooks/useDisconnect';

export default function AuthenticatedIndex() {
  const { address } = useAuth();
  const handleDisconnect = useDisconnect();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your Authenticated Area</Text>
      
      <View style={styles.addressContainer}>
        <Text style={styles.addressLabel}>Your Wallet Address:</Text>
        <Text style={styles.addressText}>{address}</Text>
      </View>

      <Section
        key="disconnect"
        title="Disconnect Wallet"
        buttonLabel="Disconnect"
        onPress={handleDisconnect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  addressContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  addressText: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});