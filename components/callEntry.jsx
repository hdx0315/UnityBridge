import { View, Text ,Image} from 'react-native'
import React from 'react'
import { images } from '../constants'

const CallEntry = ({ profilePic, name, clType, timestamp }) => {
  return (
    <View className="pt-2 pb-2 flex-row items-center border-b-2 border-green-800 bg-bprimary-100">
      <Image
        source={images.path}
        resizeMode="contain"
        className="w-[50px] h-[50px] ml-2"
      />

      <View className="flex-1 flex-col ml-2">
        <Text className="text-lg text-white font-psemibold">
          {name}
        </Text>
        <Text className="text-sm text-gray-400 ml-2">
          {clType}
        </Text>
      </View>

      <View className="ml-auto pr-2">
        <Text className="text-sm text-gray-400">
          {timestamp}
        </Text>
      </View>
    </View>
  )
}

export default CallEntry