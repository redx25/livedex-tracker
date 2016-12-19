import React from 'react';
import IPropTypes from 'immutable-props';
import Pokemon from '../shared/pokemon.jsx';

class Dex extends React.PureComponent {
  renderPokemon() {
    return (
      this.props.pokemon.valueSeq().filter(mon => {
        return mon.get('gen') <= this.props.gen;
      }).map(mon => {
        return (<Pokemon
          key={mon.get('number')}
          mon={mon}
          status={this.props.pokemonStatus.get(mon.get('name'))}
          source="dex"
          onClick={this.props.onPokemonClick}
          />);
      })
    );
  }

  render() {
    return (
      <div id="dex">
        <div id="pokemonContainer">
          {this.renderPokemon()}
        </div>
      </div>
    );
  }
}

Dex.propTypes = {
  pokemon: IPropTypes.Seq.isRequired,
  pokemonStatus: IPropTypes.Map.isRequired,
  gen: React.PropTypes.number.isRequired,
  onPokemonClick: React.PropTypes.func.isRequired
};

export default Dex;
