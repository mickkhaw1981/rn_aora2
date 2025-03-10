import { View, Text } from 'react-native';
import React from 'react';

interface InfoBoxProps {
  title: string;
  subtitle: string;
  containerStyles?: string;
  titleStyles?: string;
}

const InfoBox = ({ 
  title, 
  subtitle, 
  containerStyles = "", 
  titleStyles = "" 
}: InfoBoxProps) => {
  return (
    <View className={`items-center ${containerStyles}`}>
      <Text className={`font-psemibold text-xl text-white ${titleStyles}`}>
        {title}
      </Text>
      <Text className="font-pregular text-sm text-gray-100">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox; 