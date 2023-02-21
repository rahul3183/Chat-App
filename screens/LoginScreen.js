import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Animatable from 'react-native-animatable';
import { Button , Input, Image} from 'react-native-elements';
import Icon  from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({navigation}) => {

    const [loginData,setLoginData] = useState({
        email:'',
        password:'',
        secureTextEntry:true,
    });



    const TextInputChange = (val) => {
        setLoginData({
            ...loginData,
            email:val,
        })
    }

    const PasswordInputChange = (val) => {
        setLoginData({
            ...loginData,
            password:val,
        })
    }

    const updateSecureTextEntry = () => {
        setLoginData({
            ...loginData,
            secureTextEntry:!loginData.secureTextEntry,
        })
    }

    useEffect(()=> {
        const unsubscribed = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                navigation.replace('home');
            }
        });

        return unsubscribed;
    },[])


    const SignIn = () => {
        let email = loginData.email.trim();
        signInWithEmailAndPassword(auth,email,loginData.password)
        .then(authUser => {
            const user = authUser.user;
            if(user) {
                navigation.replace('home');
            }
        }).catch((error) => {
            console.log(error);
        }) 
    }

  return (
    <SafeAreaView className="flex-1 p-4">
        <View className="mt-20 items-center">
            <Animatable.View animation="flipInX" duration={600}>
                <Text className="font-bold text-2xl">Login</Text>
            </Animatable.View>
            <View className="w-60 mt-8">
                <View className="flex-row justify-center items-center space-x-2">
                <Input leftIcon={ <Icon style={{marginRight:4}} name='user-alt' color='grey' size={16}/>} placeholder='Email' type="email" value={loginData.email} onChangeText={(text) => TextInputChange(text)}/>
                </View>
                <View className="flex-row justify-center items-center space-x-2 ml-4">
                <Input leftIcon={ <Icon name='key' style={{marginRight:4}} color='grey' size={16}/>}  placeholder='Password' secureTextEntry={loginData.secureTextEntry} type="password" value={loginData.password} onChangeText={(text) => PasswordInputChange(text)}/>
                <TouchableOpacity onPress={updateSecureTextEntry}>
                {loginData.secureTextEntry?
                    <Feather
                    name='eye-off' size={20} color="green"/>
                    :
                    <Feather
                    name='eye' size={20} color="green"/>
                }
              </TouchableOpacity>
                </View>
                <Animatable.View animation="flipInX" duration={700}>
                <Button buttonStyle={{backgroundColor:'#6a8ed4',borderRadius:20}} size={50} title='Login' onPress={() => {SignIn()}}/>
                <View className="items-center">
                <TouchableOpacity onPress={() => navigation.navigate('register')}> 
                    <Text className="font-light mt-4 text-blue-400">Sign up here</Text>
                </TouchableOpacity>
                </View>
                </Animatable.View>
            </View>
           
          
        </View>

    </SafeAreaView>
  )
}

export default LoginScreen