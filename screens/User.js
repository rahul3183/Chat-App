import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Avatar, Button } from 'react-native-elements'
import { getAuth, signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';

const User = ({navigation}) => {

  const [user,setUser] = useState([]);

    const SignOutUser = () => {
      const auth = getAuth();
        signOut(auth).then(() => {
          navigation.replace("login");
        }).catch((error) => {
          console.log(error);
        });
        
      }
    

  return (
    <View className="justify-center flex-1 bg-white">
      <View className="flex-1 p-4">
        <View className="items-center flex-row space-x-6">
          <Avatar rounded
            source={{
                uri:auth.currentUser.photoURL?auth.currentUser.photoURL:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }} size={100}/>

          <View>
            <Text className="text-3xl" >{auth.currentUser.displayName}</Text>
            <Text className="font-light text-gray-400">{auth.currentUser.email}</Text>
          </View>
      </View>
      </View>
      <View className="p-6 ">
        <TouchableOpacity>
        <Button buttonStyle={{backgroundColor:'#6a8ed4',borderRadius:20}} size={16} title='Sign out'  onPress={SignOutUser}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default User