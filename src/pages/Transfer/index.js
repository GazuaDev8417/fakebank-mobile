import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { url } from '../../constants/urls'
import styles from './style'
import {
  Text,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'



const Transfer = (props)=>{
  const [cpf, setCpf] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [recipientCpf, setRecipientCpf] = useState('')
  const [value, setValue] = useState('')
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


  const transfer = async()=>{
    const body = {
      password,
      cpf,
      recipientName,
      recipientCpf,
      value: Number(value)
    }

    axios({
      method:'POST',
      url:`${url}/accounts/transfer`,
      headers: {
        Authorization: await AsyncStorage.getItem('token')
      },
      data: body
    }).then(res=>{
      alert(res.data)
      setPassword('')
      setCpf('')
      setRecipientCpf('')
      setRecipientName('')
      setValue('')
    }).catch(err=>{
      const msg = err.response.data
      if(msg === 'jwt expired'){
        Alert.alert(
          'Token expirado!',
          'Por motivos de segurança você deve efetuar login novamente'
        )
      }else{
        Alert.alert(
          'Erro ao realizar transferência:',
          err.response.data
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
          keyboardType='numeric'
          placeholder='CPF'
          placeholderTextColor='gray'/>

        <TextInput style={styles.input}
          onChangeText={setRecipientName}
          value={recipientName}
          placeholder='Nome do receptor'
          placeholderTextColor='gray'/>

        <TextInput style={styles.input}
          onChangeText={setRecipientCpf}
          value={recipientCpf}
          keyboardType='numeric'
          placeholder='CPF do receptor'
          placeholderTextColor='gray'/>

        <TextInput style={styles.input}
          onChangeText={setValue}
          value={value}
          keyboardType='numeric'
          placeholder='Valor'
          placeholderTextColor='gray'/>
        
        <TextInput style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder='Senha'
          secureTextEntry={true}/>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn}
            onPress={transfer}>
            <Text>
              Transferir
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  )
}
export default Transfer
