import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics"

export const BiometricUtils = {
  getLocalBiometry,
  getSensorAvailability,
}

async function getLocalBiometry(rnBiometrics: ReactNativeBiometrics) {
  const isAvailable = await getSensorAvailability(rnBiometrics)

  if (isAvailable) {
    const hasProvidedBiometry = await promptBiometrics(rnBiometrics, isAvailable)
    return hasProvidedBiometry
  }
}

async function getSensorAvailability(rnBiometrics: ReactNativeBiometrics) {
  const { available, biometryType } = await rnBiometrics.isSensorAvailable()

  if (!available) {
    console.log('Biometrics is not available.')
    return
  }
  switch (biometryType) {
    case BiometryTypes.FaceID:
      console.log('Face ID is supported.')
      return BiometryTypes.FaceID
    case BiometryTypes.TouchID:
      console.log('Touch ID is supported.')
      return BiometryTypes.TouchID
    case BiometryTypes.Biometrics:
      console.log('Biometrics is supported.')
      return BiometryTypes.Biometrics
    default:
      console.log('Biometrics is not enabled or supported.')
      break
  }
}

async function promptBiometrics(rnBiometrics: ReactNativeBiometrics, type: string) {
  const message = type === BiometryTypes.FaceID ? 'Confirm Face ID' : 'Confirm fingerprint'

  try {
    const { success, error } = await rnBiometrics.simplePrompt({ promptMessage: message })
    if (success) {
      console.log('Successfully provided biometrics.')
      return success
    } else if (error) {
      console.log('promptBiometrics:', error)
      return false
    } else {
      console.log('Biometric prompt cancelled by user.')
      return false
    }
  } catch {
    console.error('promptBiometrics: Unknown error.')
    return false
  }
}
