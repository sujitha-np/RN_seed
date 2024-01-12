/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useCounterStore} from './zustand/Store';
// import { useCounterStore } from './zustand/Store';

const Counter = () => {
  const counter = useCounterStore(state => state.counterValues.number);
  const incrementCounter = useCounterStore(
    state => state.increaseCounterNumber,
  );
  const decrementCounter = useCounterStore(state => state.decreaseCounterNumber);
  return (
    <View
      style={{
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 200,
      }}>
      <Text onPress={incrementCounter}>+</Text>
      <Text style={{paddingVertical: 20}}>{counter}</Text>
      <Text onPress={decrementCounter}>-</Text>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({});
