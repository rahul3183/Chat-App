import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import CustomListItem from '../components/CustomListItem'
import { useNavigation } from '@react-navigation/native'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../firebaseConfig'
import  Icon  from 'react-native-vector-icons/Feather'
import { collection, getDocs } from "firebase/firestore"; 


const Home = ({navigation}) => {

  const [chats,setChats] = useState([]);
 

  useEffect( () => {
    async function fetchChat() {
      const querySnapshot = await getDocs(collection(db,'chats'));
        setChats(querySnapshot.docs.map((doc) => ({
        id:doc.id,
        data:doc.data(),
      })))
    }
    fetchChat();
  },[chats])
  



  useLayoutEffect(() => {
    navigation.setOptions({
      title:'Signal',
      headerTitleStyle:{color:'#6a8ed4'},
      headerTintColor:'#6a8ed4',
      headerStyle:{backgroundColor:'white'},
      headerRight:() => (
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity>
            <Icon name="camera" size={24} color="#6a8ed4"/>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate('addChat')}>
            <Icon name="edit-2" size={24} color="#6a8ed4"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('profile')}>
          
            <Avatar rounded 
            source={{uri:auth.currentUser.photoURL?auth.currentUser.photoURL:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}}/>
          </TouchableOpacity>
        </View>
      )
    });
  },[navigation])


  const enterChat = (id,chatName) => {
    navigation.navigate('chat',{
      id:id,
      chatName:chatName,
    })
  }

  return (
    <SafeAreaView className="flex-1">
      {/*Header */ }
      <View className="">
        <View>

        </View>
      </View>

      {/* Chat Body */}
      <ScrollView className="h-full">
        {chats.map(({id,data:{chatName}}) => (
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
        ))}
          
      </ScrollView>
     
    </SafeAreaView>
  )
}

export default Home