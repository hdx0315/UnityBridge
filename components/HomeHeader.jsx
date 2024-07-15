import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '../constants';
import {  Menu,  MenuOptions,  MenuOption,  MenuTrigger,} from 'react-native-popup-menu';


const HomeHeader = () => {
  return (
    <View className="flex-row bg-bprimary justify-between items-center border-b-2 border-red-500 min-h-[40px] ">

        <View>
            <Text className="pl-4 pt-4 pb-4 text-xl font-pbold text-white">
                Chats
            </Text>
        </View>

        <View>
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
        
        </View>
  )
}

export default HomeHeader