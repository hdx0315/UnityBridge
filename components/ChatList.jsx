import { View, FlatList } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import ChatItem from './ChatItem'

const ChatList = ({ users, currentUser }) => {
    const router = useRouter()

  return (
    <View className='flex-1'>
            <FlatList
                data={users}
                contentContainerStyle={{ flex: 1 }}
                keyExtractor={(item) => Math.random()}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                renderItem={({ item, index }) =>
                    <ChatItem
                        noBorder={index + 1 == users.length}
                        item={item}
                        router={router}
                        currentUser={currentUser}
                    />
                }
            />
        </View>
  )
}

export default ChatList