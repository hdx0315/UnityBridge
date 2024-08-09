import { View, FlatList } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import ChatItem from './ChatItem'

const ChatList = ({ users }) => {
    const router = useRouter()

  return (
    <View className='flex-1'>
            <FlatList
                data={users}
                contentContainerStyle={{ flex: 1 }}
                keyExtractor={(item) => Math.random()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) =>
                    <ChatItem
                        noBorder={index + 1 == users.length}
                        item={item}
                        router={router}
                    />
                }
            />
        </View>
  )
}

export default ChatList