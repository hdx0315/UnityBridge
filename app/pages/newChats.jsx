import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthContext } from '../../contexts/AuthContext';
import ChatList from '../../components/ChatList';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '../../lib/firebase';

import { router } from 'expo-router';

const Chats = () => {
  const { user } = useAuthContext()

  const [users, setUsers] = useState([])

  useEffect(() => {
    if (user?.uid) {
      getUsers()
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


  // console.log('User Data', user);

  return (
    <SafeAreaView className="flex-1 bg-bprimary">

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
        

    </SafeAreaView>
  );
};

export default Chats;

