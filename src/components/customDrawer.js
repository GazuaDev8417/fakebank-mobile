import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { url } from '../constants/urls'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'



function CustomDrawer(props){
  const [user, setUser] = useState({})
  
  
  

  const getUser = async()=>{
    const id = await AsyncStorage.getItem('id')
    axios.get(`${url}/accounts/${id}`).then(res=>{
      setUser(res.data)
    }).catch(err=>{
      alert(err.response.data)
    })
  }


  const token = async()=>{
    try{
      const value = await AsyncStorage.getItem('token')
      if(value !== null){
        props.navigation.navigate('Balance')
      }
    }catch(e){
      alert(e)
    }
  }


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


  const logout = async()=>{
    try{
      await AsyncStorage.clear()
      props.navigation.navigate('Login')
    }catch(e){
      alert(e)
    }
  }

  return(
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My Bank</Text>
        <Text style={{color:'blue', margin:10}}>
          {user.name}
        </Text>
      </View>
      <View style={styles.itemStyle}>
        {/* <TouchableOpacity style={styles.btnNavigator}
          onPress={()=>{
            props.navigation.navigate('Login')
            token()
            getUser()
          }}>
          <Text style={styles.items}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNavigator}
          onPress={()=>{
            props.navigation.navigate('Signin')
            token()
            getUser()
          }}>
          <Text style={styles.items}>Signin</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.btnNavigator}
          onPress={()=>{
            props.navigation.navigate('Balance')
            noToken()
            getUser()
          }}>
          <Text style={styles.items}>Saldo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNavigator}
          onPress={()=>{
            props.navigation.navigate('Statement')
            noToken()
            getUser()
          }}>
          <Text style={styles.items}>Extrato</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNavigator}
          onPress={()=>{
            props.navigation.navigate('Payment')
            noToken()
            getUser()
          }}>
          <Text style={styles.items}>Pagamento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNavigator}
          onPress={()=>{
            props.navigation.navigate('Deposit')
            noToken()
            getUser()
          }}>
          <Text style={styles.items}>Deposito</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNavigator}
          onPress={()=>{
            props.navigation.navigate('Transfer')
            noToken()
            getUser()
          }}>
          <Text style={styles.items}>Transferência</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnNavigator}
          onPress={logout}>
          <Text style={styles.items}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    backgroundColor: 'lightgray',
    height: 80
  },
  title: {
    fontSize: 20,
    margin: 10,
    color: 'blue'
  },
  itemStyle: {
    margin: 10
  },
  items: {
    color: 'blue',
    fontSize: 15
  },
  btnNavigator: {
    marginTop: 10,
    padding: 5,
    borderRadius: 10
  }
})

export default CustomDrawer
