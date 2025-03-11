import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { icons } from '@/constants'
import * as ImagePicker from 'expo-image-picker'
import { Video, ResizeMode } from 'expo-av'

const Create = () => {
  // State variables
  const [title, setTitle] = useState("")
  const [video, setVideo] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [prompt, setPrompt] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const videoRef = useRef(null)

  // Function to pick video from library
  const pickVideo = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!')
      return
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setVideo(result.assets[0].uri)
    }
  }

  // Function to pick thumbnail
  const pickThumbnail = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!')
      return
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    })

    if (!result.canceled) {
      setThumbnail(result.assets[0].uri)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#1E1E1E]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View className="mt-4 mb-6">
            <Text className="text-2xl font-pbold text-white">Upload Video</Text>
          </View>

          {/* Video Title Input */}
          <FormField
            title="Video Title"
            value={title}
            placeholder="Give your video a catchy title..."
            handleChangeText={setTitle}
            otherStyles="mb-6"
          />
          
          {/* Video Upload Section */}
          <View className="mb-6">
            <Text className="text-base text-gray-100 font-pmedium mb-[8px]">Upload Video</Text>
            <TouchableOpacity 
              className="w-full h-[180px] bg-[#2A2A2A] rounded-lg overflow-hidden"
              activeOpacity={0.7}
              onPress={pickVideo}
            >
              {video ? (
                <Video
                  ref={videoRef}
                  source={{ uri: video }}
                  style={{ width: '100%', height: '100%' }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                />
              ) : (
                <View className="w-full h-full flex justify-center items-center">
                  <Image 
                    source={icons.upload}
                    className="w-12 h-12"
                    resizeMode="contain"
                  />
                  <Text className="text-gray-400 text-sm mt-2">Upload Video</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          
          {/* Thumbnail Image Selection */}
          <View className="mb-6">
            <Text className="text-base text-gray-100 font-pmedium mb-[8px]">Thumbnail Image</Text>
            <TouchableOpacity 
              className="w-full h-[56px] bg-[#2A2A2A] rounded-lg px-4 flex-row items-center"
              activeOpacity={0.7}
              onPress={pickThumbnail}
            >
              <Text className="mr-2">👍</Text>
              <Text className="text-white text-base">
                {thumbnail ? "Change thumbnail" : "Choose a file"}
              </Text>
              {thumbnail && (
                <Image 
                  source={{ uri: thumbnail }}
                  className="w-8 h-8 ml-auto rounded"
                  resizeMode="cover"
                />
              )}
            </TouchableOpacity>
          </View>
          
          {/* AI Prompt Input */}
          <FormField
            title="AI Prompt"
            value={prompt}
            placeholder="The AI prompt of your video..."
            handleChangeText={setPrompt}
            otherStyles="mb-8"
          />
          
          {/* Submit Button */}
          <CustomButton
            title="Submit & Publish"
            handlePress={() => {}}
            containerStyles="bg-[#FF8C00] rounded-lg mb-20"
            textStyles="text-white font-pbold"
            isLoading={isSubmitting}
          />
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Create

