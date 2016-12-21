import React from 'react';
import {List} from 'immutable';
import IPropTypes from 'immutable-props';
import {boxSizes} from '../shared/constants';
import Box from './box.jsx';

class Dex extends React.PureComponent {
  renderBoxes() {
    let outList = new List();
    let boxCounter = 0;
    let boxSize = boxSizes.get(this.props.gen);

    let boxPokemon = this.props.pokemon.toList()
      .filter(mon => {
        return mon.get('gen') <= this.props.gen;
      }).skip(boxCounter++ * boxSize)
      .take(boxSize);

    while (boxPokemon.size > 0) {
      outList = outList.push(
        <Box
          key={boxCounter}
          box={boxCounter}
          boxSize={boxSize}
          pokemon={boxPokemon}
          pokemonStatus={this.props.pokemonStatus}
          onPokemonClick={this.props.onPokemonClick}
          />
      );

      boxPokemon = this.props.pokemon.toList()
      .filter(mon => {
        return mon.get('gen') <= this.props.gen;
      }).skip(boxCounter++ * boxSize)
      .take(boxSize);
    }

    return outList;
  }

  render() {
    return (
      <div id="dex">
        <div id="boxContainer">
          {this.renderBoxes()}
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
