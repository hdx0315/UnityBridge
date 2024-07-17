


import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entry from '../../components/Entry';
import HomeHeader from '../../components/HomeHeader';
import { images } from '../../constants';
import { useRouter } from 'expo-router';
import { useUserStore } from '../../stores/userStore';

const Chats = () => {
  const router = useRouter();

  const setUser = useUserStore(state => state.setNameAndProfilePic);
  
  const handleChatPress = (profilePicParam, nameParam) => {
    
      setUser(nameParam, profilePicParam);
      router.push('pages/InboxChat')
  };

  return (
    <SafeAreaView className="flex-1">
      <View>
        <HomeHeader 
          title="Chats" 
        />
      </View>
      
      <ScrollView className="flex-1 bg-bprimary">

        {/* //render chats from DB and map them for ENTRT s.  */}
        <Entry 
          profilePic={images.profile}
          name="Chat 01"
          msgPrev="message preview 01"
          timestamp="04.16"
          onPress={() => handleChatPress(images.profile, 'Chat 01')}
        />
        <Entry 
          profilePic={images.profile}
          name="Chat 02"
          msgPrev="message preview 02"
          timestamp="05.20"
          onPress={() => handleChatPress(images.profile, 'Chat 02')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chats;

