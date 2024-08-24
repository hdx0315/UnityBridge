import { View, Text, Image, SafeAreaView } from 'react-native';
import React from 'react';
import { icons } from '../constants';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthContext } from '../contexts/AuthContext';
import VirtualAssistance from '../app/pages/VirtualAssistance';

const HomeHeader = ({title}) => {
  const { logout } = useAuthContext()
  
  const handleLogout = async () => {
    await logout()
  }

  return (
    <View className="flex-row bg-bprimary justify-between items-center border-b-2 border-green-500 min-h-[40px]">
      
      <View>
        <Text className="pl-4 pt-4 pb-4 text-xl font-pbold text-white">
          Unity {title}
        </Text>
      </View>

      <View className="flex-row justify-center">
        <VirtualAssistance></VirtualAssistance>
      </View>

      <View className="mr-4">
        <Menu>
          <MenuTrigger>
          <Ionicons 
                name="menu" 
                size={30} 
                color="#CDCDE0" 
                className="w-6 h-6 ml-auto pr-10" 
                resizeMode="contain" />
          </MenuTrigger>

          <MenuOptions customStyles={{
            optionsContainer:{
              borderRadius:10,
              borderCurve: 'continuous',
              marginTop:10,
              marginLeft:-20,
              backgroundColor: '#15803d',
              shadowOpacity: 0.3,
              
            },

            optionText:{
              fontSize:10,
              fontWeight:'bold',
            },

            optionWrapper:{
              borderRadius:10,
              borderBottomWidth:2,
              borderColor: '#22c55e',
              padding:10
            }
          }}>

            <MenuOption 
                onSelect={() => router.push('pages/profile')} 
                
            >
                <Text className="text-white text-lg">
                    Profile
                </Text>
            </MenuOption>

            <MenuOption 
                onSelect={() => router.push('settings/appSettings')} 
            >
                <Text className="text-white bg-green-700 text-lg">
                    Settings
                </Text>
            </MenuOption>

            <MenuOption 
                onSelect={handleLogout} 
            >
                <Text className="text-white text-lg">
                    Sign Out
                </Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
}

export default HomeHeader;
