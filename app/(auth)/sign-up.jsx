import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'


const SignUp = () => {

  const [form, setForm] = useState({
    username: "",
    email: "", 
    password: ""
  })

  const [isSubmitted, setSubmitted] = useState(false)
  const {setUser, setIsLoggedIn} = useGlobalContext()
  
  
  const submit = async () => {

    if (!form.username || !form.email || !form.password) 
    {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires.')  
    }

    setSubmitted(true)
    
    try {
      const result = await createUser(form.email, form.password, form.username)

      //set it to global state 
      setUser(result)
      setIsLoggedIn(true)

      Alert.alert('Succès', "Connecter avec succès.")

      router.replace('/home')
      
    } catch (error) {
      Alert.alert('Erreur', error.message)
    }
    finally {
      setSubmitted(false)
    }
  }

    return (
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View className="w-full justify-center min-h-[85vh] px-4 my-6">
            <Image
              source={images.logo}
              alt="Logo"
              className="w-[115px] h-[35px]"
              resizeMode='contain'
            />
            <Text className="text-2xl text-white text-semibold font-psemibold mt-10">
              Créer un compte sur Aora
            </Text>

            <FormField
              title="Nom d'utilisateur"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mt-10"
            />

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />


            <FormField
              title="Mot de passe"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />

            <CustomButton
              title="Créer un compte"
              handlePress={submit}
              containerStyle="mt-7"
              isLoading={isSubmitted}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Avez-vous déjà un compte ?
                <Link href="/sign-in" className='text-lg font-psemibold
                 text-secondary'> Se connecter.</Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
}

export default SignUp