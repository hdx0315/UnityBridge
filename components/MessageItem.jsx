import { View, Text } from 'react-native'
import React from 'react'

const MessageItem = ({message, currentUser}) => {
    if (currentUser?.userId == message?.userId) {
        return (
            <View className='flex-row justify-end mb-2 mr-1'>
                <View className='w-4/5'>
                <View className='flex self-end p-3 rounded-lg bg-secondary'>
                <Text className="text-t_primary text-lg">{message.text}</Text>
                {/* test line */}
                </View>
                </View>
            </View>
          )
    } else {
        return (
            <View className='w-4/5 mb-2 ml-1'>
                <View className='flex self-start p-3 rounded-lg bg-secondary'>
                <Text className='text-t_primary text-lg'>{message.text}</Text>
                </View>
            </View>
        )
    }
  
}

export default MessageItem