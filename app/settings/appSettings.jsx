import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'


const appSettings = () => {
  return (
    <SafeAreaView >

      <ScrollView  className="bg-bprimary min-h-full flex-col">

      <View className="p-6">
          <Text className="text-white text-xl">
            General Settings
          </Text>
          
          <View className="flex-row justify-evenly mt-4">
            <Text className="text-white">
              Color Theme
            </Text>
            <TouchableOpacity className=" bg-secondary">
              <Text className="text-black m-2">Change Theme</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="p-6">
          <Text className="text-white text-xl">
            Assistant Settings
          </Text>
          
          <View className="flex-row justify-evenly mt-4">
            <Text className="text-white">
              Setting 01
            </Text>
            <TouchableOpacity className=" bg-secondary">
              <Text className="text-black m-2">Change Setting</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-evenly mt-4">
            <Text className="text-white">
              Setting 02
            </Text>
            <TouchableOpacity className=" bg-secondary">
              <Text className="text-black m-2">Change Setting</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

export default appSettings