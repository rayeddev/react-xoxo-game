import React, { Component } from "react";
import ReactDOM from "react-dom";
import TapSquare from "./TapSquare";

import "./styles.css";

export default class PlaygroundStep extends Component {
  constructor() {
    super();

    this.squareBooked = this.squareBooked.bind(this);

    this.state = {
      squares: [
        { index: 1, mode: "none", booked: "none" },
        { index: 2, mode: "none", booked: "none" },
        { index: 3, mode: "none", booked: "none" },
        { index: 4, mode: "none", booked: "none" },
        { index: 5, mode: "none", booked: "none" },
        { index: 6, mode: "none", booked: "none" },
        { index: 7, mode: "none", booked: "none" },
        { index: 8, mode: "none", booked: "none" },
        { index: 9, mode: "none", booked: "none" }
      ],

      singleExmaple: {
        booked: false
      }
    };
  }

  squareBooked(index) {
    this.setState(prv => {
      return {
        ...prv,
        squares: prv.squares.map((square, i) => {
          if (square.index === index) {
            square.booked = "anyPlayer";
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
          square.booked = "none";
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
                key={square.index}
                mode="x"
                onTapped={() => this.squareBooked(square.index)}
                booked={square.booked}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
