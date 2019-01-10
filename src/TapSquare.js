import React, { Component } from "react";

export default class TapSquare extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={"tapSquare" + (this.props.won ? " wonSquare" : "")}
        onClick={this.props.onTapped}
      >
        {this.props.booked !== "none" && (
          <h1 style={{ flex: 100, fontStyle: "italic", textAlign: "center" }}>
            {this.props.mode}
          </h1>
        )}
      </div>
    );
  }
}
