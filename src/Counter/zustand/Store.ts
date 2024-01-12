import axios from 'axios';
import {create} from 'zustand';
export const useCounterStore = create((set, get) => ({
  // number: 123,
  // increment: () => set(state => ({number: state.number + 1})),
  // decrement: () => set(state => ({number: state.number - 1})),
  counterValues: {
    // number: 123,
    // pokemon: [],
    pokemon: [],
    number: 123,
  },
  increaseCounterNumber: () =>
    set(state => ({
      counterValues: {
        ...state.counterValues,
        number: state.counterValues.number + 1,
      },
    })),
  decreaseCounterNumber: () =>
    set(state => ({
      counterValues: {
        ...state.counterValues,
        number: state.counterValues.number - 1,
      },
    })),

  logNumber: () => {
    console.log(` Current number value equals ${get().number}`);
  },
  fetchPokemon: async () => {
    // await fetch('https://pokeapi.co/api/v2/pokemon')
    //   .then(response => {
    //     console.warn('....', response);
    //   })
    //   .then(data => set({pokemon: data.results}));
    await axios.get('https://pokeapi.co/api/v2/pokemon').then(response => {
      console.warn('....', response.data.results);
    });
  },
}));
