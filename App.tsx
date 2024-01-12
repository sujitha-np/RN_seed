import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Counter from './src/Counter/Counter.screen';
import {useCounterStore} from './src/Counter/zustand/Store';

const App = () => {
  const getPokemons = useCounterStore(state => state.fetchPokemon);
  const pokemonList = useCounterStore(state => state.pokemon);
  useEffect(() => {
    getPokemons();
  }, [getPokemons]);
  return (
    <View>
      <Text>HGHUKJ</Text>
      {pokemonList?.map(item => {
        return <Text key={item.name}>{item.name}</Text>;
      })}

      <Counter />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});


// rn template,typescript,
// zustant state management,axios,
// fastlane,github actions for dev builds,
// unit testing,eslint (air bnb rules),
// reanimated,react native skia,code push,
// dark mode/loght mode,localization
// languages english,arabic
