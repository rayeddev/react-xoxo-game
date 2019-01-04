import React, { Component } from "react";
import ReactDOM from "react-dom";
import TapSquare from "./TapSquare";

import "./styles.css";

export default class PlaygroundStep extends Component {
  constructor() {
    super();

    this.squateBooked = this.squateBooked.bind(this);

    this.state = {
      squares: [
        { key: "tap_1", mode: "none", booked: false },
        { key: "tap_2", mode: "none", booked: false },
        { key: "tap_3", mode: "none", booked: false },
        { key: "tap_4", mode: "none", booked: false },
        { key: "tap_5", mode: "none", booked: false },
        { key: "tap_6", mode: "none", booked: false },
        { key: "tap_7", mode: "none", booked: false },
        { key: "tap_8", mode: "none", booked: false },
        { key: "tap_9", mode: "none", booked: false }
      ],

      singleExmaple: {
        booked: false
      }
    };
  }

  squateBooked(key) {
    this.setState(prv => {
      return {
        ...prv,
        squares: prv.squares.map((square, i) => {
          if (square.key === key) {
            square.booked = true;
          }

          return square;
        })
      };
    });
  }

  reset() {
    this.setState(prv => {
      return {
        ...prv,
        squares: prv.squares.map((square, i) => {
          square.booked = false;

          return square;
        })
      };
    });
  }

  render() {
    return (
      <div align="left">
        <button
          style={{ fontSize: 14 }}
          onClick={() => {
            this.reset();
          }}
        >
          Reset
        </button>
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            flexWrap: "wrap",
            maxWidth: 92 * 3 + 3 * 6,
            paddingTop: 10
          }}
        >
          {this.state.squares.map((square, i) => {
            return (
              <TapSquare
                key={square.key}
                mode="x"
                onTapped={() => this.squateBooked(square.key)}
                booked={square.booked}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
