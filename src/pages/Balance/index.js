import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../../constants/urls'
import styles from './style'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Text,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'



const Balance = (props)=>{
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')



  useEffect(()=>{
    noToken()
  }, [])


  const noToken = async()=>{
    try{
      const value = await AsyncStorage.getItem('token')
      
      if(!value){
        props.navigation.navigate('Login')
      }
    }catch(e){
      alert(e)
    }
  }

  

  const getBalance = async()=>{
    const body = {
      cpf,
      password
    }
    
    axios({
      method:'POST',
      url:`${url}/accounts/balance`,
      headers:{
        Authorization: await AsyncStorage.getItem('token')
      },
      data: body
    }).then(res=>{
      alert(res.data)
      setCpf('')
      setPassword('')
    }).catch(err=>{      
      const msg = err.response.data.message
      if(msg === 'jwt expired'){
        Alert.alert(
          'Token expirado!', 
          'Por motivos de segurança você deve efetuar login novamente'
          )
      }else{
        Alert.alert(
          'Erro ao consultar saldo:',
          msg
          )
      }
    })

  }


  return(
    <ScrollView>
      <View style={styles.container}>

        <TextInput style={styles.input}
          onChangeText={setCpf}
          value={cpf}
          maxLength={11}
          keyboardType='numeric'
          placeholder='CPF'
          placeholderTextColor='gray'/>

        <TextInput style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholder='Senha'/>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn}
            onPress={getBalance}>
            <Text>
              Consultar saldo
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  )
}
export default Balance
