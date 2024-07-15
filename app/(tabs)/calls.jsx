import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entry from '../../components/Entry';
import HomeHeader from '../../components/HomeHeader';
import { MenuProvider } from 'react-native-popup-menu';

const Calls = () => {
  return (
    <SafeAreaView className="flex-1">
      {/* <MenuProvider> */}
        <View>
          <HomeHeader />
        </View>
        <ScrollView className="min-h-full bg-bprimary">
          <Entry
            profilePic="path"
            name="Call Name 01"
            clType="outgoing" //missed , outgoing , incoming
            timestamp="12.15"
          />
          <Entry
            profilePic="path"
            name="Call name 02"
            clType="incoming"
            timestamp="8.07"
          />
        </ScrollView>
      {/* </MenuProvider> */}
    </SafeAreaView>
  );
}

export default Calls
