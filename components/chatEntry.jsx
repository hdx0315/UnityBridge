import { View, Text , Image} from 'react-native'
import React from 'react'
import { images } from '../constants'

const ChatEntry = () => {
  return (
    <View className="pt-2 pb-2 flex-row items-center border-b-2 border-green-300">
      <Image
        source={images.logo}
        resizeMode='contain'
        className="w-[50] h-[50] ml-2"
      />
      <Text className="ml-2 text-lg font-psemibold">
        Chat Name
      </Text>
    </View>
  )
}

export default ChatEntry