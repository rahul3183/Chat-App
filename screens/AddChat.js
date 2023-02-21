import { View, Text, SafeAreaView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Input } from 'react-native-elements';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../firebaseConfig';

const AddChat = ({navigation}) => {

    const [input,setInput] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            title:'Create a New Chat',
            headerTitleStyle:{color:'#6a8ed4'},
            headerTintColor:'#6a8ed4',
            headerStyle:{backgroundColor:'white'},
            headerBackTitle:'Home',
        })
    },[navigation]);

    const createChat = async () => {
        try{
            await addDoc(collection(db,'chats'),{
                chatName:input,
            }).then(() =>{
                navigation.goBack();
            })
        }
        catch(error){
            console.log(error);
        }
    }

  return (
    <SafeAreaView className="flex-1">
        <View className="p-6">
            <Input placeholder='Enter a chat name' value={input}
            onChangeText={(val) => setInput(val)}
            leftIcon={
                <Icon name="wechat" type="antdesign" size={24} color="grey"/>
            }/>
            <Button buttonStyle={{backgroundColor:'#6a8ed4',borderRadius:20}} title='Create new Chat' onPress={createChat}/>
        </View>
    </SafeAreaView>
  )
}

export default AddChat