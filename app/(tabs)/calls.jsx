


import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entry from '../../components/Entry';
import HomeHeader from '../../components/HomeHeader';
import { images } from '../../constants';
import { router, useRouter } from 'expo-router';
import { create } from 'zustand'
import { useUserCallStore } from '../../stores/userStore';


const Calls = () => {
  const router = useRouter();

  const setUserCall = useUserCallStore(state => state.setNameProfilePicAndCalltype);
  
  const handleCallPress = (profilePicParam, nameParam, clTypeParam) => {
    
    setUserCall(nameParam, profilePicParam, clTypeParam);
      router.push('pages/CallDetails')
  };

  return (
    <SafeAreaView className="flex-1">
      {/* <MenuProvider> */}
        <View>
          <HomeHeader 
            title="Calls"
          />
        </View>

        <ScrollView className="min-h-full bg-bprimary">
          <Entry
            profilePic={images.empty}
            name="Call Name 01"
            clType="outgoing" //missed , outgoing , incoming
            timestamp="12.15"
            onPress={() => handleCallPress(images.empty, 'Call Name 01',"Cl type")}
          />
          <Entry
            profilePic={images.empty}
            name="Call name 02"
            clType="incoming"
            timestamp="8.07"
            onPress={() => handleCallPress(images.profile, 'Call Name 02', "Cl type")}
          />
        </ScrollView>
      {/* </MenuProvider> */}
    </SafeAreaView>
  );
}

export default Calls
