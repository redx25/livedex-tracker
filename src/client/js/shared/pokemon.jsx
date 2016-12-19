import React from 'react';
import IPropTypes from 'immutable-props';
import PokemonName from './pokemon-name.jsx';

class Pokemon extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.source === 'dex') {
      this.props.onClick(this.props.mon.get('name'));
    }
  }

  render() {
    return (
      <div className={`pokemon ${this.props.status}`} onClick={this.handleClick}>
        <PokemonName
          name={this.props.mon.get('name')}
          number={this.props.mon.get('number')}
          />
        <div className={`pkspr pkmn-${this.props.mon.get('number')}`} />
      </div>
    );
  }
}

Pokemon.defaultProps = {
  status: 'none'
};

Pokemon.propTypes = {
  mon: IPropTypes.Seq.isRequired,
  status: React.PropTypes.string,
  source: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
};

export default Pokemon;
