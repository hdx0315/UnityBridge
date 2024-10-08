import { View, Text, StatusBar , ScrollView, Image} from 'react-native'
import React from 'react'
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../constants' 
import CustomButton from '../components/CustomButton'
import { useAuthContext } from '../contexts/AuthContext'

const App = () => {

  return (
    <SafeAreaView className="bg-bprimary h-full font-psemibold">
      
      <ScrollView contentContainerStyle={{height:'100%'}}>

        <View className="w-full justify-center items-center min-h-[85vh] px-4">

          <Image
            source={images.logo}
            className="w-[150px] h-[150px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-t_primary font-bold text-center">
              Welcome to {''}
              <Text className="text-t_primary-800">UnityBridge </Text>
            </Text>
          </View>

          <Text className="py-2 text-m font-pregular text-t_primary-900 text-center">
            The Bridge of Unity
          </Text>

          <CustomButton
            title="Continue with email"

            handlePress={()=>router.push('sign-in')}
        
/*{
    easy path to access currently editing screen
          handlePress={()=>router.push('settings/search')}
 }*/

            containerStyles="w-full mt-7"
          />

        </View>

      </ScrollView>

      <StatusBar
        backgroundColor="#B37E62"
        style='light'
      />
    </SafeAreaView>
  )
}

export default App