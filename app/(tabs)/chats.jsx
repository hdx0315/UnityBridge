import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ChatEntry from '../../components/chatEntry'
import { icons } from '../../constants'
//import 

const chats = () => {
  return (
    <>
      <SafeAreaView>

        <View>

          <View className="flex-row  bg-primary justify-center items-center">

            <Text className=" pl-4 pt-4 pb-4 text-xl font-pbold text-white">
              Unity Chats
            </Text>
            
            <Image
              source={icons.menu}
              className="w-6 h-6 ml-auto mr-2"
              resizeMode="contain"
            />
            
          </View>
          {/*
          -------Chat Entries
          load all chatheads from db and map them
          */}
          <ChatEntry 
            profilePic=""
            name=""
            msgPrev="" //msg preview
            timestamp=""
          />
          <ChatEntry 
            profilePic=""
            name=""
            msgPrev=""
            timestamp=""
          />

        </View>
      </SafeAreaView>

  </>
  )
}

export default chats