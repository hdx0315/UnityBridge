
import { View, Text, ScrollView, TextInput, Button,ImageBackground , KeyboardAvoidingView, TouchableOpacity, Keyboard, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatHeader from '../../components/ChatHeader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, router } from 'expo-router';
import MessagesList from '../../components/MessagesList';
import { useAuthContext } from '../../contexts/AuthContext'
import { db } from '../../lib/firebase';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { getRoomId } from '../../utils/common';
import Feather from '@expo/vector-icons/Feather';
import * as Speech from 'expo-speech';

import { useCameraMsgStore } from '../../stores/cameraMsgStore';

const InboxChat = () => {
  const item = useLocalSearchParams()
  const { user } = useAuthContext()
  const cameraMsg = useCameraMsgStore(state => state.message);

  const [messages, setMessages] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [spokenMessages, setSpokenMessages] = useState([]);

  const textRef = useRef('')
  const inputRef = useRef(null)
  const scrollViewRef = useRef(null)

  // Text-to-Speech Functions
  const speakMessages = async () => {
    // Stop if already speaking
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      return;
    }
  
    // Get the last 3 messages from the partner
    const partnerMessages = messages
      .filter(msg => msg.userId !== user?.userId)
      .slice(-3); // Take last 3 messages
  
    // If no messages from partner, return
    if (partnerMessages.length === 0) return;
  
    try {
      setIsSpeaking(true);
  
      // Get partner's name (use the name from the first message)
      const partnerName = partnerMessages[0].username;
  
      // Combine messages into a single string
      const messagesToSpeak = partnerMessages
        .map(msg => msg.text)
        .join('.. ');
  
      const fullSpeechText = `${partnerName}'s last 3 messages: ${messagesToSpeak}`;
  
      const options = {
        language: 'en',
        pitch: 1.0,
        rate: 0.9,
        onDone: () => setIsSpeaking(false),
        onError: (error) => {
          console.log(error);
          setIsSpeaking(false);
        },
      };
  
      Speech.speak(fullSpeechText, options);
    } catch (error) {
      console.error('Speech error:', error);
      setIsSpeaking(false);
    }
  };

  // Cleanup speech on component unmount
  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  // Update spoken messages when messages change
  useEffect(() => {
    // Filter messages from chat partner (not current user)
    const partnerMessages = messages.filter(
      msg => msg.userId !== user?.userId
    );

    setSpokenMessages(partnerMessages);
  }, [messages, user]);

  // Update the TextInput value when the cameraMsg changes
  useEffect(() => {
    if (cameraMsg && inputRef.current) {
      inputRef.current.setNativeProps({ text: cameraMsg });
      textRef.current = cameraMsg;
    }
  }, [cameraMsg]);

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
    const KeyBoardDidShowListener = Keyboard.addListener(
      'keyboardDidShow', updateScrollView
    )

    return () => {
      unsub()
      KeyBoardDidShowListener.remove()
    }
  }, [])

  const createRoomIfNotExists = async () => {
    let roomId = getRoomId(user?.userId, item?.userId)
    await setDoc(doc(db, 'rooms', roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
      user: user?.userId,
      item: item,
    })
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
  };

  const handleCameraOpen = () => {
    console.log('handleCameraOpen');
    router.push('/pages/camera')
  }

  useEffect(() => {
    updateScrollView()
  }, [messages])

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true })
    }, 100)
  }

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground 
        source={require('../../assets/images/background2.jpeg')} // Replace with your image path
        style={{ flex: 1 }}
        resizeMode="cover"
      >
<View>
    <ChatHeader 
        user={item} 
        profilePic={item.profilePic} 
    />
</View>
        

      <View className='flex-1 justify-between overflow-visible'>
        <MessagesList 
          messages={messages} 
          currentUser={user} 
          scrollViewRef={scrollViewRef}
        />
      </View>

      <KeyboardAvoidingView behavior="padding" className="bg-bprimary border-0 border-red-600">

        <View className="flex-row items-center p-2 pb-0 bg-bprimary-500 text-t_primary  border-0 border-red-600">
          <TextInput
            ref={inputRef}
            onChangeText={(text) => (textRef.current = text)}
            placeholder="Type a message..."
            placeholderTextColor="#773825"
            selectionColor="#773825"
            multiline={true}
            className="flex-1 h-10 border border-bprimary-900 rounded-xl m-2 pl-4 e text-lg text-yellow-950"
          />
        </View>

        <View className="flex flex-row justify-around p-2 bg-bprimary-500  border-0 border-red-600 text-t_primary-900" >

<View>
            <TouchableOpacity 
            title="Camera" 
            onPress={handleCameraOpen} 
            className="mr-0 "
          >
          <View className="flex flex-col items-center  border-0 border-red-600">
            <Feather name="camera" size={30} color="#773825" />
            <Text className=" text-t_primary-900 text-xs">Sign Detection</Text>
            </View>
          </TouchableOpacity>

          </View>


          <View>
          <TouchableOpacity 
            onPress={speakMessages} 
            className="mr-0"
          >
          <View className="flex flex-col items-center ">
            <MaterialIcons 
              name={isSpeaking ? "record-voice-over" : "voice-over-off"} 
              size={30} 
              color={isSpeaking ? "#ff0000" : "#773825"} 
            /><Text  className=" text-t_primary-900 text-xs">Speech To Text</Text></View>
          </TouchableOpacity>

          </View>


          <View>
          <TouchableOpacity 
            title="Send" 
            onPress={handleSendMessage} 
            className="mr-0"
          >
          <View className="flex flex-col items-center">
            <FontAwesome name="send" size={30} color="#773825" /><Text className=" text-t_primary-900 text-xs">Send</Text></View>
          </TouchableOpacity>

          </View>


        </View>
      </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default InboxChat;