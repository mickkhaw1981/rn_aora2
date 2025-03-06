import { Text, View, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import React from 'react'
import FormField from "@/components/FormField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
  const { login } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    //issue an alert if the form is not filled in
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await login(form.email, form.password);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View className="w-full px-4">
          <Image 
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="text-white text-2xl font-psemibold mt-10">Log in</Text>
          
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="E.g. mike.khaw@gmail.com"
            autoCapitalize="none"
            />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyboardType="default"
            secureTextEntry={true}
            placeholder="Enter your password"
            />
            
          <View className="w-full flex items-end mt-2">
            <Link href="/forgot-password" className="text-sm font-psemibold text-gray-100">
              Forgot password?
            </Link>
          </View>

          <CustomButton
            title="Sign in"
            containerStyles="mt-7"
            handlePress={ submit }
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
          
        </View>
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

