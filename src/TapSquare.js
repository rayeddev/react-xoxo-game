import React, { Component } from "react";

export default class TapSquare extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="tapSquare" onClick={this.props.onTapped}>
        {this.props.booked && (
          <h1 style={{ flex: 100, fontStyle: "italic", textAlign: "center" }}>
            {this.props.mode}
          </h1>
        )}
      </div>
    );
  }
}
