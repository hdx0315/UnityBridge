import { View, Text } from 'react-native'
import React from 'react'
import { Tabs} from 'expo-router'
import {StatusBar} from 'expo-status-bar'
import { MenuProvider } from 'react-native-popup-menu';

import { Ionicons } from '@expo/vector-icons';

const TabIcon = ({color, tname, focused, name, size}) => {
  return(
    <View className="items-center justify-center gap-2 py-4">
      <Ionicons name={name} size={24} 
        color={color}
        resizeMode='contain'
        tintColor={color}
        className='w-6 h-6'/>
      <Text 
        className={`${focused? 'font-psemibold': 'font-pregular'} text-xs`} 
        style={{color:color}}
      >
        {tname}
      </Text>
    </View>
  )
  
}

const TabsLayout = () => {
  return (
    <>
    <MenuProvider>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#00FF1E',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle:{
            backgroundColor: '#052e16',
            borderTopWidth: 1,
            borderTopColor: "#052e16",
            height: 80
          }
        }}
      >
        <Tabs.Screen
          name='chats'
          options={{
            title: 'Chats',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                tname="Chats"
                focused={focused}
                name="chatbubble-ellipses-sharp"
                size={24} 

              />


            ),
          }}
        />
        <Tabs.Screen
          name='calls'
          options={{
            title: 'Calls',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                tname="Calls"
                focused={focused}
                name="call-sharp"
                size={24} 
              />
            ),
          }}
        />
      </Tabs>


      
      <StatusBar
          backgroundColor="#052e16"
          style='light'
        />
        </MenuProvider>
    </>
  )
}

export default TabsLayout