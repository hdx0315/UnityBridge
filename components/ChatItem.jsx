import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { images } from '../constants';

const ChatItem = ({ item, router, noBorder }) => {
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