import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        testID="custom-button"
        className={`bg-bprimary-700 border-2 border-bprimary-700 rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading? 'opacity-50': ''}`}
        disabled={isLoading}    
    >
        

        <Text className={`text-t_primary-300 font-psemibold tracking-widest ${textStyles}`}>
            {title}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButton