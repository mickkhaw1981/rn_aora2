import { Text, View, TextInput, TouchableOpacity, KeyboardTypeOptions, Image } from 'react-native'
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
}

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles = "",
  keyboardType = "default",
  secureTextEntry = false
}: FormFieldProps) => {

 const [showPassword, setShowPassword] = useState(false) 

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      
      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
            className="flex-1 text-white font-psemibold text-base"
            value={value}
            placeholder={placeholder}
            onChangeText={handleChangeText}
            keyboardType={keyboardType}
            secureTextEntry={title === "Password" && !showPassword}
        />
         {title === "Password" && (
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

export default FormField

