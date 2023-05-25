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
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  btn: {
    marginTop: 20,
    borderRadius: 10,
    width: 100,
    height: 30,
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    alignItems: 'center'
  }
})
export default styles
