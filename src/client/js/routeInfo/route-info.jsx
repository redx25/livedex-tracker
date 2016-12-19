import React from 'react';

class RouteInfo extends React.Component {
  render() {
    return (
      <div id="routeInfo" className={this.props.open ? 'open' : 'closed'} />
    );
  }
}

RouteInfo.propTypes = {
  open: React.PropTypes.bool.isRequired
};

export default RouteInfo;
