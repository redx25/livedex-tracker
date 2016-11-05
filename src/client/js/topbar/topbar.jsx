import React from 'react';
import GenSelector from './gen-selector.jsx';

class Topbar extends React.Component {
  render() {
    return (
      <div id="topbar">
        <GenSelector onGenClick={this.props.onGenClick} />
      </div>
    );
  }
}

Topbar.propTypes = {
  onGenClick: React.PropTypes.func.isRequired
};

export default Topbar;
