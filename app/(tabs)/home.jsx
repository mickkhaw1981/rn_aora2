import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useGlobalContext } from '@/context/GlobalProvider'

const Home = () => {
  const router = useRouter()
  const { logout } = useGlobalContext()

  const handleSignOut = async () => {
    try {
      await logout()
      // Redirect to sign in page after successful sign out
      router.replace('/sign-in')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <TouchableOpacity 
        style={styles.signOutButton} 
        onPress={handleSignOut}
      >
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
  signOutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
})

