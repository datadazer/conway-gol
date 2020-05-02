import React, { Component } from 'react';
import { Group } from 'react-konva';
import Cell from '../cell/cell.component';

class Grid extends Component {
  constructor() {
    super();

    this.state = {
      size: 10,
      cells: [],
    }
  }

  generateCells() {
    let cells = [];
    for (let i = 0; i < this.state.size; i++) {
      for (let j = 0; j < this.state.size; j++) {
        let cell = {};
        cell.id = i * 10 + j;
        cell.posX = j * 22 + 22;
        cell.posY = i * 22 + 22;
        cells.push(cell);
      }
    }

    this.setState({cells: cells});
  }

  componentDidMount() {
    this.generateCells();
  }

  render() {
    return (
      <Group>
        {this.state.cells.map(cell => (
          <Cell posX={cell.posX} posY={cell.posY} color='#333333'/>
        ))}
      </Group>
    );
  }
}

export default Grid;