import { View, Text , Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OthersProfile = ({profilePic, name, email}) => {

    
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View className="bg-bprimary min-h-full flex-col">

        <TouchableOpacity onPress={() => navigation.goBack()} className="ml-8 my-8">
              <AntDesign name="arrowleft" size={24} color="white" className="px-4" />
        </TouchableOpacity>

        <View className="w-full items-center justify-center mt-2">
          <Image
            source={images.profile}
            className="w-60 h-60 rounded-full"
          />
          <Text className="text-secondary text-3xl pt-12 font-pbold">
            {/* {name} */}
            Contact Username
          </Text>
        </View>

        <View className="pl-8">
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

      </View>
    </SafeAreaView>
  )
}

export default OthersProfile