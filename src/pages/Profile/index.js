import { useCallback, useEffect, useState, useContext } from 'react'
import { Context } from '../../context/Context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { url } from '../../constants/urls'
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native'



const Profile = (props)=>{
  const { states, requests } = useContext(Context)
  const user = states.user
  const [refresh, setRefresh] = useState(false)


  useEffect(()=>{
    noToken()
    requests.getUser()
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


  const wait = (timeout)=>{
    return new Promise(resolve=> setTimeout(resolve, timeout))
  }

  const onRefresh = useCallback(()=>{
    requests.getUser()
    setRefresh(true)
    wait(3000).then(()=> setRefresh(false))
  }, [])




  return(
      <View style={styles.container}>
          <ScrollView refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={onRefresh}/>
            }>
            <Text style={styles.profileName}>
                {user.name}
            </Text>
            <View style={styles.card}>
              <Text style={styles.cardContent}>
                <Text style={{fontWeight:'bold'}}>Email: </Text>{user.email}{'\n'}
                <Text style={{fontWeight:'bold'}}>Saldo: </Text>{user.balance}
              </Text>
            </View>
          </ScrollView>
      </View>
  )
}


const styles = StyleSheet.create({
  container: {
    marginTop: 50
  },
  profileName: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  card: {
    margin: 10
  },
  cardContent: {
    marginTop: 20,
    fontSize: 18
  }
})

export default Profile