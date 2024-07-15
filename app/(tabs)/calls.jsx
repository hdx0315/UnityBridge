import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Entry from '../../components/chatEntry'
import Header from '../../components/Header'
import { ScrollView } from 'react-native'

const calls = () => {
  return (
    <>
      <SafeAreaView>

          <View>

          <Header
            title="Calls"
          />

          {/*
          -------Call Entries
          load all calls from db and map them
          */}
          <ScrollView className="min-h-full bg-bprimary">
            <Entry
              profilePic="path"
              name="Call Name 01"
              clType="outgoing" //missed , outgoing , incoming
              timestamp="12.15"
            />
            <Entry
              profilePic="path"
              name="Call name 02"
              clType="incoming"
              timestamp="8.07"
            />
          </ScrollView>

        </View>
      </SafeAreaView>
    </>
  )
}

export default calls