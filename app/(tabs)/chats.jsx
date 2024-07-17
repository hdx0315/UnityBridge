import { View, Text, ScrollView, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entry from '../../components/Entry';
import HomeHeader from '../../components/HomeHeader';
import { images } from '../../constants';

const Chats = ({uses}) => {
  return (
    <SafeAreaView className="flex-1">
        <View>
          <HomeHeader 
            title="Chats"
          />
        </View>

        <ScrollView className="flex-1 bg-bprimary">
          <Entry 
            profilePic={images.profile}
            name="Chat 01"
            msgPrev="message preview 01"
            timestamp="04.16"
          />
          <Entry 
            profilePic={images.profile}
            name="Chat 02"
            msgPrev="message preview 02"
            timestamp="05.20"
          />

    {/*
          <FlatList
            data={users}
            keyExtractor={item=> Math.random()}
            renderItem={({item, index}) => {
              <Entry
                profilePic={null}

              />
            }}
          
          />
*/}   

        </ScrollView>
        
    </SafeAreaView>
  );
}

export default Chats;
