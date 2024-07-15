// HeaderMenu.jsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert,Text, Image } from 'react-native';
import { Button, Provider } from 'react-native-paper';
import { icons } from '../constants';
import {  Menu,  MenuOptions,  MenuOption,  MenuTrigger,} from 'react-native-popup-menu';
import { Link, router } from 'expo-router'

const HeaderMenu = () => {
  const [visible, setVisible] = useState(false);
  const closeMenu = () => setVisible(false);
  const openMenu = () => setVisible(true);

  return (
    <Provider>
      <View className="flex-row justify-center px-5 py-5">
        <Menu className="z-50">
            <MenuTrigger>
                <Image source={icons.menu} className="w-6 h-6 ml-auto mr-1" resizeMode="contain" />
            </MenuTrigger> 

            
            <MenuOptions >
                <MenuOption 
                    onSelect={() => router.replace('settings/profile')} 
                     
                    className="bg-green-700 text-white text-lg z-50">

                        <Text className=" text-white text-lg">fsbfbsfbhsfhb</Text>
                </MenuOption>

                <MenuOption 
                    onSelect={() => router.replace('settings/profile')} 
                     
                    className="bg-green-700 text-white text-lg z-50">

                        <Text className=" text-white text-lg">fsbfbsfbhsfhb</Text>
                </MenuOption>
                <MenuOption 
                    onSelect={() => router.replace('settings/profile')} 
                     
                    className="bg-green-700 text-white text-lg z-50">

                        <Text className=" text-white text-lg">fsbfbsfbhsfhb</Text>
                </MenuOption>

            </MenuOptions>
        </Menu>
      </View>
    </Provider>
  );
};

export default HeaderMenu;
