import React, { Component } from 'react';
import { Rect } from 'react-konva';

const Cell = props => (
  <Rect
    x={props.posX}
    y={props.posY}
    width={8}
    height={8}
    fill={props.color}
  />
);

export default Cell;
