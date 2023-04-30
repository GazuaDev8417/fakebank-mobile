import { useEffect } from "react"
import LottieView from 'lottie-react-native'
import { StyleSheet, View } from "react-native"



export default function Splash(props){


    useEffect(()=>{
        setTimeout(()=>{
            props.navigation.navigate('Login')
        }, 3000)
    }, [])


    return(
        <View style={styles.animationContainer}>
            <LottieView
                autoPlay
                speed={1.5}
                source={require('../../../assets/45945-bank-building.json')}
                />
        </View>
    )
}


const styles = StyleSheet.create({
    animationContainer: {
        flex: 1,
        backgroundColor: 'lightgray'
    }
})