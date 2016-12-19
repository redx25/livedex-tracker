import React from 'react';
import InfoTop from '../shared/info-top.jsx';

class PokemonInfo extends React.PureComponent {
  render() {
    return (
      <div id="pokemonInfo" className={this.props.open ? 'open' : 'closed'}>
        <InfoTop />
      </div>
    );
  }
}

PokemonInfo.propTypes = {
  open: React.PropTypes.bool.isRequired
};

export default PokemonInfo;
