

import React from 'react'
import { Stack } from 'expo-router'
import {StatusBar} from 'expo-status-bar'

const SettingsLayout = () => {
  return (
    <>
      <Stack>
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
        backgroundColor="#06b6d4"
        style='light'
      />
    </>
  )
}

export default SettingsLayout