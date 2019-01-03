import React, { Component } from "react";
import ReactDOM from "react-dom";
import TapSquare from "./TapSquare";

import "./styles.css";

export class App extends Component {
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

  render() {
    return (
      <div className="App">
        <h1>React sample of simple XOXO game</h1>

        <h2 align="left">Explaining Game Logic</h2>
        <ul align="left">
          <li>Two Players</li>
          <li>Rondamly picking starting player</li>
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

        <div
          style={{
            display: "flex",
            flexFlow: "row",
            flexWrap: "wrap",
            maxWidth: 92 * 3 + 3 * 6
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

        <h3 align="left">2) Manual Switch between two players (modes)</h3>

        <h3 align="left">3) Auto Switch between two players (modes)</h3>

        <h3 align="left">4) Detect the winner and the game over status</h3>

        <h3 align="left">5) Make player round timeout </h3>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
