import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import AuthProvider from './src/context/Context'
import Signin from './src/pages/CreateClient'
import Login from './src/pages/Login'
import Balance from './src/pages/Balance'
import Statement from './src/pages/Statement'
import Payment from './src/pages/Payment'
import Deposit from './src/pages/Deposit'
import Transfer from './src/pages/Transfer'
// import Profile from './src/pages/Profile'
import Splash from './src/pages/splash/Splash'
import CustomDrawer from './src/components/customDrawer'
import { StatusBar, View } from 'react-native'


const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()


function MyDrawer(){
  return(
        <Drawer.Navigator
          screenOptions={screenOptions}
          drawerContent={props => <CustomDrawer {...props}/>}>

          <Drawer.Screen
            name='Balance'
            component={Balance}
            options={{
              title: 'Saldo'
            }}/>

          <Drawer.Screen
            name='Statement'
            component={Statement}
            options={{
              title: 'Extrato'
            }}/>

          <Drawer.Screen
            name='Payment'
            component={Payment}
            options={{
              title: 'Pagamento'
            }}/>

          <Drawer.Screen
            name='Deposit'
            component={Deposit}
            options={{
              title: 'Deposito'
            }}/>

          <Drawer.Screen
            name='Transfer'
            component={Transfer}
            options={{
              title: 'Transferência'
            }}/>
          
          {/* <Drawer.Screen
            name='Profile'
            component={Profile}
            options={{
              title: 'Conta do Usuário'
            }}/> */}

        </Drawer.Navigator>
  )
}


const App = ()=>{
  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content'
        backgroundColor='gray'/>
      <AuthProvider>
        <Stack.Navigator
          initialRouteName='Splash'
          screenOptions={{
            headerTitleAlign:'center',
            headerStyle: {
              backgroundColor: 'lightgray'
            }
          }}
          >
          
          <Stack.Screen
            name='Splash'
            component={Splash}
            options={{
              headerShown: false
            }}/>
          
          <Stack.Screen
            name='Login'
            component={Login}
            options={{
              headerLeft: ()=>(
                <View/>
              )
            }}
            />

          <Stack.Screen
            name='Signin'
            component={Signin}/>
          
          <Stack.Screen
            name='MyDrawer'
            component={MyDrawer}
            options={{
              headerShown: false
            }}/>

        </Stack.Navigator>       
      </AuthProvider>
    </NavigationContainer>
  )
}

const screenOptions = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: 'lightgray'
  },

  drawerStyle:{
    width: 200
  }
}

export default App
