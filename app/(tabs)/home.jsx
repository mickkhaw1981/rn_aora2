import { Text, View, TouchableOpacity, Image, FlatList, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { images, icons } from '@/constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import Search from '@/components/Search'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import { getAllPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'

export default function Home() {
  const { data: posts, refetch } = useAppwrite(getAllPosts);

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }
  console.log(posts)

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard 
            title={item.title}
            creator={item.creator?.username || "Unknown"}
            avatar={item.creator?.avatar || "https://via.placeholder.com/46"}
            thumbnail={item.thumbnail}
            video={item.videoUrl}
          />
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

            <Search placeholder="Search for video topic..." />

            {/* Latest video section */}
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-white text-base font-pregular mt-0.5">Trending Videos</Text>
              <Trending posts={[ { id: 4}, { id: 5}, { id: 6} ?? []]} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No videos found"
            subtitle="Be the first to upload a video"   
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
