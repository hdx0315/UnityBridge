import { View, Text , Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';

// get user profile information from database

const profile = ({profilePic, name, email}) => {

  return (
    <SafeAreaView>
      
      <View className="bg-bprimary min-h-full flex-col">
        <View className="w-full items-center justify-center mt-16">
          <Image
            source={images.profile}
            className="w-60 h-60 rounded-full"
          />
          <Text className="text-secondary text-3xl pt-12 font-pbold">
            {/* {name} */}
            Your Username
          </Text>
        </View>

        <View className="pl-4">
          <Text className="text-white font-bold text-lg pt-8">
            email
          </Text>
          <Text className="text-gray-300 text-lg pt-2 pl-4">
            email@example.com
          </Text>
          <Text className="text-white font-bold text-lg pt-8">
            Phone number
          </Text>
          <Text className="text-gray-300 text-lg pt-2 pl-4">
            Phone number
          </Text>
        </View>

        <View className="pt-4 flex-row justify-center">
          <CustomButton
            title="Edit Your Profile"
            containerStyles="max-w-[400px]"
            textStyles="pl-6 pr-6"
            handlePress={()=>router.push('settings/profileSettings')}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default profile