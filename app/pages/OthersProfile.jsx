

import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import proPics from '../../constants/proPic'; 
import { useLocalSearchParams } from 'expo-router';
// Import proPics

const OthersProfile = () => {
    const navigation = useNavigation();
    const route = useRoute();
    
  const { params } = useLocalSearchParams();
  const user = useLocalSearchParams()

  const profilePic = user?.profilePic
  const username = user?.username
  const email = user?.email



    return (
        <SafeAreaView>
            <View className="bg-bprimary min-h-full flex-col">
                <TouchableOpacity 
                    onPress={() => navigation.goBack()} 
                    className="ml-8 my-8"
                >
                    <AntDesign 
                        name="arrowleft" 
                        size={24} 
                        color="#773825" 
                        className="px-4" 
                    />
                </TouchableOpacity>

                <View className="w-full items-center justify-center mt-2">
                    <Image
                        source={profilePic}
                        className="w-60 h-60 rounded-full"
                    />

                    <Text className="text-t_primary-900 text-3xl pt-12 font-pbold">
                        {username || 'Contact Username'}
                    </Text>
                </View>

                <View className="pl-8 text-black">
                    <Text className="font-bold text-lg pt-8">
                        Email
                    </Text>
                    <Text className="text-lg pt-2 pl-4">
                        {email || 'email@example.com'}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default OthersProfile;