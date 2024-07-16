import { View, Text , Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import { useState } from 'react';
//import { ScrollView } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native';
import { router } from 'expo-router';

const profileSettings = (profilePic, name, email, phoneNo) => {

/*{
  const [form, setForm] = useState({
    profilePic: profilePic,
    name: name,
    email: email,
    phone: phoneNo,
    password:{}
  })
 }*/
  const [form, setForm] = useState({
   // profilePic: "Your Username",
    name: "Your username",
    email: "email@example.com",
    phone: "123",
    password:null
  })

  return (
      <SafeAreaView className="bg-bprimary">
        <ScrollView className="bg-bprimary min-h-full flex-col ">
          <View className="w-full items-center justify-center mt-16">
            <Image
              source={images.profile}
              className="w-40 h-40 rounded-full"
            />
          </View>
  
          <View className="pl-4 pr-4">
            <Text className="text-white font-bold text-lg pt-8">
              Username
            </Text>

            <FormField
              title={null}
              value={form.name}
              placeholder="Enter your new username"
              handleChangeText={(e) => setForm({ ...form, name: e })}
              otherStyles="mt-0"
            />

            <Text className="text-white font-bold text-lg pt-8">
              E-mail
            </Text>

            <FormField
              title={null}
              value={form.email}
              placeholder="Enter your new email"
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-0"
            />

            <Text className="text-white font-bold text-lg pt-8">
              {/* {name} */}
              Phone Number
            </Text>

            <FormField
              title={null}
              value={form.phoneNo}
              placeholder="Enter your new phone number"
              handleChangeText={(e) => setForm({ ...form, phoneNo: e })}
              otherStyles="mt-0"
            />

            <Text className="text-white font-bold text-lg pt-8">
              {/* {name} */}
              Password
            </Text>

            <FormField
              title={null}
              value={form.password}
              placeholder="Enter your new Password"
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-0 text-red-400"
            />


          </View>
  
          <View className="pt-4 flex-row justify-center pb-12">
            <CustomButton
              title="Save Changes"
              containerStyles="max-w-[300px]"
              textStyles="pl-6 pr-6"
              handlePress={()=>router.push('settings/profile')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
}

export default profileSettings