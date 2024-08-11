

import { View, Text, ScrollView, TextInput, Button, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatHeader from '../../components/ChatHeader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams } from 'expo-router';
import MessagesList from '../../components/MessagesList';
import { useAuthContext } from '../../contexts/AuthContext'
import { db } from '../../lib/firebase';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { getRoomId } from '../../utils/common';

const InboxChat = () => {
  const item = useLocalSearchParams()

  const { user } = useAuthContext()

  const [messages, setMessages] = useState([]);

  // const [messages, setMessages] = useState([
  //   { id: 1, text: 'Hey', time: '10:00 AM' },
  //   { id: 2, text: 'Hey, how are you?', time: '10:05 AM' },
  //   { id: 3, text: 'Doing well, thanks. Whatsup!?', time: '10:10 AM' },
  // ]);
  // const messageRef = useRef('');
  // const textInputRef = useRef(null);

  const textRef = useRef('')
    const inputRef = useRef(null)

  useEffect(() => {
    createRoomIfNotExists()
    let roomId = getRoomId(user?.userId, item?.userId)
        const docRef = doc(db, 'rooms', roomId)
        const messagesRef = collection(docRef, 'messages')
        const q = query(messagesRef, orderBy('createdAt', 'asc'))
        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map((doc) => {
                return doc.data()
            })
            setMessages([...allMessages])
        })
        return unsub;
  }, [])

  console.log(messages);

  const createRoomIfNotExists = async () => {
    let roomId = getRoomId(user?.userId, item?.userId)
    await setDoc(doc(db, 'rooms', roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date())
    })
    // console.log('Room created', roomId);

  }

  const handleSendMessage = async () => {
    let message = textRef.current.trim()
        if (!message) return
        try {
            let roomId = getRoomId(user?.userId, item?.userId)
            const docRef = doc(db, 'rooms', roomId)
            const messagesRef = collection(docRef, 'messages')
            textRef.current = ''
            if (inputRef) inputRef.current.clear()
            const newDoc = await addDoc(messagesRef, {
                userId: user?.userId,
                text: message,
                username: user?.username,
                createdAt: Timestamp.fromDate(new Date())
            })
            console.log('new message id: ', newDoc.id)
        } catch (error) {
            Alert.alert('Message', error.message)
        }
    // const message = messageRef.current.trim();
    // if (message) {
    //   const newMessage = {
    //     id: messages.length + 1,
    //     text: message,
    //     time: new Date().toLocaleTimeString(),
    //   };
    //   setMessages([...messages, newMessage]);
    //   messageRef.current = '';
    //   textInputRef.current.clear(); // Clears the TextInput
    // }
  };

  return (
    <SafeAreaView className="flex-1">
      <View>
        <ChatHeader user={item} />
      </View>
      <View className='flex-1 justify-between overflow-visible'>
        <MessagesList messages={messages} />
      </View>
      <KeyboardAvoidingView behavior="padding" className="bg-primary" >
        <View className="flex-row items-center pr-2 pb-2 bg-emerald-950 text-zinc-400">
          <TextInput
          // ref={textInputRef}
          // onChangeText={(text) => (messageRef.current = text)}
            ref={inputRef}
            onChangeText={(text) => (textRef.current = text)}
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
