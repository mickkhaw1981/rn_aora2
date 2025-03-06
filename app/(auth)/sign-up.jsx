import { Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import React, { useEffect } from 'react'
import FormField from "@/components/FormField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, Redirect } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { router } from "expo-router";
import { Alert } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLogged, checkSession, isLogged, loading } = useGlobalContext();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Redirect to home if already logged in
  useEffect(() => {
    if (isLogged && !loading) {
      router.replace('/home');
    }
  }, [isLogged, loading]);

  // Immediate redirect if already logged in
  if (isLogged && !loading) {
    return <Redirect href="/home" />;
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    //issue an alert if the form is not filled in
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Check and clear any existing session before registration
      const hasSession = await checkSession();
      if (hasSession) {
        // The createUser function will handle session deletion
      }
      
      const newUser = await createUser(form.email, form.password, form.username);
      
      if (newUser) {
        setIsLogged(true);
        setUser(newUser);
      }
      
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
          <Text className="text-white text-2xl font-psemibold mt-10">Sign up</Text>
          
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            keyboardType="default"
            placeholder="Enter your username"
            autoCapitalize="none"
            />

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
            
          <CustomButton
            title="Sign up"
            containerStyles="mt-7"
            handlePress={ submit }
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
          
        </View>
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

