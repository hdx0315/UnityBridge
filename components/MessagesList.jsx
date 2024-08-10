import { View, Text, ScrollView } from 'react-native'
import React from 'react'

const MessagesList = ({messages}) => {
  return (
    <ScrollView className="flex-1 bg-bprimary-100 p-4" contentContainerStyle={{ paddingBottom: 100 }}>
          {messages.map((msg) => (
            <View key={msg.id} className="p-3 bg-emerald-950 rounded-lg mb-2">
              <Text className="text-white text-lg">{msg.text}</Text>
              <Text className="text-gray-500 ml-4">{msg.time}</Text>
            </View>
          ))}
      </ScrollView>
  )
}

export default MessagesList