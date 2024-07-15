import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import {StatusBar} from 'expo-status-bar'

const SettingsLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name='profile'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='appSettings'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='profileSettings'
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar
        backgroundColor="#052e16"
        style='light'
      />
    </>
  )
}

export default SettingsLayout