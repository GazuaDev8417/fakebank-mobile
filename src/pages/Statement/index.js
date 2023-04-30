import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './style'
import { url } from '../../constants/urls'
import { convertDate } from '../../utils/convertDate'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  ScrollView,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native'



const Statement = (props)=>{
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')
  const [state, setState] = useState([])



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


  const getStatement = async()=>{
    const body = {
      token: await AsyncStorage.getItem('token'),
      cpf,
      password
    }
    axios({
      method:'POST',
      url:`${url}/accounts/statement`,
      headers: {
        Authorization: await AsyncStorage.getItem('token')
      },
      data: body
    }).then(res=>{
      setState(res.data)
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
          'Erro ao gerar extrato:',
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
          placeholder='CPF'/>

        <TextInput style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder='Senha'
          secureTextEntry={true}/>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn}
            onPress={getStatement}>
            <Text>
              Consultar extrato
            </Text>
          </TouchableOpacity>

        </View>
        <View style={styles.mapContainer}>
          {state && state.map(st=>{
            return <View key={st.id} style={styles.card}>
                    <Text style={styles.txtMap}>Data: </Text><Text>{convertDate(st.date)}</Text>
                    <Text style={styles.txtMap}>Valor: </Text><Text>{st.value}</Text>
                    <Text style={styles.txtMap}>Descrição: </Text><Text>{st.description}</Text>
                   </View>
          })}
       </View>
      </View>
    </ScrollView>
  )
}
export default Statement
