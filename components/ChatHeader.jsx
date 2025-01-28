
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useUserStore } from '../stores/userStore';
import { router } from 'expo-router';
import { images } from '../constants';

const ChatHeader = ({ user, profilePic }) => {
  const navigation = useNavigation();

  
  const navigateToProfile = () => {
    router.push({
      pathname: 'pages/OthersProfile',
      params: {
        profilePic: profilePic,
        ...user
        
      }
    });
    console.log("in chat header nav to prof: ", profilePic, user)
  };

  return (
      <View className="flex-row bg-bprimary text-t_primary justify-between items-center border-b-2 border-secondary min-h-[40px] p-4 w-full">
          <View className="flex-row items-center">
              <View className="pr-4">
                  <TouchableOpacity onPress={() => navigation.goBack()} className="mr-0">
                      <AntDesign name="arrowleft" size={24} color="#773825" className="px-4" />
                  </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={navigateToProfile}>
                  <Image
                      source={profilePic} // Use the passed profilePic
                      className="w-10 h-10 rounded-full px-4"
                  />
              </TouchableOpacity>
              <TouchableOpacity onPress={navigateToProfile}>
                  <Text className="text-t_primary-900 text-xl font-psemibold ml-4">
                      {user?.username}
                  </Text>
              </TouchableOpacity>
          </View>
          <View className="flex-row pr-2">
              <TouchableOpacity className="mr-8">
                  <MaterialIcons name="videocam" size={24} color="#773825" />
              </TouchableOpacity>
              <TouchableOpacity>
                  <MaterialIcons name="call" size={24} color="#773825" />
              </TouchableOpacity>
          </View>
      </View>
  );
};

export default ChatHeader; 
