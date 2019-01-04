import React, { Component } from "react";
import ReactDOM from "react-dom";
import TapSquare from "./TapSquare";
import PlaygroundStep from "./playground-step";

import "./styles.css";

export class App extends Component {
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

      activePlayer: "A",
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
            square.mode = this.state.activePlayer === "A" ? "X" : "O";
          }

          return square;
        })
      };
    });
  }

  handelManualChange(e) {
    this.setState({ activePlayer: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <h1>React Example of simple XOXO game</h1>

        <h2 align="left">Explaining Game Logic</h2>
        <ul align="left">
          <li>Two Players</li>
          <li>Randomly picking starting player</li>
          <li>Player A (X) mode</li>
          <li>Player B (O) mode</li>
          <li>
            Winner who can make three conected squres by straight line with same
            shape
          </li>
          <li>Player can't tap on reserved squares</li>
          <li>Game should switch shape mode according to active player</li>
          <li>game can be configured for tapping timeout</li>
        </ul>
        <h2>Lets start with tapping square</h2>

        <h3 align="left">1) Implementing TapSquare Component</h3>

        <TapSquare
          mode="x"
          onTapped={() =>
            this.setState(prv => {
              return {
                singleExmaple: {
                  booked: !prv.singleExmaple.booked
                }
              };
            })
          }
          booked={this.state.singleExmaple.booked}
        />

        <h3 align="left">
          2) Generate playground array of tabSquare Components
        </h3>

        <PlaygroundStep />

        <h3 align="left">2) Manual Switch between two players (modes)</h3>

        <div align="left">
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

        <h3 align="left">3) Auto Switch between two players (modes)</h3>
        <span>Soon ... </span>
        <h3 align="left">4) Detect the winner and the game over status</h3>
        <span>Soon ... </span>
        <h3 align="left">5) Make player round timeout </h3>
        <span>Soon ... </span>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
