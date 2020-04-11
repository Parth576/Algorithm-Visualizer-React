import React from "react";

import "./Node.css";

const Node = (props) => {
  const {
    row,
    col,
    isFinish,
    isStart,
    isWall,
    isVisited,
    isShortest,
    mouseDown,
    mouseEnter,
    mouseUp,
  } = props;
  let extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : isShortest
    ? "node-shortest"
    : isVisited
    ? "node-visited"
    : "";
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => mouseDown(row, col, isStart, isFinish)}
      onMouseEnter={() => mouseEnter(row, col, isStart, isFinish)}
      onMouseUp={() => mouseUp(row, col, isStart, isFinish)}
    ></div>
  );
};

export default Node;
