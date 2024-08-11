import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useUserStore } from '../stores/userStore';
import { router } from 'expo-router';
import { images } from '../constants';

const ChatHeader = ({user}) => {
  const navigation = useNavigation();

  const name = useUserStore(state => state.name);
  const profilepic = useUserStore(state => state.profilePic);

  

  const navigateToProfile = () => {
    router.push('pages/OthersProfile'); 
  };

  return (
    <View className="flex-row bg-bprimary justify-between items-center border-b-2 border-green-500 min-h-[40px] p-4 w-full">
      <View className="flex-row items-center">
        <View className="pr-4">
          <TouchableOpacity
           onPress={() => navigation.goBack()}
           className="mr-0"
          >
            <AntDesign
             name="arrowleft" 
             size={24} color="white" 
             className="px-4" 
            />
          </TouchableOpacity>
        </View>
        
        
            <TouchableOpacity
             onPress={navigateToProfile}
            >
              <Image
                source={images.profile}
                className="w-10 h-10 rounded-full px-4"
              />
            </TouchableOpacity>

            <TouchableOpacity
             onPress={navigateToProfile}
            >
              <Text className="text-white text-xl ml-4">
                {user?.username}
              </Text>
            </TouchableOpacity>
            
      </View>

      <View className="flex-row pr-2">
        <TouchableOpacity
         className="mr-8"
        >
          <MaterialIcons
           name="videocam" 
           size={24} 
           color="white" 
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialIcons
           name="call" 
           size={24} 
           color="white" 
          />
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

export default ChatHeader;
