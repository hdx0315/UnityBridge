

import React from 'react'
import { Stack } from 'expo-router'
import {StatusBar} from 'expo-status-bar'

const SettingsLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name='InboxChat'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='profile'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='OthersProfile'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
            name='search'
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
              name='camera'
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
                name='newChats'
                options={{
                  headerShown: false,
                }}
              />
      </Stack>


      <StatusBar
        backgroundColor="#B37E62"
        style='light'
      />
    </>
  )
}

export default SettingsLayout