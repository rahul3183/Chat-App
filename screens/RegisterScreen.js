import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable';
import { Button , Input, Image} from 'react-native-elements';
import Icon  from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import { auth } from '../firebaseConfig';
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterScreen = ({navigation}) => {

    const DisplayPicture = [
        'https://wallpapers.com/images/featured/4co57dtwk64fb7lv.jpg',
        'https://wallpapers.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg',
        'https://i.pinimg.com/564x/47/06/25/4706251f3098357d737549b0f93f55fd.jpg',
        'https://i.pinimg.com/564x/31/44/7e/31447e25b7bc3429f83520350ed13c15.jpg',
        'http://www.goodmorningimagesdownload.com/wp-content/uploads/2019/10/Whatsapp-DP-5-2.jpg',
    ]

  


    const [registerData,setRegisterData] = useState({
        name:'',
        email:'',
        password:'',
        secureTextEntry:true,
    });

    const [errorMessage,setErrorMessage] = useState('');

    const updateSecureTextEntry = () => {
        setRegisterData({
            ...registerData,
            secureTextEntry:!registerData.secureTextEntry,
        })
    }

    const TextInputChange = (val) => {
        setRegisterData({
            ...registerData,
            email:val,
        })
    }

    const NameInputChange = (val) => {
        setRegisterData({
            ...registerData,
            name:val,
        })
    }

    const PasswordInputChange = (val) => {
        setRegisterData({
            ...registerData,
            password:val,
        })
    }

    const Register = () => {
        let pictureURL = DisplayPicture[Math.floor(Math.random(0,1) * 5)];
        let email = registerData.email.trim();
        createUserWithEmailAndPassword(auth,email,registerData.password)
        .then(authUser => {
            updateProfile(authUser.user,{
                displayName:registerData.name,
                photoURL:pictureURL,
            })
        }).catch((error) => {
            setErrorMessage(error.code);
            console.log(error.code);
        }) 
    }

  return (
    <SafeAreaView className="flex-1 p-4">
        {/*  Header*/}
        <View className="mt-6">
        <Icon name='chevron-left' size={22} onPress={() => navigation.goBack()}/>
        </View>

        {/*  Register form */}
        <View className="mt-20 items-center">
            <Animatable.View animation="flipInX" duration={600}>
                <Text className="font-bold text-2xl">Register</Text>
            </Animatable.View>
            <View className="w-60 mt-8">
                <View className="flex-row justify-center items-center space-x-2">
                    <Input autoFocus leftIcon={ <Icon style={{marginRight:4}} name='user-alt' color='grey' size={16}/>} placeholder='Full Name' type="name" value={registerData.name} onChangeText={(text) => NameInputChange(text)}/>
                </View>
                <View className="flex-row justify-center items-center space-x-2">
                    <Input leftIcon={ <Icon style={{marginRight:4}} name='user-alt' color='grey' size={16}/>} placeholder='Email' type="email" value={registerData.email} onChangeText={(text) => TextInputChange(text)}/>
                </View>
                <View className="flex-row justify-center items-center space-x-2 ml-4">
                <Input leftIcon={ <Icon name='key' style={{marginRight:4}} color='grey' size={16}/>}  placeholder='Password' secureTextEntry={registerData.secureTextEntry} type="password" value={registerData.password} onChangeText={(text) => PasswordInputChange(text)}/>
                <TouchableOpacity onPress={updateSecureTextEntry}>
                {registerData.secureTextEntry?
                    <Feather
                    name='eye-off' size={20} color="green"/>
                    :
                    <Feather
                    name='eye' size={20} color="green"/>
                }
              </TouchableOpacity>
                </View>
                <Animatable.View animation="flipInX" duration={700}>
                <Button buttonStyle={{backgroundColor:'#6a8ed4',borderRadius:20}} size={50} title='Register' onPress={() => {Register()}}/>
                <View className="items-center">
                <TouchableOpacity onPress={() => navigation.goBack()}> 
                <Text className="font-light mt-4 text-blue-400">Login in</Text>
                </TouchableOpacity>
                </View>
                </Animatable.View>
            </View>
           
          
        </View>

    </SafeAreaView>
  )
}

export default RegisterScreen