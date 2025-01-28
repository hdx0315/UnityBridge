import { View, Text, Image } from 'react-native';
import React from 'react';
import { icons } from '../constants';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthContext } from '../contexts/AuthContext';

const HomeHeader = ({title, user}) => {
  const { logout } = useAuthContext()
  
  const handleLogout = async () => {
    await logout()
  }

  const handleProfile = () =>{
    router.push({
      pathname:'pages/profile',
      params:{
        ...user
      }
    })
  }

  return (
    <View className="flex-row bg-bprimary text-t_primary-900 justify-between items-center border-b-2 border-secondary min-h-[40px]">
      
      <View>
        <Text className="pl-4 pt-4 pb-4 text-xl font-pbold ">
          Unity {title}
        </Text>
      </View>

      <View className="mr-4">
        <Menu>
          <MenuTrigger>
          <Ionicons 
                name="menu" 
                size={30} 
                color="#773825" 
                className="w-6 h-6 ml-auto pr-10" 
                resizeMode="contain" />
          </MenuTrigger>

          <MenuOptions customStyles={{
            optionsContainer:{
              borderRadius:10,
              borderCurve: 'continuous',
              marginTop:10,
              marginLeft:-20,
              backgroundColor: '#B37E62',
              shadowOpacity: 0.3,
              
            },

            optionText:{
              fontSize:10,
              fontWeight:'bold',
            },

            optionWrapper:{
              borderRadius:10,
              borderBottomWidth:2,
              borderColor: '#B37E62',
              padding:10
            }
          }}>

            <MenuOption 
                onSelect={handleProfile} className=""
                
            >
                <Text className="text-t_primary-400 text-lg">
                    Profile
                </Text>
            </MenuOption>
{/*
            <MenuOption 
                onSelect={() => router.push('settings/appSettings')} 
            >
                <Text className="text-t_primary-400 text-lg">
                    Settings
                </Text>
            </MenuOption>
*/}
            <MenuOption 
                onSelect={handleLogout} 
            >
                <Text className="text-t_primary-400 text-lg">
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
