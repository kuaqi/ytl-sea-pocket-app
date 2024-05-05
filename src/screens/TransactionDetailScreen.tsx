import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TransactionHistory } from "../types";
import { TransactionType, Currency, Colour } from "../constants";
import Header from "../components/Header";

interface Props {
  route: {
    params: {
      transaction_item: TransactionHistory,
    }
  },
}

export default function TransactionDetailScreen({ route }: Props) {
  const { transaction_item: detailItem } = route.params

  function getTransactionType(type: string) {
    if (!type) return ''
    if (type === TransactionType.DEBIT) return '-'
    if (type === TransactionType.CREDIT) return '+'
  }

  function getCurrencyLabel(currency: string) {
    if (!currency) return ''
    switch (currency) {
      case Currency.MYR:
        return 'RM'
      case Currency.SGD:
        return '$'
      default:
        return ''
    }
  }

  function onToggleVisibility() {
    console.log('onToggleVisibility pressed.')
  }

  function renderTransactionDetailLabel() {
    return (
      <View style={styles.transactionDetailLabelContainer}>
        <Text style={styles.transactionDetailText}>
          {'Transaction Detail'}
        </Text>
      </View>
    );
  }

  function renderAmount() {
    const currencyText = getTransactionType(detailItem.type) + getCurrencyLabel(detailItem.currency)
    const amountText = detailItem.amount?.toFixed(2)

    return (
      <View style={styles.rowContainer}>
        <View style={styles.amountContainer}>
          <Text style={[
            styles.amountText,
            detailItem.type === TransactionType.CREDIT ? { color: 'green' } : { color: 'red' }
          ]}>
            {currencyText + amountText}
          </Text>
        </View>
      </View>
    );
  }

  function renderDetail() {
    return (
      <>
        {renderRow('Type', detailItem.type)}
        {renderRow('Description', detailItem.description)}
        {renderRow('Date', detailItem.date)}
        {renderRow('Beneficiary Name', detailItem.beneficiaryName)}
        {renderRow('Beneficiary Account', detailItem.beneficiaryAccount)}
        {renderRow('Reference ID', detailItem.referenceID)}
      </>
    );
  }

  function renderRow(label: string, description: string) {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.labelText}>
            {label}
          </Text>
          <Text style={styles.descriptionText}>
            {description}
          </Text>
        </View>
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
      {renderTransactionDetailLabel()}
      <ScrollView>
        {renderAmount()}
        {renderDetail()}
        {renderListFooter()}
      </ScrollView>
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
  transactionDetailLabelContainer: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    width: '100%',
    backgroundColor: Colour.SECONDARY,
  },
  rowContainer: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    height: 70,
    width: '100%',
    flexDirection: 'row',
  },
  amountContainer: {
    paddingHorizontal: 8,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  descriptionContainer: {
    paddingRight: 30,
    paddingHorizontal: 8,
    width: '62%',
    justifyContent: 'center',
  },
  transactionDetailText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'grey',
  },
  amountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colour.PRIMARYTEXT,
  },
  labelText: {
    fontSize: 16,
    color: Colour.PRIMARYTEXT,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 16,
    color: Colour.PRIMARYTEXT,
  },
  listFooterComponent: {
    height: 100,
  },
})
