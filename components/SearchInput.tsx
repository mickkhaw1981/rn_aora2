import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

import icons from '@/constants/icons';

interface SearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchInput = ({ placeholder = "Search...", onSearch }: SearchProps) => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        // Default behavior: navigate to search page with query
        router.push(`/search/${searchQuery}`);
      }
    }
  };

  return (
    <View className="flex-row items-center bg-gray-800 rounded-xl px-4 py-2">
      <TextInput
        className="flex-1 text-white font-pregular text-base"
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        value={searchQuery}
        onChangeText={ (e) => setSearchQuery(e) }
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity 
        className="ml-2 p-2"
        onPress={handleSearch}
      >
        <Image
          source={icons.search}
          className="w-5 h-5"
          tintColor="#9ca3af"
          accessibilityLabel="Search"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput; 