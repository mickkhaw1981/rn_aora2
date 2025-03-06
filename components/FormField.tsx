import { Text, View, TextInput, TouchableOpacity, KeyboardTypeOptions, Image, Platform, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { icons } from '@/constants'

interface FormFieldProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles = "",
  keyboardType = "default",
  secureTextEntry = false,
  autoCapitalize = "sentences"
}: FormFieldProps) => {

 const [showPassword, setShowPassword] = useState(false) 
 const [isFocused, setIsFocused] = useState(false)
 const lowercaseTitle = title.toLowerCase()

  return (
    <View className={`${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium mb-[8px]">{title}</Text>
      
      <View className={`w-full h-16 px-4 bg-black-100 rounded-2xl border-2 ${isFocused ? 'border-secondary' : 'border-black-200'} flex flex-row items-center`}>
        <TextInput
            className="flex-1 text-white font-psemibold text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7B7B8B"
            onChangeText={handleChangeText}
            keyboardType={keyboardType}
            secureTextEntry={lowercaseTitle === "password" && !showPassword}
            selectionColor="#FF9C01"
            cursorColor="#FF9C01"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoCapitalize={autoCapitalize}
        />
         {lowercaseTitle === "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 2,
    borderColor: '#232533',
  },
  focusedInput: {
    borderColor: '#FF9C01',
  }
});

export default FormField

