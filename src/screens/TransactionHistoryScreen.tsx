import { FlatList, Image, ListRenderItem, StyleSheet, Text, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { TransactionHistory } from "../types";
import { Colour } from "../constants";
import { mockData } from "../source/MockData";
import { AlertUtils } from "../utils/AlertUtils";
import { BiometricUtils } from "../utils/BiometricUtils";
import ReactNativeBiometrics from "react-native-biometrics";
import Header from "../components/Header";
import TransactionHistoryItem from "../components/TransactionHistoryItem";

export default function TransactionHistoryScreen() {
  const [sampleData, setSampleData] = useState<TransactionHistory[]>([])
  const [isMaskShown, setMaskShown] = useState<boolean>(true)

  const keyExtractor = useCallback((item: TransactionHistory, index: number) => {
    return `${item.referenceID}-${index}`
  }, [])

  const renderItem: ListRenderItem<TransactionHistory> = useCallback(({ item, index }) => (
    <TransactionHistoryItem item={item} index={index} isMaskShown={isMaskShown} />
  ), [isMaskShown])

  useEffect(() => {
    setSampleData(mockData)
  }, [])

  async function onToggleVisibility() {
    if (!isMaskShown) {      
      setMaskShown(!isMaskShown)
    }
    if (isMaskShown) {
      const rnBiometrics = new ReactNativeBiometrics()
      const result = await BiometricUtils.getLocalBiometry(rnBiometrics)
      if (result) {
        setMaskShown(!isMaskShown)
      } else {
        AlertUtils.showSimpleAlert(
          'Biometric Authentication',
          'Face ID or fingerprint is not enabled. Please enable via Settings.'
        )
      }
    }
  }

  function renderBankCard() {
    return (
      <>
        <Image 
          style={styles.bankCardImage}
          source={require('../assets/images/transparent_bankcard.png' )}
        />
        <View style={styles.bankCardPadding} />
      </>
    );
  }

  function renderTransactionHistoryLabel() {
    return (
      <View style={styles.transactionHistoryLabelContainer}>
        <Text style={styles.transactionHistoryText}>
          {'Transaction History'}
        </Text>
      </View>
    );
  }

  function renderListFooter() {
    return (
      <View style={styles.listFooterComponent} />
    );
  }

  return (
    <View style={styles.container}>
      <Header onToggleVisibility={onToggleVisibility} />
      {renderBankCard()}
      {renderTransactionHistoryLabel()}
      <FlatList
        data={sampleData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainerStyle}
        style={{ backgroundColor: Colour.SECONDARY }}
        ListFooterComponent={renderListFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  transactionHistoryLabelContainer: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    width: '100%',
    backgroundColor: Colour.SECONDARY,
  },
  bankCardImage: {
    height: 190,
    resizeMode: 'contain',
    backgroundColor: Colour.PRIMARY,
  },
  bankCardPadding: {
    height: 16,
    width: '100%',
    backgroundColor: Colour.PRIMARY,
  },
  contentContainerStyle: {
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: Colour.SECONDARY,
  },
  transactionHistoryText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'grey',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  listFooterComponent: {
    height: 100,
  },
})
