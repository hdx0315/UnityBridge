import { View, Text, Image } from 'react-native';
import React from 'react';
import { icons } from '../constants';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { router } from 'expo-router';

const HomeHeader = () => {
  return (
    <View className="flex-row bg-bprimary justify-between items-center border-b-2 border-green-500 min-h-[40px]">
      <View>
        <Text className="pl-4 pt-4 pb-4 text-xl font-pbold text-white">Chats</Text>
      </View>
      <View>
        <Menu>
          <MenuTrigger>
            <Image 
                source={icons.menu} 
                className="w-6 h-6 ml-auto mr-1" 
                resizeMode="contain" 
            />
          </MenuTrigger>

          <MenuOptions>
            <MenuOption 
                onSelect={() => router.push('settings/profile')} 
                className="bg-green-700"
            >
                <Text className="text-white text-lg">
                    Profile
                </Text>
            </MenuOption>

            <MenuOption 
                onSelect={() => router.push('settings/settings')} 
                className="bg-green-700"
            >
                <Text className="text-white text-lg">
                    Settings
                </Text>
            </MenuOption>

            <MenuOption 
                onSelect={() => router.push('settings/search')} 
                className="bg-green-700"
            >
                <Text className="text-white text-lg">
                    Search
                </Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
}

export default HomeHeader;
