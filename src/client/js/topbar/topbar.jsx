import React from 'react';
import GenSelector from './gen-selector.jsx';

class Topbar extends React.PureComponent {
  render() {
    return (
      <div id="topbar">
        <GenSelector
          onGenClick={this.props.onGenClick}
          selectedGen={this.props.selectedGen}
          />
      </div>
    );
  }
}

Topbar.propTypes = {
  onGenClick: React.PropTypes.func.isRequired,
  selectedGen: React.PropTypes.number.isRequired
};

export default Topbar;
