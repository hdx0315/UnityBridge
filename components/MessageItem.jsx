import { View, Text } from 'react-native';
import React from 'react';


const MessageItem = ({message, currentUser}) => {
    if (currentUser?.userId == message?.userId) {
        return (
            <View className='flex-row justify-end mb-2 mr-1'>
                <View className='w-4/5'>
                <View className='flex self-end p-3 rounded-lg bg-secondary-700'>
                <Text className="text-white text-lg">{message.text}</Text>
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


  if (currentUser?.userId === message?.userId) {
    return (
      <View testID="message-container" style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 8, marginRight: 4 }}>
        <View style={{ width: '80%' }}>
          <View style={{ alignSelf: 'flex-end', padding: 12, borderRadius: 10, backgroundColor: '#B37E62' }}>
            <Text style={{ color: '#FFF', fontSize: 16 }}>{message.text}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View testID="message-container" style={{ width: '80%', marginBottom: 8, marginLeft: 4 }}>
        <View style={{ alignSelf: 'flex-start', padding: 12, borderRadius: 10, backgroundColor: '#FFD700' }}>
          <Text style={{ color: '#000', fontSize: 16 }}>{message.text}</Text>
        </View>
      </View>
    );
  }
};

export default MessageItem;
