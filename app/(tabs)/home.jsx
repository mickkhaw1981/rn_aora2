import { Text, View, TouchableOpacity, Image, FlatList, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { useGlobalContext } from '@/context/GlobalProvider'
import { images, icons } from '@/constants'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function Home() {
  // const router = useRouter()
  // const { logout } = useGlobalContext()
  // const [posts, setPosts] = useState([])
  // const [latestPosts, setLatestPosts] = useState([])
  // const [refreshing, setRefreshing] = useState(false)

  // const handleSignOut = async () => {
  //   try {
  //     await logout()
  //     // Redirect to sign in page after successful sign out
  //     router.replace('/sign-in')
  //   } catch (error) {
  //     console.error('Error signing out:', error)
  //   }
  // }
  
  /*
  const onRefresh = () => {
    setRefreshing(true)
    // Add your refresh logic here
    setRefreshing(false)
  }
  */
  
  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={ [{ id: 1}, { id: 2}, { id: 3}]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className='text-white'>{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  JSMastery
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
