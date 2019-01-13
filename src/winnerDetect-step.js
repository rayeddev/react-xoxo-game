import React, { Component } from "react";
import TapSquare from "./TapSquare";

export default class WinnerDetectStep extends Component {
  constructor(props) {
    super(props);

    this.squareBooked = this.squareBooked.bind(this);
    this.handelManualChange = this.handelManualChange.bind(this);

    this.squaresPerRow = this.props.size;
    this.gameOn = true;

    this.state = {
      squares: [],
      activePlayer: ["A", "B"][Math.floor(Math.random() * 2)]
    };
  }

  squaresIncludes(square, squares) {
    return squares.some(item => {
      return square.x === item.x && square.y === item.y;
    });
  }

  testPath(homeSquare, squares, testFunc) {
    var nextSquare = homeSquare;

    let path = [];
    while (nextSquare) {
      if (this.squaresIncludes(nextSquare, squares)) {
        path.push(nextSquare);
      }
      nextSquare = testFunc(nextSquare);
    }

    return path;
  }

  nextX(square) {
    if (square.x === this.squaresPerRow) {
      return null;
    }
    return { ...square, x: square.x + 1 };
  }
  nextY(square) {
    console.log("nextY ...");
    if (square.y === this.squaresPerRow) {
      return null;
    }

    return { ...square, y: square.y + 1 };
  }
  nextXY(square) {
    console.log("nextXY ...");
    if (square.x === this.squaresPerRow) {
      return null;
    }

    return { ...square, x: square.x + 1, y: square.y + 1 };
  }
  nextCrossXY(square) {
    console.log("nextXCrossXY ...");
    if (square.x === 1) {
      return null;
    }

    return { ...square, x: square.x - 1, y: square.y + 1 };
  }

  squareBooked(tappedSquare) {
    var winingSquares = [];
    let activePlayerSquares = this.state.squares.filter(square => {
      if (square.booked === this.state.activePlayer) {
        return square;
      }
    });
    activePlayerSquares.push(tappedSquare);

    if (activePlayerSquares.length >= this.squaresPerRow) {
      let borderSquares = activePlayerSquares.filter(square => {
        if (square.x === 1 || square.y === 1) {
          return square;
        }
      });
      console.log("border squares ", borderSquares.length);
      if (
        borderSquares.length > 0 &&
        activePlayerSquares.length >= this.squaresPerRow
      ) {
        var path = [];

        for (var i = 0; i < borderSquares.length; i++) {
          let borderSquare = borderSquares[i];

          if (borderSquare.x === this.squaresPerRow && borderSquare.y === 1) {
            path = this.testPath(
              borderSquare,
              activePlayerSquares,
              this.nextCrossXY.bind(this)
            );
            if (path.length === this.squaresPerRow) {
              winingSquares = path;
              break;
            }
          }
          if (borderSquare.x === 1 && borderSquare.y === 1) {
            path = this.testPath(
              borderSquare,
              activePlayerSquares,
              this.nextXY.bind(this)
            );
            if (path.length === this.squaresPerRow) {
              winingSquares = path;
              break;
            }
          }

          if (borderSquare.x === 1) {
            path = this.testPath(
              borderSquare,
              activePlayerSquares,
              this.nextX.bind(this)
            );
            if (path.length === this.squaresPerRow) {
              winingSquares = path;
              break;
            }
          }

          if (borderSquare.y === 1) {
            path = this.testPath(
              borderSquare,
              activePlayerSquares,
              this.nextY.bind(this)
            );
            if (path.length === this.squaresPerRow) {
              winingSquares = path;
              break;
            }
          }
        }
      }
    }

    this.gameOn = winingSquares.length === 0;

    this.setState(prv => {
      return {
        ...prv,
        activePlayer: prv.activePlayer === "A" ? "B" : "A",
        squares: prv.squares.map((square, i) => {
          if (square.index === tappedSquare.index) {
            square.booked = prv.activePlayer;
            square.mode = prv.activePlayer === "A" ? "X" : "O";
          }

          square.won = this.squaresIncludes(square, winingSquares);
          return square;
        })
      };
    });
  }

  reset() {
    this.gameOn = true;
    let totalSquares = this.squaresPerRow * this.squaresPerRow;
    let squares = Array.from(new Array(totalSquares), (obj, index) => {
      return {
        index: index + 1,
        mode: "none",
        won: false,
        booked: "none",
        x: (index % this.squaresPerRow) + 1,
        y: Math.floor(index / this.squaresPerRow) + 1
      };
    });

    this.setState(prv => {
      return {
        ...prv,
        activePlayer: ["A", "B"][Math.floor(Math.random() * 2)],
        squares: squares
      };
    });
  }

  handelManualChange(e) {
    //  this.setState({ activePlayer: e.target.value });
  }

  componentWillMount() {
    this.reset();
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
            maxWidth: 92 * this.squaresPerRow + this.squaresPerRow * 6,
            marginTop: "10px"
          }}
        >
          {this.state.squares.map((square, i) => {
            return (
              <TapSquare
                key={square.index}
                mode={square.mode}
                won={square.won}
                onTapped={
                  square.booked === "none" && this.gameOn
                    ? () => this.squareBooked(square)
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
