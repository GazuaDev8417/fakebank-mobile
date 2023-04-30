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




const Deposit = (props)=>{
  const [password, setPassword] = useState('')
  const [cpf, setCpf] = useState('')
  const [value, setValue] = useState('')



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


  const deposit = async()=>{
    const body = {
      cpf,
      password,
      value: Number(value)
    }
    axios({
      method:'POST',
      url:`${url}/accounts/deposit`,
      headers: {
        Authorization: await AsyncStorage.getItem('token')
      },
      data: body
    }).then(res=>{
      alert(res.data)
      setPassword('')
      setCpf('')
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
          'Erro ao efetuar deposito:',
          msg
          )
      }
    })
  }


  return(
    <ScrollView>
      <View style={styles.container}>            

        <TextInput style={styles.input}
          onChangeText={setValue}
          value={value}
          keyboardType='numeric'
          placeholder='Valor'
          placeholderTextColor='gray'/>
        
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
          placeholder='Senha'
          secureTextEntry={true}/>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn}
            onPress={deposit}>
            <Text>
              Depositar
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  )
}
export default Deposit
