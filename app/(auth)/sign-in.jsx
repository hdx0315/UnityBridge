import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { useAuthContext } from '../../contexts/AuthContext'

const SignIn = () => {
  const { login } = useAuthContext()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    const { email, password } = form
    let isValid = true
    let newErrors = {
      email: '',
      password: ''
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
      const response = await login(email, password)
      setIsSubmitting(false)
      if (!response.success) {
        Alert.alert('Sign In', response.msg)
      }
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[100px] h-[100px]"
          />

          <Text className="text-2xl text-white text-semibold mt-10 mb-8 font-psemibold">
            Log In to UnityBridge
          </Text>

          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter your email"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles=""
            keyboardType="email"
          />
          {errors.email ? <Text className="text-green-500 mt-0 mb-6">{errors.email}</Text> : null}

          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles=""
            className=""
          />
          {errors.password ? <Text className="text-green-500 mt-0 mb-6">{errors.password}</Text> : null}

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="w-full text-2xl"
            textStyles="text-black font-psemibold text-xl"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-white font-pregular">
              Don't have an account?
            </Text>
            <Link href='/sign-up' className="text-lg text-secondary font-psemibold">Sign Up</Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
