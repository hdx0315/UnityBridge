

import { View, Text, ScrollView, TextInput, Button, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatHeader from '../../components/ChatHeader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams } from 'expo-router';
import MessagesList from '../../components/MessagesList';
import { useAuthContext } from '../../contexts/AuthContext'
import { db } from '../../lib/firebase';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { getRoomId } from '../../utils/common';

const InboxChat = () => {
  const item = useLocalSearchParams()

  const { user } = useAuthContext()

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey', time: '10:00 AM' },
    { id: 2, text: 'Hey, how are you?', time: '10:05 AM' },
    { id: 3, text: 'Doing well, thanks. Whatsup!?', time: '10:10 AM' },
  ]);

  useEffect(() => {
    createRoomIfNotExists()
}, [])

  const createRoomIfNotExists = async () => {
    let roomId = getRoomId(user?.userId, item?.userId)
    await setDoc(doc(db, 'rooms', roomId), {
        roomId,
        createdAt: Timestamp.fromDate(new Date())
    })
    console.log('Room created', roomId);
    
}

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View>
        <ChatHeader user={item}/>
      </View>
      <View className='flex-1 justify-between overflow-visible'>
        <MessagesList messages={messages}/>
      </View>
      <KeyboardAvoidingView behavior="padding" className="bg-primary" >
        <View className="flex-row items-center pr-2 pb-2 bg-emerald-950 text-zinc-400">
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#22c55e"
            selectionColor="#22c55e"
            multiline={true}
            className="flex-1 h-10 border border-green-500 rounded-xl m-2 pl-4 text-white text-lg"
          />
          <TouchableOpacity title="Send" onPress={handleSendMessage} className="mr-2">
            <FontAwesome name="send" size={30} color="#22c55e" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default InboxChat;
