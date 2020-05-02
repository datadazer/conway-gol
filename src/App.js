import React from 'react';
import { Stage, Layer, Text } from 'react-konva';
import Grid from './components/grid/grid.component';
import './App.css';

function App() {
  return (
    <div className="App">
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Grid />
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
