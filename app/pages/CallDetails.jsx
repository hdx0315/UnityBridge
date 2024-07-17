// InboxChat.jsx
import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import CallHeader from '../../components/CallHeader';

const CallDetails = () => {
  return (
    <SafeAreaView className="flex-1">
      <View>
        <CallHeader/>
      </View>


      <ScrollView className="flex-1 bg-bprimary-100 p-4">
      <Text className="text-xl text-white pt-4">
          Caller Name
        </Text>

        <Text className="text-lg text-white pt-2">
          Call Type
        </Text>

        <Text className="text-lg text-gray-400 p-2">
          Call Duration
        </Text>




      </ScrollView>
    </SafeAreaView>
  );
}

export default CallDetails