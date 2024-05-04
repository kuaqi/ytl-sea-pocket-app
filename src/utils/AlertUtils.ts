import { Alert } from "react-native"

export const AlertUtils = {
  showSimpleAlert,
  showTwoButtonAlert,
}

async function showSimpleAlert(title: string, message: string) {
  Alert.alert(title, message, [
    { text: 'OK', onPress: () => console.log('OK pressed.')}
  ])
}

async function showTwoButtonAlert(title: string, message: string) {
  Alert.alert(title, message, [
    { 
      text: 'Cancel',
      onPress: () => console.log('Cancel pressed.'),
      style: 'cancel',
    },
    { 
      text: 'OK',
      onPress: () => console.log('OK pressed.')},
  ])
}
