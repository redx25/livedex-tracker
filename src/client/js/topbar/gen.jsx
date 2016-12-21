import React from 'react';
import IPropTypes from 'immutable-props';
import {gameShort} from '../shared/constants';

class Gen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  renderGames() {
    return (
      this.props.games.map(game => {
        return (
          <span key={game} className={`top${game.replace(/\s+/g, '')}`}>
            {gameShort.get(game)}
          </span>
        );
      })
    );
  }

  handleClick() {
    this.props.onClick(this.props.gen);
  }

  render() {
    return (
      <div
        className={`gen ${this.props.gen === this.props.selectedGen ? 'selected' : ''}`}
        onClick={this.handleClick}
        >
        {this.renderGames()}
      </div>
    );
  }
}

Gen.propTypes = {
  games: IPropTypes.Seq,
  onClick: React.PropTypes.func.isRequired,
  gen: React.PropTypes.number.isRequired,
  selectedGen: React.PropTypes.number.isRequired
};

export default Gen;
