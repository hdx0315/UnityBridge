import { View, FlatList } from 'react-native';
import React from 'react'
import { useRouter } from 'expo-router';
import NewChatItem from './newChatItem';
const NewChatList = ({ users, currentUser }) => {
    const router = useRouter();

    return (
        <View className="flex-1">
            <FlatList
                data={users}
                contentContainerStyle={{ flex: 1 }}
                keyExtractor={() => Math.random().toString()}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                    <NewChatItem
                        noBorder={index + 1 === users.length}
                        item={item}
                        router={router}
                        currentUser={currentUser}
                    />
                )}
            />
        </View>
    );
};



export default NewChatList