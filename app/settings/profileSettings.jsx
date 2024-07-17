import { View, ScrollView , Image} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
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

          <View className="p-4">
            <FormField
              title={"Username"}
              value={form.name}
              placeholder="Enter your new username"
              handleChangeText={(e) => setForm({ ...form, name: e })}
              otherStyles="mt-0"
            />


            <FormField
              title={"E-mail"}
              value={form.email}
              placeholder="Enter your new email"
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-0"
            />

            <FormField
              title="Phone Number"
              value={form.phoneNo}
              placeholder="Enter your new phone number"
              handleChangeText={(e) => setForm({ ...form, phoneNo: e })}
              otherStyles="mt-0"
            />


            <FormField
              title="Password"
              value={form.password}
              placeholder="Enter your new Password"
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-0 text-red-400 mb-4"
            />


          </View>
  
          <View className="pt-4 flex-row justify-center pb-12">
            <CustomButton
              title="Save Changes"
              containerStyles="max-w-[300px]"
              textStyles="pl-6 pr-6"
              handlePress={()=>router.push('pages/profile')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
}

export default profileSettings