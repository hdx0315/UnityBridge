// Header.jsx
import React from 'react';
import { View, Text, Image } from 'react-native';
import { icons } from '../constants';
import HeaderMenu from './HeaderMenu'; // Ensure this is a default importexpo r -c
import { MenuProvider } from 'react-native-popup-menu';


const Header = ({ title }) => {
  return (
    <View className="flex-row bg-bprimary justify-center items-center border-b-2 border-green-800">
      <Text className="pl-4 pt-4 pb-4 text-xl font-pbold text-white">
        Unity <Text>{title}</Text>
      </Text>
      <MenuProvider className="ml-auto mr-2">
        <HeaderMenu />
      </MenuProvider>
    </View>
  );
};

export default Header;
