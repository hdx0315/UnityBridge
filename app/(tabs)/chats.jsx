import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '../../components/HomeHeader';
import { useAuthContext } from '../../contexts/AuthContext';
import ChatList from '../../components/ChatList';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef, roomRef } from '../../lib/firebase';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

const Chats = () => {
  const { user } = useAuthContext()

  const [users, setUsers] = useState([]) 
  const [chats, setChats] = useState([])

  useEffect(() => {
    if (user?.uid) {
      getUsers()
     // getChats()
    }
  }, [])

  const getUsers = async () => {
    const q = query(usersRef, where('userId', '!=', user?.uid))
    const querySnapshot = await getDocs(q)
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({...doc.data()})
    })
    // console.log('got data:', data);
    setUsers(data)
  }

  const getChats = async () => {
    const qr = query(roomRef, where('user', 'in', user?.uid));
    const querySnapshot = await getDocs(qr);
    let chatRooms = [];
    querySnapshot.forEach((doc) => {
      chatRooms.push({ ...doc.data(), id: doc.id });
    });
    // Now you can use chatRooms array
    // console.log('Chat Rooms:', chatRooms);
    setChats(chatRooms);
    console.log('Chatrooms:'+ chats);
  }
  

  const handleNewChat = () => {
    router.push('pages/newChats')
  }


  // console.log('User Data', user);

  return (
    <SafeAreaView className="flex-1 bg-bprimary">
      <View>
        <HomeHeader 
          title="Chats" 
        />
      </View>

        {/* //render chats from DB and map them for ENTRT s.  */}
        
        <ScrollView className='flex-1 bg-bprimary'>
        {users.length > 0 ? (
          <ChatList users={users} currentUser={user}/>
        ):(
          <View className="flex-1 items-center">
            <ActivityIndicator size='large' />
          </View>
        )}

        </ScrollView>
          
          <TouchableOpacity 
            className="absolute bottom-4 right-4"
            onPress={handleNewChat}>
            <MaterialCommunityIcons name="chat-plus-outline" size={60} color="#06b6d4" />
          </TouchableOpacity>
        

    </SafeAreaView>
  );
};

export default Chats;

