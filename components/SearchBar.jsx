import React from 'react';
import { View, TextInput } from 'react-native';

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <View className="p-2">
      <TextInput
        style={{
          borderRadius: 8,
          borderWidth: 1,
          borderColor: 'brown',
          paddingHorizontal: 10,
          height: 40,
        }}
        placeholder="Search Contact"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
    </View>
  );
}

export default SearchBar;