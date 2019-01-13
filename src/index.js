import React, { Component } from "react";
import ReactDOM from "react-dom";
import TapSquare from "./TapSquare";
import PlaygroundStep from "./playground-step";
import ManuelPlayersStep from "./manuelplayers-step";
import AutoSwitchStep from "./autoSwitch-step";
import WinnerDetectStep from "./winnerDetect-step";
import "./styles.css";

export class App extends Component {
  constructor() {
    super();

    this.squateBooked = this.squateBooked.bind(this);
    this.handelManualChange = this.handelManualChange.bind(this);

    this.state = {
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
            square.booked = this.state.activePlayer;
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
                  booked:
                    prv.singleExmaple.booked === "none" ? "anyPlayer" : "none"
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
        <ManuelPlayersStep />

        <h3 align="left">3) Auto Switch between two players (modes)</h3>
        <AutoSwitchStep />
        <h3 align="left">4) Detect the winner and the game over status</h3>
        <WinnerDetectStep size={4} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
