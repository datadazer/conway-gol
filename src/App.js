import React from 'react';
import { Stage, Layer, Text } from 'react-konva';
import Cell from './components/cell/cell.component';
import './App.css';

function App() {
  return (
    <div className="App">
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Cell />
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
