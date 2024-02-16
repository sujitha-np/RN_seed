import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Counter from './src/counter/Counter.screen';
import {useCounterStore} from './src/counter/zustand/Store';
import Reanimated from './src/reanimted/Reanimated.screens';
import DocumentSearch from './src/documentSearch/DocumentSearch.Screen';
import Doc from './src/doc/doc.Document';

const App = () => {
  // const getPokemons = useCounterStore(state => state.fetchPokemon);
  // const pokemonList = useCounterStore(state => state.pokemon);
  // useEffect(() => {
  //   getPokemons();
  // }, [getPokemons]);
  return (
    <View>
      <DocumentSearch />
    </View>
  );
};

export default App;
