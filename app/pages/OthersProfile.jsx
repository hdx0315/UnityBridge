import { View, Text , Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


// get user id prop from Inbox chat
// fetch profile details from db

const OthersProfile = ({profilePic, name, email}) => {

    
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View className="bg-bprimary min-h-full flex-col">

        <TouchableOpacity 
          onPress={() => navigation.goBack()} className="ml-8 my-8"
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
            source={images.profile}
            className="w-60 h-60 rounded-full"
          />

          <Text className="text-t_primary-900 text-3xl pt-12 font-pbold">
            {/* {name} */}
            Contact Username
          </Text>
        </View>

        <View className="pl-8 text-black">
          <Text className="font-bold text-lg pt-8">
            email
          </Text>
          <Text className=" text-lg pt-2 pl-4">
            email@example.com
          </Text>
          <Text className="font-bold text-lg pt-8">
            Phone number
          </Text>
          <Text className="text-lg pt-2 pl-4">
            Phone number
          </Text>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default OthersProfile