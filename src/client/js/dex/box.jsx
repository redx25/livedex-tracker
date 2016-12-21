import React from 'react';
import IPropTypes from 'immutable-props';
import Pokemon from '../shared/pokemon.jsx';

class Box extends React.PureComponent {
  renderPokemon() {
    return (
      this.props.pokemon.map(mon => {
        return (
          <Pokemon
            key={mon.get('number')}
            mon={mon}
            status={this.props.pokemonStatus.get(mon.get('name'))}
            source="dex"
            onClick={this.props.onPokemonClick}
            />
        );
      })
    );
  }

  renderAlignmentHelpers() {
    let helpers = [];

    for (let i = 0; i < this.props.boxSize; i++) {
      helpers.push(<div className="alignmentHelper" key={i} />);
    }

    return helpers;
  }

  render() {
    return (
      <div className="box">
        <h2>Box {this.props.box}: #{
          this.props.pokemon.first().get('number')}-#{
          this.props.pokemon.last().get('number')}</h2>
        <div className="pokemonContainer">
          {this.renderPokemon()}
          {this.renderAlignmentHelpers()}
        </div>
      </div>
    );
  }
}

Box.propTypes = {
  box: React.PropTypes.number.isRequired,
  boxSize: React.PropTypes.number.isRequired,
  pokemon: IPropTypes.List.isRequired,
  pokemonStatus: IPropTypes.Map.isRequired,
  onPokemonClick: React.PropTypes.func.isRequired
};

export default Box;
