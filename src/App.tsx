import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Snackbar from 'react-native-snackbar';
import {currencyByTaka} from './constants';
import CurrencyButton from './components/CurrencyButton';

export default function App(): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const covertCurrency = (targetValue: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Please enter a value.',
        textColor: '#fff',
        backgroundColor: '#EA7773',
      });
    }

    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`;
      setResultValue(result);
      setTargetCurrency(targetValue.name);
    } else {
      Snackbar.show({
        text: 'Please enter a valid number.',
        textColor: '#fff',
        backgroundColor: '#EA7773',
      });
    }
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <ScrollView>
        <View>
          <Text style={styles.headingText}>Currency Converter</Text>
        </View>

        <View style={styles.topCOntainer}>
          <Text style={styles.currencyText}>BDT</Text>
          <TextInput
            placeholder="Enter Amount"
            placeholderTextColor={'#fff'}
            keyboardType="numeric"
            style={styles.inputField}
            value={inputValue}
            onChangeText={value => setInputValue(value)}
          />
        </View>
        {resultValue ? (
          <Text style={styles.resultText}>{resultValue}</Text>
        ) : null}

        <View style={styles.buttonContainer}>
          <FlatList
            numColumns={3}
            data={currencyByTaka}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <Pressable onPress={() => covertCurrency(item)} style={[styles.countryButton, targetCurrency==item.name && styles.selected]}>
                <CurrencyButton {...item} />
              </Pressable>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#000325',
    height: '100%',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  inputField: {
    width: '70%',
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    color: '#fff',
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  currencyText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  topCOntainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },
  resultText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  countryButton: {
    width: '30%',
    height: 100,
    backgroundColor: '#000325',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    borderColor: '#000679',
    borderWidth: 1,
  },
  selected: {
    borderColor: '#fff',
    borderWidth: 2,
  },
});
