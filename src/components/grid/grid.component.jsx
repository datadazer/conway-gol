import React, { Component } from 'react';
import { Group } from 'react-konva';
import Cell from '../cell/cell.component';

class Grid extends Component {
  constructor() {
    super();

    this.state = {
      size: 100,
      cells: [],
      generation: 0,
    }
  }

  generateCells(useRandomSeed) {
    let cells = [];
    for (let i = 0; i < this.state.size; i++) {
      let cellsRow = [];
      for (let j = 0; j < this.state.size; j++) {
        let cell = {};
        let isAlive = false;
        cell.id = i * 5 + j;
        cell.posX = j * 7 + 7;
        cell.posY = i * 7 + 7;

        if (useRandomSeed && Math.random() > 0.6) {
          isAlive = true;
        }
        cell.isAlive = isAlive;
        cell.color = this.assignCellColor(cell.isAlive);
        cellsRow.push(cell);
      }
      cells.push(cellsRow);
    }

    /*** Glider ***/
    // cells[1][2].isAlive = true;
    // cells[1][2].color = this.assignCellColor(cells[1][2].isAlive);
    // cells[2][3].isAlive = true;
    // cells[2][3].color = this.assignCellColor(cells[2][3].isAlive);
    // cells[3][1].isAlive = true;
    // cells[3][1].color = this.assignCellColor(cells[3][1].isAlive);
    // cells[3][2].isAlive = true;
    // cells[3][2].color = this.assignCellColor(cells[3][2].isAlive);
    // cells[3][3].isAlive = true;
    // cells[3][3].color = this.assignCellColor(cells[3][3].isAlive);

    this.setState({cells: cells});
  }

  assignCellColor(cellIsAlive) {
    let color = "#333333";
    if (cellIsAlive) {
      color = "#ffffff";
    }
    return color;
  }

  countAliveNeighbors(row, col) {
    //check tl, tc, tr, l, r, bl, bc, br

    // Note to self: left off at ignoring out of bounds values
    let cells = this.state.cells;
    let aliveNeighborsCount = 0;

    //top middle
    if (row > 0) {
      if (cells[row - 1][col].isAlive) {
        aliveNeighborsCount++;
      }
    }

    //top left
    if (row > 0 && col > 0) {
      if (cells[row - 1][col - 1].isAlive) {
        aliveNeighborsCount++;
      }
    }

    //top right
    if (row > 0 && col < cells[row].length - 1) {
      if (cells[row - 1][col + 1].isAlive) {
        aliveNeighborsCount++;
      }
    }

    //left
    if (col > 0) {
      if (cells[row][col - 1].isAlive) {
        aliveNeighborsCount++;
      }
    }

    //right
    if (col < cells[row].length - 1) {
      if (cells[row][col + 1].isAlive) {
        aliveNeighborsCount++;
      }
    }

    //bottom middle
    if (row < cells.length - 1) {
      if (cells[row + 1][col].isAlive) {
        aliveNeighborsCount++;
      }
    }

    //bottom right
    if (row < cells.length - 1 && col < cells[row].length - 1) {
      if (cells[row + 1][col + 1].isAlive) {
        aliveNeighborsCount++;
      }
    }

    //bottom left
    if (row < cells.length - 1 && col > 0) {
      if (cells[row + 1][col - 1].isAlive) {
        aliveNeighborsCount++;
      }
    }

    return aliveNeighborsCount;
  }

  play() {
    let debugTimerStart = performance.now();
    let debugTimerEnd;
    let cells = this.state.cells;
    let cellsGen2 = [];
    // Any live cell with two or three live neighbors survives.
    // Any dead cell with three live neighbors becomes a live cell.
    // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
    cells.forEach((cellsRow, row) => {
      let cellsRowGen2 = [];
      cellsRow.forEach((cell, col) => {
        let cellGen2 = {};
        let neighborCount = this.countAliveNeighbors(row, col);
        cellGen2.id = cell.id;
        cellGen2.posX = cell.posX;
        cellGen2.posY = cell.posY;
        cellGen2.isAlive = cell.isAlive;

        if (cell.isAlive && (neighborCount < 2 || neighborCount > 3)) {
          cellGen2.isAlive = false;
        } else if (!cell.isAlive && neighborCount === 3) {
          cellGen2.isAlive = true;
        }
        cellGen2.color = this.assignCellColor(cellGen2.isAlive);
        cellsRowGen2.push(cellGen2);
      });
      cellsGen2.push(cellsRowGen2);
    });

    this.setState({
      cells: cellsGen2,
      generation: this.state.generation + 1
    });
    debugTimerEnd = performance.now();
    console.log(`play() took: ${debugTimerEnd - debugTimerStart}`);
  }

  componentDidMount() {
    this.generateCells(true);
    this.interval = setInterval(() => this.play(), 10);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Group>
        {this.state.cells.map(row => (
          row.map(cell => (
            <Cell posX={cell.posX} posY={cell.posY} color={cell.color}/>
          ))
        ))}
      </Group>
    );
  }
}

export default Grid;