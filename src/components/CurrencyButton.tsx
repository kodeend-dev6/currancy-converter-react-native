import {StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';


type CurrencyButtonProps = PropsWithChildren<{
  name: string;
  flag: string;
}>;

export default function CurrencyButton(
  props: CurrencyButtonProps,
): JSX.Element {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.flag}>{props.flag}</Text>
      <Text style={styles.name}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
  },
    flag: {
        fontSize: 40,
        color: '#fff',
    },
    name: {
        fontSize: 12,
        color: '#fff',
    },
});
