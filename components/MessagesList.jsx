import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import MessageItem from './MessageItem'

const MessagesList = ({messages, currentUser, scrollViewRef}) => {
  return (
    <ScrollView ref={scrollViewRef} className="flex-1 bg-bprimary-100 p-4" contentContainerStyle={{ paddingBottom: 100 }}>
          {messages.map((msg, index) => (
                <MessageItem message={msg} key={index} currentUser={currentUser}/>
))}
      </ScrollView>
  )
}

export default MessagesList