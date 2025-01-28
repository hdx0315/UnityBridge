import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View className={`space-y-2 ${otherStyles} mb-4`}>
            <Text className="text-base text-black font-pmedium">
                {title}
            </Text>

            <View className="border-2 border-bprimary-600 w-full h-16 px-4 bg-bprimary rounded-2xl focus:border-secondary items-center flex-row mb-4">
                <TextInput
                    className="flex-1 text-t_primary font-psemibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                    {...props}
                />
                {title === 'Password' && (
                    <TouchableOpacity onPress={()=> setShowPassword(!showPassword)} testID = "toggle-password-visibility">

                        <Image 
                            source={!showPassword ? icons.eye : icons.eyeHide} 
                            className="w-6 h-6" 
                            resizeMode='contain'
                        />

                    </TouchableOpacity>
                ) 
                
                }
            </View>
        </View>
    )
}

export default FormField
