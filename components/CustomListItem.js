import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, ListItem } from 'react-native-elements'
import { collection, doc, getDocs, orderBy, query } from 'firebase/firestore';
import { db,auth } from '../firebaseConfig';

const CustomListItem = ({id, chatName, enterChatFunction,enterChat}) => {

  const [messages,setMessages] = useState([]);

  useEffect(()=> {
    async function fetchChat() {
      const docRef = doc(db, "chats", id);
      const colRef = collection(docRef, "messages");

      const q = query(colRef,orderBy('timeStamp','desc'));
      const querySnapshot = await getDocs(q);

      setMessages(querySnapshot.docs.map((doc) => doc.data() ))
  }
    fetchChat();
  },[messages])
  
  

  return (
    <View>
      <ListItem onPress={() => enterChat(id,chatName)} key={id} bottomDivider>
        <Avatar rounded
        source={{
            uri:messages?.[0]?.photoURL?messages?.[0]?.photoURL:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }}/>

        <ListItem.Content>
            <ListItem.Title>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                {messages?.[0]?.displayName}: {messages?.[0]?.message}
            </ListItem.Subtitle>
        </ListItem.Content>
        </ListItem>
    </View>
  )
}

export default CustomListItem