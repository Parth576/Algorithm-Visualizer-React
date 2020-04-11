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
    : isVisited
    ? "node-visited"
    : "";
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => mouseDown(row, col)}
      onMouseEnter={() => mouseEnter(row, col)}
      onMouseUp={() => mouseUp()}
    ></div>
  );
};

export default Node;
