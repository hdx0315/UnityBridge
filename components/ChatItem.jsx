import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { images } from '../constants';
import { getRoomId } from '../utils/common' 
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';

const ChatItem = ({ item, router, noBorder, currentUser }) => {
    const [lastMessage, setLastMessage] = useState(undefined)

    useEffect(() => {
        let roomId = getRoomId(currentUser?.userId, item?.userId)
        const docRef = doc(db, 'rooms', roomId)
        const messagesRef = collection(docRef, 'messages')
        const q = query(messagesRef, orderBy('createdAt', 'desc'))

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map((doc) => {
                return doc.data()
            })
            setLastMessage(allMessages[0] ? allMessages[0] : null)
        })

        return unsub;
    }, [])

    console.log('last message', lastMessage)

    const openChatRoom = () => {
        router.push({pathname: 'pages/InboxChat', params: item})
    }
    return (
        <TouchableOpacity
            className={`pt-4 pb-4 flex-row items-center ${noBorder ? "" : 'border-b-2 border-green-800'}`}
            onPress={openChatRoom}
        >
            <Image
                source={images.profile}
                resizeMode="contain"
                className="w-[50px] h-[50px] ml-2 rounded-full"
            />
            <View className="flex-1 flex-col ml-2">
                <Text className="text-lg text-white font-psemibold">
                    {item?.username}
                </Text>
                <Text className="text-sm text-gray-400 ml-2">Last Message</Text>
            </View>
            <View className="ml-auto pr-2">
                <Text className="text-sm text-gray-400">
                    22:10
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default ChatItem;