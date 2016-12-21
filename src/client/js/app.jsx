import React from 'react';
import {Map, List} from 'immutable';
import Topbar from './topbar/topbar.jsx';
import Dex from './dex/dex.jsx';
import RouteInfo from './routeInfo/route-info.jsx';
import PokemonInfo from './pokemonInfo/pokemon-info.jsx';
import pokemon from './shared/pokemon-data';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);

    // Set defaults for state
    // Something needs to be set here for it to load for local storage later
    this.state = {
      gen: 1,
      pokemonStatus: new Map(),
      pokemonInfo: new Map({open: false}),
      routeInfo: new Map({open: false})
    };

    this.state = this.loadStateFromLocalStorage();

    // Binds for functions passed down through props
    this.handleGenClick = this.handleGenClick.bind(this);
    this.handlePokemonClick = this.handlePokemonClick.bind(this);
  }

  loadStateFromLocalStorage() {
    let newState = {};

    // Take all the keys from the state and look for saves from local storage
    for (const key in this.state) {
      if (!this.state.hasOwnProperty(key)) {
        continue;
      }

      if (localStorage.getItem(key)) {
        let value = JSON.parse(localStorage.getItem(key));

        // Change parsed JSON to Immutable.js types where relevent
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

  // Overload of setState to save the changes to local storage for later load
  // May (?) cause state changes to be slightly slower due to synchronous write to
  // Local Storage
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
    const pokemonStatus = this.state.pokemonStatus; // Alias for brevity
    let status = 'none';

    if (pokemonStatus.has(key)) {
      status = pokemonStatus.get(key);
    }

    // Rotate between status
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
        <Topbar
          onGenClick={this.handleGenClick}
          selectedGen={this.state.gen}
          />
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
