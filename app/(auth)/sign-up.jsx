import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { useAuthContext } from '../../contexts/AuthContext'

const SignUp = () => {
  const { register } = useAuthContext()

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    const { username, email, password } = form
    let isValid = true
    let newErrors = {
      username: '',
      email: '',
      password: ''
    }

    if (!username) {
      newErrors.username = 'Username is required'
      isValid = false
    }

    if (!email) {
      newErrors.email = 'Email is required'
      isValid = false
    }

    if (!password) {
      newErrors.password = 'Password is required'
      isValid = false
    }

    setErrors(newErrors)

    if (isValid) {
      setIsSubmitting(true)
      const response = await register(email, password, username)
      setIsSubmitting(false)
      if (!response.success) {
        Alert.alert('Sign Up', response.msg)
      }
    }
  }

  return (
    <SafeAreaView className="bg-bprimary text-t_primary h-full">

      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-2">
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[100px] h-[100px]"
          />

          <Text className="text-2xl text-semibold mt-2 font-psemibold mb-8">
            Sign Up to UnityBridge
          </Text>
          <FormField
            title="Username"
            value={form.username}
            placeholder="Enter your Username"
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles=""
          />
          {errors.username ? <Text className="mt-0 mb-6">{errors.username}</Text> : null}

          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter your email"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles=""
            keyboardType="email-address"
          />
          {errors.email ? <Text className=" mt-0 mb-6">{errors.email}</Text> : null}

          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles=""
          />
          {errors.password ? <Text className=" mt-0 mb-6">{errors.password}</Text> : null}

          <CustomButton
            title="Register"
            handlePress={submit}
            containerStyles="w-full"
            textStyles="text-black font-psemibold text-xl"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg font-pregular">
              Already have an account?
            </Text>
            <Link href='/sign-in' className="text-lg text-t_primary-700 font-psemibold">Sign In</Link>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
