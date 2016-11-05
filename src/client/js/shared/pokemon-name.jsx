import React from 'react';

class PokemonName extends React.Component {
  render() {
    return (
      <div className="pokemonName">
        <span>{this.props.name}#{this.props.number}</span>
      </div>
    );
  }
}

PokemonName.propTypes = {
  name: React.PropTypes.string.isRequired,
  number: React.PropTypes.string.isRequired
};

export default PokemonName;
