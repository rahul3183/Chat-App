import { View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Avatar } from 'react-native-elements';
import  Icon  from 'react-native-vector-icons/FontAwesome' 
import  IonIcon  from 'react-native-vector-icons/Ionicons'  
import { db,auth } from '../firebaseConfig';
import { addDoc, collection, doc, getDocs, setDoc,Timestamp,orderBy, query  } from "firebase/firestore"; 

const ChatScreen = ({navigation, route}) => {

  const [input,setInput] = useState('');
  const [messages,setMessages] = useState([]);

    const {id,chatName} = route.params;

    const sendMessage = async () => {
        Keyboard.dismiss();
        const docRef = doc(db, "chats", id);
        const colRef = collection(docRef, "messages");

        await addDoc(colRef,{
          message:input,
          displayName:auth.currentUser.displayName,
          photoURL:auth.currentUser.photoURL,
          email:auth.currentUser.email,
          timeStamp:Timestamp.now().toDate(),
        });

        setInput('');
    }

    useEffect(()=> {
      async function fetchChat() {
        const docRef = doc(db, "chats", id);
        const colRef = collection(docRef, "messages");
        const q = query(colRef,orderBy('timeStamp','asc'));
        const querySnapshot = await getDocs(q);
        setMessages(querySnapshot.docs.map((doc) => ({
            id:doc.id,
            data:doc.data(),
        })))

    }
    fetchChat();
    },[messages])

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerTitleAlign:'right',
            headerTitleStyle:{color:'#6a8ed4'},
            headerTintColor:'#6a8ed4',
            headerRight: () => (
              <View style={{flexDirection:'row'}}  className="flex-row items-center space-x-4">
                <TouchableOpacity>
                  <Icon name="video-camera" size={24} color="#6a8ed4"/>
                </TouchableOpacity>
                <TouchableOpacity>
                  <IonIcon name="call" size={24} color="#6a8ed4"/>
                </TouchableOpacity>
              </View>
            ),
            headerTitle: () =>(
                <View>
                    <View  className="flex-row items-center space-x-4 right-6"> 
                        <Avatar rounded 
                        source={{uri:auth.currentUser.photoURL?auth.currentUser.photoURL:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}}/>
                        <Text className="font-bold text-lg text-[#6a8ed4]">{chatName}</Text>
                    </View>
                </View>
            )
        })
    },[navigation])




  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios"?"padding":"height"}
      keyboardVerticalOffset={90}
      className="flex-1" >

        <>
        {/* Chat Body */}
          <ScrollView className="pt-4">
              {
                messages.map(({id, data}) => (
                  data.email == auth.currentUser.email?
                  (
                    <TouchableOpacity activeOpacity={0.5} key={id}>
                    <View style={{alignSelf:'flex-end'}} className="p-3 bg-gray-200 rounded-xl h-auto right-2 mb-10 w-40 justify-center">
                        <Avatar containerStyle={[{position:'absolute',bottom:-5, right:-2}]}  rounded size={20}
                          source={{uri:auth.currentUser.photoURL?auth.currentUser.photoURL:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}}/>
                        <Text className="font-light text-md text-black">{data.message}</Text>
                        <Text style={{fontSize:10}} className="font-light text-gray-500 top-2">{data.displayName}</Text>
                    </View>
                    </TouchableOpacity>
                  ):
                  (
                    <TouchableOpacity activeOpacity={0.5} key={id}>
                    <View className="p-3 bg-[#6a8ed4] rounded-xl h-auto left-2 mb-10 w-40 justify-center ">
                        <Avatar rounded size={20}  containerStyle={[{position:'absolute',bottom:-5, left:-2}]}
                          source={{uri:data.photoURL?data.photoURL:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}}/>
                        <Text className="font-light text-sm text-white">{data.message}</Text>
                        <Text style={{fontSize:10,alignSelf:'flex-end'}} className="font-light text-white top-2">{data.displayName}</Text>
                    </View>
                    </TouchableOpacity>
                  )
                ))
              }
          </ScrollView>

          <View className="flex-row items-center w-full p-4 mb-2">
            <TextInput placeholder='message' className="flex-1 h-12 mr-4 rounded-full p-4 border-1 border-gray-300  bg-gray-200"
             value={input} onSubmitEditing={sendMessage} onChangeText={(val) => setInput(val)}/>
            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
              <IonIcon name='send' size={28} color='#6a8ed4'/>
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen