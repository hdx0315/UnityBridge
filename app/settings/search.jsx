import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import FormField from '../../components/FormField';


const Search = () => {
  return (
    <SafeAreaView>

      <ScrollView className="bg-bprimary min-h-full flex-col">

      <View className="pt-6 pl-2">

        <Text className="text-white text-xl">  
          Search in your chats
        </Text>


      <View className="px-6">

        <FormField>
          <FontAwesome name="search" size={24} color="white" />
        </FormField>
      </View>

      </View>
        


      </ScrollView>
    </SafeAreaView>
  )
}

export default Search