import { FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../navigation/StackNavigator";
import { TransactionHistory } from "../types";
import { mockData } from "../source/MockData";

const Currency = {
  MYR: 'MYR',
  SGD: 'SGD',
}

const TransactionType = {
  DEBIT: 'debit',
  CREDIT: 'credit',
}

const Colour = {
  PRIMARY: '#01A2DA',
  SECONDARY: '#C4D4DA',
  PRIMARYTEXT: '#393939',
}

export default function TransactionHistoryScreen() {
  const navigation = useNavigation<StackNavigation>()
  const [sampleData, setSampleData] = useState<TransactionHistory[]>([])

  const keyExtractor = useCallback((item: TransactionHistory, index: number) => {
    return `${item.referenceID}-${index}`
  }, [])

  const onItemPress = useCallback((item: TransactionHistory) => {
    console.log(item.description + ' selected.')
    navigation.navigate('TransactionDetail', {
      transaction_item: item,
    })
  }, [])

  const renderItem: ListRenderItem<TransactionHistory> = useCallback(({ item }) => (
    <Pressable
      onPress={() => onItemPress(item)}
      style={styles.historyItemContainer}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>
            {getTransactionType(item.type)}{getCurrencyLabel(item.currency)}{' '}{item.amount?.toFixed(2)}
          </Text>
        </View>
    </Pressable>
  ), [])

  useEffect(() => {
    setSampleData(mockData)
  }, [])

  function getTransactionType(type: string) {
    if (!type) return
    if (type === TransactionType.DEBIT) return (<Text>-</Text>);
    if (type === TransactionType.CREDIT) return (<Text>+</Text>);
  }

  function getCurrencyLabel(currency: string) {
    if (!currency) return
    switch (currency) {
      case Currency.MYR:
        return 'RM'
      case Currency.SGD:
        return '$'
      default:
        return ''
    }
  }

  function renderHeader() {
    return (
      <>
        <View style={styles.headerContainer} />
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
      {renderHeader()}
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
  headerContainer: {
    height: 100,
    width: '100%',
    backgroundColor: Colour.PRIMARY,
  },
  historyItemContainer: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10, 
    borderRadius: 10,
    height: 70,
    width: '100%', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white', 
  },
  descriptionContainer: {
    paddingRight: 30,
    paddingHorizontal: 8,
    width: '62%',
    justifyContent: 'center',
  },
  amountContainer: {
    paddingHorizontal: 4,
    width: '38%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  transactionHistoryLabelContainer: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    width: '100%',
    backgroundColor: Colour.SECONDARY,
  },
  contentContainerStyle: {
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: Colour.SECONDARY,
  },
  descriptionText: {
    fontSize: 16,
    color: Colour.PRIMARYTEXT,
  },
  amountText: {
    fontSize: 16,
    color: Colour.PRIMARYTEXT,
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
