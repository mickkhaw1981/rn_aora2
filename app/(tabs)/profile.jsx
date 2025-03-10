import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'

import { icons, images } from '@/constants'
import VideoCard from '@/components/VideoCard'
import { InfoBox } from '@/components'
import { useGlobalContext } from '@/context/GlobalProvider'
import { signOut } from '@/lib/appwrite'
import { router } from 'expo-router'

const Profile = () => {
  
  const { user, setUser, setIsLogged } = useGlobalContext();
  
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace('/sign-in'); 
  }
  // Sample video data for the profile page
  const videos = [
    {
      id: '1',
      title: 'Businessman Work with Laptop Computer in Office Manager Solving Problem',
      creator: user?.username || 'User',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      thumbnail: 'https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg',
      video: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      id: '2',
      title: 'Bull trading with computer Bullish in Stock market and',
      creator: user?.username || 'User',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      thumbnail: 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg',
      video: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
  ]

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <StatusBar style="light" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 pt-10 pb-20">
          {/* Header with logout button */}
          <View className="flex-row justify-end items-center px-4 mb-8">
            <TouchableOpacity onPress={logout}>
              <Image source={icons.logout} className="w-6 h-6" resizeMode="contain" />
            </TouchableOpacity>
          </View>

          {/* Profile Info */}
          <View className="items-center mb-8">
            <View className="w-24 h-24 rounded-lg border-2 border-secondary mb-3 overflow-hidden shadow-lg">
              <Image 
                source={images.profile} 
                className="w-full h-full" 
                resizeMode="cover"
              />
            </View>
            <Text className="font-psemibold text-lg text-white">{user?.username || "User"}</Text>
          </View>

          {/* Stats */}
          <View className="flex-row justify-center gap-12 mb-10">
            <InfoBox 
              title="10" 
              subtitle="Posts" 
            />
            <InfoBox 
              title="1.2k" 
              subtitle="Views" 
            />
          </View>

          {/* Videos */}
          <View>
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                title={video.title}
                creator={video.creator}
                avatar={video.avatar}
                thumbnail={video.thumbnail}
                video={video.video}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

