import React, { useState } from 'react';
import { View, ActivityIndicator, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '../../components/HomeHeader';
import { useAuthContext } from '../../contexts/AuthContext';
import NewChatList from '../../components/newChatList';
import { useChatStore } from '../../stores/userStore'; // Import Zustand store
import SearchBar from '../../components/SearchBar';

const NewChats = () => {
  const { user } = useAuthContext();
  const { users } = useChatStore(); // Get users from Zustand store

  const [searchQuery, setSearchQuery] = useState('');

  // Filter users based on search query
  const filteredUsers = users.filter((user) => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-bprimary">
      
      {/* Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* User List */}
      <ScrollView className="flex-1 bg-bprimary">
        {filteredUsers && filteredUsers.length > 0 ? (
          <NewChatList users={filteredUsers} currentUser={user} />
        ) : (
          <View className="flex-1 items-center justify-center mt-32">
            {users.length === 0 ? (
              <>
                <ActivityIndicator size="large" color="#773825" />
                <Text className="text-lg text-gray-600">No users available</Text>
              </>
            ) : (
              <Text className="text-lg text-gray-600">No contacts match your search</Text>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewChats;
