import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entry from '../../components/Entry';
import HomeHeader from '../../components/HomeHeader';
import { MenuProvider } from 'react-native-popup-menu';

const Chats = () => {
  return (
    <SafeAreaView className="flex-1">
      {/* <MenuProvider> */}
        <View>
          <HomeHeader />
        </View>
        <ScrollView className="flex-1 bg-bprimary">
          <Entry 
            profilePic="logo"
            name="Chat 01"
            msgPrev="message preview 01"
            timestamp="04.16"
          />
          <Entry 
            profilePic="logo"
            name="Chat 02"
            msgPrev="message preview 02"
            timestamp="05.20"
          />
        </ScrollView>
      {/* </MenuProvider> */}
    </SafeAreaView>
  );
}

export default Chats;
