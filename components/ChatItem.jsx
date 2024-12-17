

import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { images } from '../constants';
import { formatDate, getRoomId } from '../utils/common' 
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import proPics from '../constants/proPic';

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

    // Select a profile pic, either from proPics or user's actual profile pic
    const profilePic = item.profilePic || 
    proPics[Math.floor(Math.random() * proPics.length)];

    const openChatRoom = () => {
        
        router.push({ 
            pathname: 'pages/InboxChat', 
            params: { 
                ...item, 
                profilePic 
            } 
        });

        console.log("in chbat items", item, profilePic)
    }

    const renderTime = () => {
        if (lastMessage) {
            let date = new Date(lastMessage?.createdAt?.seconds * 1000);
            return formatDate(date);
        }
        return '';
    }

    const renderLastMessage = () => {
        if (typeof lastMessage === 'undefined') return 'Loading...'
        if (lastMessage) {
            if (currentUser?.userId == lastMessage?.userId) return "You: " + lastMessage?.text
            return lastMessage?.text
        } else {
            return 'Say Hi!!!'
        }
    }

    // Select a profile pic
//    const proPic = item.profilePic || 
  //      proPics[Math.floor(Math.random() * proPics.length)];

    return (
        lastMessage ? (
        <TouchableOpacity
            className={`pt-4 pb-4 flex-row items-center ${noBorder ? "" : 'border-b-2 border-secondary'}`}
            onPress={openChatRoom}
        >
            <Image
                source={profilePic}
                resizeMode="contain"
                className="w-[50px] h-[50px] ml-2 rounded-full"
            />
            <View className="flex-1 flex-col ml-2">
                <Text className="text-lg text-t_primary font-psemibold">
                    {item?.username}
                </Text>
                <Text className="text-sm text-t_primary ml-2">{renderLastMessage()}</Text>
            </View>
            <View className="ml-auto pr-2">
                <Text className="text-sm text-t_primary">
                {renderTime()}
                </Text>
            </View>
        </TouchableOpacity>
        ) : null
    );
};

export default ChatItem;