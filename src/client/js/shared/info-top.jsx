import React from 'react';

class InfoTop extends React.PureComponent {
  render() {
    return (
      <div className="infoTop">
        <div className="history">
          <div className="back">{'<-'}</div>
          <div className="forward">{'->'}</div>
        </div>
        <div className="close">{'X'}</div>
      </div>
    );
  }
}

export default InfoTop;
