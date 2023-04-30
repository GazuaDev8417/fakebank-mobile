import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import styles from './style'
import { url } from '../../constants/urls'
import {
  Text,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'



const Login = (props)=>{
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  
  useEffect(()=>{
    token()
  }, [])


  const token = async()=>{
    try{
      const value = AsyncStorage.getItem('token')
      if(value !== null){
        props.navigation.navigate('MyDrawer')
      }
    }catch(e){
      alert(e)
    }
  }

      
  const enter = ()=>{
    const body = {
      email,
      password
    }
    axios.post(`${url}/accounts/login`, body).then(async res=>{
      await AsyncStorage.setItem('token', res.data)
      setEmail('')
      setPassword('')
      props.navigation.navigate('MyDrawer')
    }).catch(err=>{
      alert(err.response.data)
    })
  }


  return(
    <ScrollView>
      <View style={styles.container}>

        <TextInput style={styles.input}
          placeholder='nome@email.com'
          value={email}
          onChangeText={setEmail}/>

        <TextInput style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholder='Senha'/>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn}
            onPress={enter}>
            <Text>Entrar</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          flexDirection:'row',
          justifyContent:'space-evenly',
          alignItems:'center',
          marginTop:30
        }}>
          <View style={{borderWidth:1, margin:10, width:'25%'}}/>
          <Text style={{fontSize:18}}>Ou</Text>
          <View style={{borderWidth:1, margin:10, width:'25%'}}/>
        </View>
        <View style={{
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center'
        }}>
          <Text style={{textAlign:'center', margin:10, fontSize:16}}>Cadastra-se cliquando</Text>
          <TouchableOpacity onPress={()=> props.navigation.navigate('Signin')}>
            <Text style={{fontSize:16, color:'blue'}}>
              aqui
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}


export default Login
