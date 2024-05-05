import { FlatList, Image, ListRenderItem, Pressable, StyleSheet, Text, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../navigation/StackNavigator";
import { TransactionHistory } from "../types";
import { mockData } from "../source/MockData";
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

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

  function onBackPress() {
    navigation.goBack()
  }

  function onToggleVisibility() {
    console.log('onToggleVisibility pressed.')
  }

  function renderHeader() {
    return (
      <>
        <View style={styles.headerContainer}>
          <View style={[styles.iconContainer, styles.iconLeftContainer]}>
            <TouchableOpacity 
              onPress={onBackPress}
              style={styles.pressableRadiusContainer}>
              <AntDesignIcon name="back" size={25} color="white" />
            </TouchableOpacity>
          </View>
          <View style={[styles.iconContainer, styles.iconRightContainer]}>
           <TouchableOpacity 
              onPress={onToggleVisibility}
              style={styles.pressableRadiusContainer}>
              <AntDesignIcon name="eye" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
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
      {renderHeader()}
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
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    height: 100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colour.PRIMARY,
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  iconLeftContainer: {
    justifyContent: 'flex-start',
  },
  iconRightContainer: {
    justifyContent: 'flex-end',
  },
  pressableRadiusContainer: {
    padding: 16,
    borderRadius: 24,
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
