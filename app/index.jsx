import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';


export default function App() {
    
    const { isLoading, isLoggedIn } = useGlobalContext()
    
    if (!isLoading && isLoggedIn)  return <Redirect href="/home" />
    
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: '100%'}}>
                <View className="w-full min-h-[85vh] items-center px-4">
                    <Image
                        source={images.logo}
                        alt="Logo"
                        className="w-[130px] h-[84px]"
                        resizeMode='contain'
                    />

                    <Image
                        source={images.cards}
                        alt="Cards"
                        className="max-w-[380px] w-full h-[300px]"
                        resizeMode='contain'
                    />

                    <View className="relative mt-5">
                        <Text className="text-3xl text-white font-bold text-center">
                            Discover Endless Possiblities with 
                            <Text className="text-secondary-200"> Aora</Text>
                        </Text>
                        <Image
                            source={images.path}
                            alt="path"
                            className="w-[136px] h-[15px] absolute -bottom-2 -right-6"
                            resizeMode='contain'
                        /> 
                    </View>
                    <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
                        Where creativity meet innovation : 
                        Embark on journey with limitless exploration with Aora.
                    </Text>

                    <CustomButton
                        title="Continuer avec un email"
                        handlePress={() => router.push('/sign-in')}
                        containerStyle="w-full mt-7"
                    />
                </View>
            </ScrollView>

            <StatusBar
                backgroundColor='#161622' 
                style='light'
            />
        </SafeAreaView>
    );
}

