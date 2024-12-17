import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, ScrollView, TouchableOpacity , Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '../../components/HomeHeader';
import { useAuthContext } from '../../contexts/AuthContext';
import ChatList from '../../components/ChatList';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef, roomRef } from '../../lib/firebase';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useChatStore } from '../../stores/userStore'; // Import Zustand store

const Chats = () => {
  const { user } = useAuthContext();
  const username = user?.username;
  const [loading, setLoading] = useState(true);

  // Zustand store for users and chats
  const { users, setUsers, chats, setChats } = useChatStore();

  useEffect(() => {
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch users
      const q = query(usersRef, where('userId', '!=', user?.uid));
      const querySnapshot = await getDocs(q);
      const fetchedUsers = querySnapshot.docs.map((doc) => doc.data());
      console.log('Fetched Users:', fetchedUsers);
      setUsers(fetchedUsers); // Store users in Zustand

      // Fetch chats
      const qr = query(roomRef, where('user', '!=', user?.uid));
      const chatSnapshot = await getDocs(qr);
      const chatRooms = chatSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setChats(chatRooms); // Store chats in Zustand

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    router.push('pages/newChats');
  };

  return (
    <SafeAreaView className="flex-1 bg-bprimary">
      <View>
        <HomeHeader title="Chats" user={user}/>
      </View>
      <ScrollView className="flex-1 bg-bprimary">
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large"/>
          </View>
        ) : (
          <ChatList users={users} currentUser={user} />
        )}
      </ScrollView>
    
      <TouchableOpacity className="absolute bottom-4 right-4 " onPress={handleNewChat}>
        <View className="flex flex-col justify-center items-center">
          <MaterialCommunityIcons name="chat-plus-outline" size={60} color="#773825" />
          <Text className="text-secondary-900">
            Start a new chat
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Chats;
