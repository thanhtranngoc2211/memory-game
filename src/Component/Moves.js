import React, { useState, Component } from "react";

class MovesCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  incrementMove() {
    this.setState(
      {
        count: this.state.count + 1,
      },
      () => {
        console.log(this.state.count);
      }
    );
  }

  render() {
    return <div className="moves">Moves: {this.state.count}</div>;
  }
}

export default MovesCount;