import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { StackNavigation } from "../navigation/StackNavigator";
import { useNavigation } from "@react-navigation/native";
import { Colour } from "../constants";
import { AlertUtils } from "../utils/AlertUtils";
import { BiometricUtils } from "../utils/BiometricUtils";
import ReactNativeBiometrics from "react-native-biometrics";

export default function LoginScreen() {
  const navigation = useNavigation<StackNavigation>()

  function onLogin() {
    console.log('Login button pressed.')
    navigation.navigate('TransactionHistory')
  }

  async function onBiometricLogin() {
    console.log('Face ID button pressed.')
    const rnBiometrics = new ReactNativeBiometrics()
    const result = await BiometricUtils.getLocalBiometry(rnBiometrics)
    if (result) {
      navigation.navigate('TransactionHistory')
    } else {
      AlertUtils.showSimpleAlert(
        'Biometric Authentication',
        'Face ID or fingerprint is not enabled. Please enable via Settings.'
      )
    }
  }

  function renderCompanyLogo() {
    return (
      <Image 
        style={styles.logoImage}
        source={require('../assets/icons/ic_ytlsea_logo.png' )}
      />
    );
  }

  function renderLoginButton(buttonTitle: string, loginMethod: Function) {
    return (
      <Pressable
        onPress={() => loginMethod()}
        style={styles.loginButton}>
        <Text style={styles.loginText}>
          {buttonTitle}
        </Text>
      </Pressable>
    );
  }

  function renderPadding() {
    return (<View style={{ height: 12 }} />);
  }

  return (
    <View style={styles.container}>
      {renderCompanyLogo()}
      {renderLoginButton('LOGIN', onLogin)}
      {renderPadding()}
      {renderLoginButton('FACE ID / TOUCH ID', onBiometricLogin)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colour.PRIMARY,
  },
  logoImage: {
    height: '72%',
    resizeMode: 'contain',
  },
  loginButton: {
    width: 300,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colour.ACCENT,
  },
  loginText: {
    color: 'white',
  },
})
