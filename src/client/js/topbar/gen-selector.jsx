import React from 'react';
import {gens} from '../shared/constants';
import Gen from './gen.jsx';

class GenSelector extends React.PureComponent {
  renderGens() {
    return (
      gens.entrySeq().map(([gen, games]) => {
        return (<Gen
          key={gen}
          games={games}
          gen={parseInt(gen, 10)}
          onClick={this.props.onGenClick}
          selectedGen={this.props.selectedGen}
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
  onGenClick: React.PropTypes.func.isRequired,
  selectedGen: React.PropTypes.number.isRequired
};

export default GenSelector;
