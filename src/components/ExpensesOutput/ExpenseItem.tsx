import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../../constants/style';
import { getFormatterDate } from '../../../utils/date';

interface ExpenseItemProps {
  description: string;
  amount: number;
  date: Date;
}
const ExpenseItem: React.FC<ExpenseItemProps>
  = ({ description, amount, date }) => {

    const expensePressHandler = () => {

    }
    return (

      <Pressable
        onPress={expensePressHandler} style={({ pressed }) => pressed && styles.pressed}>
        <View style={styles.expenseItem}>
          <View >
            <Text style={[styles.textBase, styles.description]}>{description}</Text>
            <Text style={[styles.textBase]}>{getFormatterDate(date)}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>{amount.toFixed(2)}</Text>
          </View>
        </View>
      </Pressable>
    );
  }

export default ExpenseItem

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
  },

  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  }

})