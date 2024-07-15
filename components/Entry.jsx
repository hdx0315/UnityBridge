// Entry.jsx
import React from 'react';
import { View, Text, Image } from 'react-native';
import { images } from '../constants';

const Entry = ({ profilePic, name, msgPrev, clType, timestamp }) => {
  return (
    <View className="pt-2 pb-2 flex-row items-center border-b-2 border-green-800 bg-bprimary-100">
      <Image source={images.profilePic} resizeMode="contain" className="w-[50px] h-[50px] ml-2" />
      <View className="flex-1 flex-col ml-2">
        <Text className="text-lg text-white font-psemibold">{name}</Text>
        {clType ? (
          <Text className="text-sm text-gray-400 ml-2">{clType}</Text>
        ) : (
          <Text className="text-sm text-gray-400 ml-2">{msgPrev}</Text>
        )}
      </View>
      <View className="ml-auto pr-2">
        <Text className="text-sm text-gray-400">{timestamp}</Text>
      </View>
    </View>
  );
};

export default Entry;