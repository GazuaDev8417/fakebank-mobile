import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { url } from '../../constants/urls'
import styles from './style'
import {
  Text,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'



const CreateClient = (props)=>{
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')  



  const onChangeText = (text)=>{
    if(text.length === 2){
      text = text + '/'
    }
    if(text.length === 5){
      text = text + '/'
    }

    setDate(text)
  }
  

  const limpar = ()=>{
    setName('')
    setCpf('')
    setEmail('')
    setDate('')
    setPassword('')
    setPasswordConf('')
  }


  const signin = ()=>{
    const body = {
      name,
      cpf,
      email,
      initialDate: date,
      password,
      passwordConf
    }
    
    axios.post(`${url}/accounts/create`, body).then(async res=>{
      await AsyncStorage.setItem('token', res.data)
      props.navigation.navigate('MyDrawer')
      setName('')
      setCpf('')
      setEmail('')
      setDate('')
      setPassword('')
      setPasswordConf('')
    }).catch(err=>{
      alert(err.response.data.message)
    })
  }



  return(
    <ScrollView>
      <View style={styles.container}>

        <TextInput style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder='Nome'/>

        <TextInput style={styles.input}
          onChangeText={setCpf}
          maxLength={11}
          value={cpf}
          keyboardType='numeric'
          placeholder='CPF'/>

        <TextInput style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder='E-mail'/>

        <TextInput style={styles.input}
          value={date}
          onChangeText={onChangeText}
          maxLength={10}
          keyboardType='numeric'
          placeholder='DD/MM/AAAA'
          placeholderTextColor='gray'/>

        <TextInput style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder='Senha'
          secureTextEntry={true}/>

        <TextInput style={styles.input}
          onChangeText={setPasswordConf}
          value={passwordConf}
          placeholder='Confirme sua senha'
          secureTextEntry={true}/>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn}
            onPress={limpar}>
            <Text>Limpar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}
            onPress={signin}>
            <Text>Registrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
export default CreateClient
