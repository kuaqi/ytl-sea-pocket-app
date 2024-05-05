import { FlatList, Image, ListRenderItem, StyleSheet, Text, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { TransactionHistory } from "../types";
import { mockData } from "../source/MockData";
import Header from "../components/Header";
import TransactionHistoryItem from "../components/TransactionHistoryItem";

const Colour = {
  PRIMARY: '#01A2DA',
  SECONDARY: '#C4D4DA',
  PRIMARYTEXT: '#393939',
}

export default function TransactionHistoryScreen() {
  const [sampleData, setSampleData] = useState<TransactionHistory[]>([])

  const keyExtractor = useCallback((item: TransactionHistory, index: number) => {
    return `${item.referenceID}-${index}`
  }, [])

  const renderItem: ListRenderItem<TransactionHistory> = useCallback(({ item, index }) => (
    <TransactionHistoryItem item={item} index={index} />
  ), [])

  useEffect(() => {
    setSampleData(mockData)
  }, [])

  function onToggleVisibility() {
    console.log('onToggleVisibility pressed.')
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
  listFooterComponent: {
    height: 100,
  },
})
