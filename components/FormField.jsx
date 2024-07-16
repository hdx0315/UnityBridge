import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View className={`space-y-0 ${otherStyles}`}>
            <Text className="text-base text-white font-pmedium">
                {title}
            </Text>

            <View className="border-2 border-secondary w-full h-16 px-4 bg-emerald-950 rounded-2xl focus:border-secondary items-center flex-row">
                <TextInput
                    className="flex-1 text-white font-psemibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                    {...props}
                />
                {title === 'Password' && (
                    <TouchableOpacity onPress={()=> setShowPassword(!showPassword)}>

                        <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode='contain'/>

                    </TouchableOpacity>
                ) 
                
                }
            </View>
        </View>
    )
}

export default FormField
