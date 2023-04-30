import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
  container: {
    marginTop: 50
  },
  input: {
    backgroundColor: 'lightgray',
    margin: 10,
    height: 40,
    borderRadius: 10,
    fontSize: 18,
    paddingHorizontal: 10
  },
  inputDate: {
    position: 'absolute',
    top: 5,
    right: 15
  },
  btnContainer: {
    alignItems: 'center'
  },
  btn: {
    marginTop: 40,
    borderRadius: 10,
    width: 150,
    height: 30,
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    alignItems: 'center'
  }
})
export default styles
