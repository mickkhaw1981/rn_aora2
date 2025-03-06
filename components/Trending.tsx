import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'

// Define the Post interface based on the usage in home.jsx
interface Post {
  id: number;
  // Add other properties as needed
}

interface TrendingProps {
  posts: Post[];
}

const Trending = ({ posts }: TrendingProps) => {
  return (
    <View className="mt-4">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
            <Text className='text-white'>{item.id}</Text>
        )}
      />
    </View>
  )
}

export default Trending

