import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect} from 'expo-router'
import { icons} from '../../constants';
import {StatusBar} from 'expo-status-bar'

const TabIcon = ({icon, color, name, focused}) => {
  return(
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className='w-6 h-6'
      />
      <Text className={`${focused? 'font-psemibold': 'font-pregular'} text-xs`} style={{color:color}}>
        {name}
      </Text>
    </View>
  )
  
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#00FF1E',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle:{
            backgroundColor: '#052e16',
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 60
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
                icon={icons.home}
                color={color}
                name="Chats"
                focused={focused}
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
                icon={icons.bookmark}
                color={color}
                name="Calls"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      
      <StatusBar
          backgroundColor="#052e16"
          style='light'
        />
    </>
  )
}

export default TabsLayout