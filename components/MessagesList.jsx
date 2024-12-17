import { View, Text, ScrollView , ImageBackground} from 'react-native'
import React from 'react'
import MessageItem from './MessageItem'

const MessagesList = ({messages, currentUser, scrollViewRef}) => {
  return (
    
<ScrollView 
  ref={scrollViewRef} 
  contentContainerStyle={{ paddingBottom: 100, paddingHorizontal:15 }}
>
    {messages.map((msg, index) => (
      <MessageItem message={msg} key={index} currentUser={currentUser}/>
    ))}
</ScrollView>
  )
}

export default MessagesList