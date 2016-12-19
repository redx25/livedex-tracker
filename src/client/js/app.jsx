import React from 'react';
import {Seq, Map, List} from 'immutable';
import Topbar from './topbar/topbar.jsx';
import Dex from './dex/dex.jsx';
import RouteInfo from './routeInfo/route-info.jsx';
import PokemonInfo from './pokemonInfo/pokemon-info.jsx';

const pokemon = new Seq({
  Bulbasaur: new Seq({
    name: 'Bulbasaur',
    number: '001',
    gen: 1
  }),
  Ivysaur: new Seq({
    name: 'Ivysaur',
    number: '002',
    gen: 1
  }),
  Venusaur: new Seq({
    name: 'Venusaur',
    number: '003',
    gen: 1
  }),
  Chikorita: new Seq({
    name: 'Chikorita',
    number: '152',
    gen: 2
  })
});

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      gen: 1,
      pokemonStatus: new Map(),
      pokemonInfo: new Map({open: false}),
      routeInfo: new Map({open: false})
    };

    this.state = this.loadStateFromLocalStorage();

    this.handleGenClick = this.handleGenClick.bind(this);
    this.handlePokemonClick = this.handlePokemonClick.bind(this);
  }

  loadStateFromLocalStorage() {
    let newState = {};

    for (const key in this.state) {
      if (!this.state.hasOwnProperty(key)) {
        continue;
      }

      if (localStorage.getItem(key)) {
        let value = JSON.parse(localStorage.getItem(key));

        if (value === null) {
          continue;
        } else if (value instanceof Object && Array.isArray(value)) {
          value = new List(value);
        } else if (value instanceof Object) {
          value = new Map(value);
        }

        newState[key] = value;
      } else {
        newState[key] = this.state[key];
      }
    }

    return newState;
  }

  setState(change) {
    for (const key in change) {
      if (change.hasOwnProperty(key)) {
        localStorage.setItem(key, JSON.stringify(change[key]));
      }
    }

    super.setState(change);
  }

  handleGenClick(newGen) {
    this.setState({gen: newGen});
  }

  handlePokemonClick(key) {
    const pokemonStatus = this.state.pokemonStatus;
    let status = 'none';

    if (pokemonStatus.has(key)) {
      status = pokemonStatus.get(key);
    }

    switch (status) {
      case 'none':
        status = 'have';
        break;
      case 'have':
        status = 'pre';
        break;
      case 'pre':
      default:
        status = 'none';
    }

    this.setState({pokemonStatus: pokemonStatus.set(key, status)});
  }

  render() {
    return (
      <div id="app">
        <Topbar onGenClick={this.handleGenClick} />
        <div id="contentBox">
          <Dex
            pokemon={pokemon}
            pokemonStatus={this.state.pokemonStatus}
            gen={this.state.gen}
            onPokemonClick={this.handlePokemonClick}
            />
          <RouteInfo open={this.state.routeInfo.get('open')} />
          <PokemonInfo open={this.state.pokemonInfo.get('open')} />
        </div>
      </div>
    );
  }
}
