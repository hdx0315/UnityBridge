import { View, Text , Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import CustomButton from '../../components/CustomButton';
import { router, useLocalSearchParams } from 'expo-router';

// get user profile information from database

const profile = ({profilePic, name, email}) => {


  const user = useLocalSearchParams()
  console.log(user)

  return (
    <SafeAreaView>
      
      <View className="bg-bprimary min-h-full flex-col">
        <View className="w-full items-center justify-center mt-16">
          <Image
            source={images.profile}
            className="w-60 h-60 rounded-full"
          />
          <Text className="text-secondary-800 text-3xl pt-12 font-pbold">
            {user.username}
            
          </Text>
        </View>

        <View className="pl-4 text-t_primary">
          <Text className=" font-bold text-lg pt-8">
            Username
          </Text>
          <Text className="t text-lg pt-2 pl-4">
            {user.username}
          </Text>
          <Text className=" font-bold text-lg pt-8">
            e-mail
          </Text>
          <Text className="t text-lg pt-2 pl-4">
            {user.email}
          </Text>
          <Text className=" font-bold text-lg pt-8">
            User ID
          </Text>
          <Text className="t text-lg pt-2 pl-4">
            {user.userId}
          </Text>
        </View>
{/*
        <View className="pt-4 flex-row justify-center">
          <CustomButton
            title="Edit Your Profile"
            containerStyles="max-w-[400px]"
            textStyles="pl-6 pr-6"
            handlePress={()=>router.push('settings/profileSettings')}
          />
        </View>*/}
      </View>
    </SafeAreaView>
  )
}

export default profile