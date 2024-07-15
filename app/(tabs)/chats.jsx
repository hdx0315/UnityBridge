import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Entry from '../../components/Entry'
import Header from '../../components/Header'

const chats = () => {
  return (
    <SafeAreaView>
      <View>
        <Header title="Chats"className="z-10"/>
        <ScrollView className="min-h-full bg-bprimary -z-20">
          <Entry 
            profilePic="logo"
            name="Chat 01"
            msgPrev="message preview 01"
            timestamp="04.16"
          />
          <Entry 
            profilePic="logo"
            name="Chat 02"
            msgPrev="message preview 02"
            timestamp="05.20"
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default chats
