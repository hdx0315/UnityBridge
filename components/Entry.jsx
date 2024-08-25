

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';


const Entry = ({ profilePic, name, msgPrev, clType, timestamp, onPress }) => {
  return (
    <TouchableOpacity 
      className="pt-4 pb-4 flex-row items-center border-b-2 border-green-800 bg-emerald-950"
      onPress={onPress}
    >
      <Image
       source={profilePic} 
       resizeMode="contain" 
       className="w-[50px] h-[50px] ml-2 rounded-full" 
      />

      <View className="flex-1 flex-col ml-2">
        <Text className="text-lg text-white font-psemibold">
          {name}
        </Text>

        {clType ? (
          <Text className="text-sm text-gray-400 ml-2">{clType}</Text>
        ) : (
          <Text className="text-sm text-gray-300 ml-2">{msgPrev}</Text>
        )}
      </View>

      <View className="ml-auto pr-2">
        <Text className="text-sm text-red-500">
          {timestamp}
        </Text>
      </View>

    </TouchableOpacity>
  );
};

export default Entry;