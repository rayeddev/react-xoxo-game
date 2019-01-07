import React, { Component } from "react";
import TapSquare from "./TapSquare";

export default class AutoSwitchStep extends Component {
  constructor() {
    super();

    this.squateBooked = this.squateBooked.bind(this);
    this.handelManualChange = this.handelManualChange.bind(this);

    this.state = {
      squares: [
        { key: "tap_1", mode: "none", booked: false, xy: [0, 0] },
        { key: "tap_2", mode: "none", booked: false, xy: [1, 0] },
        { key: "tap_3", mode: "none", booked: false, xy: [2, 0] },
        { key: "tap_4", mode: "none", booked: false, xy: [0, 1] },
        { key: "tap_5", mode: "none", booked: false, xy: [1, 1] },
        { key: "tap_6", mode: "none", booked: false, xy: [2, 1] },
        { key: "tap_7", mode: "none", booked: false, xy: [0, 2] },
        { key: "tap_8", mode: "none", booked: false, xy: [1, 2] },
        { key: "tap_9", mode: "none", booked: false, xy: [2, 2] }
      ],

      playerA: {
        squaresX: "",
        squaresY: ""
      },
      playerB: {
        squaresX: "",
        squaresY: ""
      },

      activePlayer: ["A", "B"][Math.floor(Math.random() * 2)],
      singleExmaple: {
        booked: false
      }
    };
  }

  squateBooked(key) {
    this.setState(prv => {
      return {
        ...prv,
        activePlayer: prv.activePlayer === "A" ? "B" : "A",
        squares: prv.squares.map((square, i) => {
          if (square.key === key) {
            square.booked = true;
            square.mode = this.state.activePlayer === "A" ? "X" : "O";
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
        activePlayer: ["A", "B"][Math.floor(Math.random() * 2)],
        squares: prv.squares.map((square, i) => {
          square.booked = false;

          return square;
        })
      };
    });
  }

  handelManualChange(e) {
    //  this.setState({ activePlayer: e.target.value });
  }

  render() {
    return (
      <div align="left">
        <button
          style={{ fontSize: 14, marginBottom: "10px" }}
          onClick={() => {
            this.reset();
          }}
        >
          Reset
        </button>
        <div>
          <span>
            <input
              type="radio"
              value="A"
              onChange={this.handelManualChange}
              checked={this.state.activePlayer === "A"}
            />
            Player A
          </span>
          <span style={{ marginLeft: "40px" }}>
            <input
              type="radio"
              value="B"
              onChange={this.handelManualChange}
              checked={this.state.activePlayer === "B"}
            />
            Player B
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexFlow: "row",
            flexWrap: "wrap",
            maxWidth: 92 * 3 + 3 * 6,
            marginTop: "10px"
          }}
        >
          {this.state.squares.map((square, i) => {
            return (
              <TapSquare
                key={square.key}
                mode={
                  square.booked
                    ? square.mode
                    : this.state.activePlayer === "A"
                    ? "X"
                    : "O"
                }
                onTapped={
                  square.booked ? null : () => this.squateBooked(square.key)
                }
                booked={square.booked}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
