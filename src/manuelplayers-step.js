import React, { Component } from "react";
import TapSquare from "./TapSquare";

export default class ManuelPlayersStep extends Component {
  constructor() {
    super();

    this.squareBooked = this.squareBooked.bind(this);
    this.handelManualChange = this.handelManualChange.bind(this);

    this.squaresPerRoww = 3;

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

      activePlayer: "A"
    };
  }

  squareBooked(index) {
    this.setState(prv => {
      return {
        ...prv,
        squares: prv.squares.map((square, i) => {
          if (square.index === index) {
            square.booked = prv.activePlayer;
            square.mode = prv.activePlayer === "A" ? "X" : "O";
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

    console.log("reset ... ", this.state.squares);
  }

  handelManualChange(e) {
    this.setState({ activePlayer: e.target.value });
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
                key={square.index}
                mode={square.booked === "A" ? "X" : "O"}
                onTapped={
                  square.booked === "none"
                    ? () => this.squareBooked(square.index)
                    : null
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
