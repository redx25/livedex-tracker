import React from 'react';

class PokemonImage extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="pokemonImage">
        <span className={`pkspr pkmn-${this.props.number}`} />
      </div>
    );
  }
}

PokemonImage.propTypes = {
  number: React.PropTypes.string.isRequired
};

export default PokemonImage;
