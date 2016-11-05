import React from 'react';
import {Seq, Map} from 'immutable';
import Topbar from './topbar/topbar.jsx';
import Dex from './dex/dex.jsx';
import RouteInfo from './routeInfo/route-info.jsx';
import PokemonInfo from './pokemonInfo/pokemon-info.jsx';

const pokemon = new Seq({
  bulbasaur: new Seq({
    name: 'Bulbasaur',
    number: '001',
    gen: 1
  }),
  ivysaur: new Seq({
    name: 'Ivysaur',
    number: '002',
    gen: 1
  }),
  Venusaur: new Seq({
    name: 'Venusaur',
    number: '003',
    gen: 1
  }),
  chikorita: new Seq({
    name: 'Chikorita',
    number: '154',
    gen: 2
  })
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gen: 1,
      pokemonStatus: new Map()
    };

    this.handleGenClick = this.handleGenClick.bind(this);
    this.handlePokemonClick = this.handlePokemonClick.bind(this);
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
          <RouteInfo />
          <PokemonInfo />
        </div>
      </div>
    );
  }
}
