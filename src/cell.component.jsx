import React, { Component } from 'react';
import { Rect } from 'react-konva';
import Konva from 'konva';

class Cell extends Component {
  constructor() {
    super();

    this.state = {
      color: 'red',
    }
  }
  handleClick = () => {
    this.setState({
      color: this.toggleColor()
    });
  };

  toggleColor() {
    let color = this.state.color;

    if (color === 'red') {
      color = 'white';
    } else {
      color = 'red';
    }

    return color;
  }

  render() {
    return (
      <Rect
        x={20}
        y={20}
        width={50}
        height={50}
        fill={this.state.color}
        onClick={this.handleClick}
      />
    );
  }
}

export default Cell;
