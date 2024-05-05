import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../navigation/StackNavigator";
import { TransactionHistory } from "../types";
import { Colour, Currency, TransactionType } from "../constants";

interface Props {
  item: TransactionHistory,
  index: number,
}

const TransactionHistoryItem = ({ item, index }: Props) => {
  const navigation = useNavigation<StackNavigation>();

  const onItemPress = useCallback((item: TransactionHistory) => {
    console.log(item.description + ' selected.');
    navigation.navigate('TransactionDetail', {
      transaction_item: item,
    });
  }, []);

  function getTransactionType(type: string) {
    if (!type) return;
    if (type === TransactionType.DEBIT) return (<Text>-</Text>);
    if (type === TransactionType.CREDIT) return (<Text>+</Text>);
  }

  function getCurrencyLabel(currency: string) {
    if (!currency) return;
    switch (currency) {
      case Currency.MYR:
        return 'RM';
      case Currency.SGD:
        return '$';
      default:
        return '';
    }
  }

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
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
  descriptionText: {
    fontSize: 16,
    color: Colour.PRIMARYTEXT,
  },
  amountText: {
    fontSize: 16,
    color: Colour.PRIMARYTEXT,
  },
})

export default React.memo(TransactionHistoryItem)
