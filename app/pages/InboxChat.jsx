// InboxChat.jsx
import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import ChatHeader from '../../components/ChatHeader';

  const InboxChat = () => {

    //fetch sampleMessages from DB
    const sampleMessages = [
      { id: 1, text: 'Hey', time: '10:00 AM' },
      { id: 2, text: 'Hey, how are you?', time: '10:05 AM' },
      { id: 3, text: 'Doing well, thanks. Whatsup!?', time: '10:10 AM' },
    ];
  

  return (
    <SafeAreaView className="flex-1">
      <View>
        <ChatHeader/>
      </View>


      <ScrollView className="flex-1 bg-bprimary-100 p-4">
        {/* Sample messages */}


        {sampleMessages.map((message) => (
          <View key={message.id}  className="p-4 bg-emerald-950 rounded-lg mb-2">
            <Text className="text-white">
              {message.text}
            </Text>
            <Text className="text-gray-500 ml-4">
              {message.time}
            </Text>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
};

export default InboxChat;
