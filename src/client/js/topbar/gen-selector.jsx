import React from 'react';
import {gens} from '../shared/constants';
import Gen from './gen.jsx';

class GenSelector extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  renderGens() {
    return (
      gens.entrySeq().map(([gen, games]) => {
        return (<Gen
          key={gen}
          games={games}
          gen={parseInt(gen.replace(/\D/g, ''), 10)}
          onClick={this.props.onGenClick}
          />
        );
      })
    );
  }

  render() {
    return (
      <div id="genSelector">
        {this.renderGens()}
      </div>
    );
  }
}

GenSelector.propTypes = {
  onGenClick: React.PropTypes.func.isRequired
};

export default GenSelector;
