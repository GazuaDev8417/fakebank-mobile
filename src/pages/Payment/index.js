import React, { useEffect, useState } from 'react'
import styles from './style'
import axios from 'axios'
import { url } from '../../constants/urls'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Text,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'



const Payment = (props)=>{
  const [password, setPassword] = useState('')
  const [cpf, setCpf] = useState('')
  const [initialDate, setInitialDate] = useState('')
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')



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


  const onChangeText = (text)=>{
    if(text.length === 2){
      text = text + '/'
    }
    if(text.length === 5){
      text = text + '/'
    }

    setInitialDate(text)
  }


  const pay = async()=>{
    const body = {
      password,
      cpf,
      initialDate,
      value: Number(value),
      description
    }
    axios({
      method:'POST',
      url:`${url}/accounts/payment`,
      headers: {
        Authorization: await AsyncStorage.getItem('token')
      },
      data: body
    }).then(res=>{
      alert(res.data)
      setPassword('')
      setInitialDate('')
      setCpf('')
      setValue('')
      setDescription('')
    }).catch(err=>{
      const msg = err.response.data.message
      if(msg === 'jwt expired'){
        Alert.alert(
          'Token expirado!', 
          'Por motivos de segurança você deve efetuar login novamente'
          )
      }else{
        Alert.alert(
          'Erro ao efetuar pagamento:',
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
          onChangeText={setValue}
          value={value}
          keyboardType='numeric'
          placeholder='Valor'
          placeholderTextColor='gray'/>
        
        <TextInput style={styles.input}
          value={initialDate}
          onChangeText={onChangeText}
          maxLength={10}
          keyboardType='numeric'
          placeholder='DD/MM/AAAA'
          placeholderTextColor='gray'/>

        <TextInput style={styles.input}
          onChangeText={setDescription}
          value={description}
          placeholder='Descrição'
          placeholderTextColor='gray'/>
        
        <TextInput style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder='Senha'
          secureTextEntry={true}/>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn}
            onPress={pay}>
            <Text>
              Efetuar pagamento
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
export default Payment
