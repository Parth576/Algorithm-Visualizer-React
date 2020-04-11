import React, { useState, useEffect } from "react";
import Node from "./Node";
import "./Grid.css";
import { dijkstra } from "../algorithms/dijkstra";

let startingRow = 10;
let startingCol = 15;
let finishRow = 10;
let finishCol = 40;

const createGrid = () => {
  let g = [];
  for (let i = 0; i < 20; i++) {
    let row = [];
    for (let j = 0; j < 65; j++) {
      row.push(createNode(i, j));
    }
    g.push(row);
  }
  return g;
};

const createNode = (row, col) => {
  return {
    row: row,
    col: col,
    isStart: row === startingRow && col === startingCol,
    isFinish: row === finishRow && col === finishCol,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const toggleWalls = (g, r, c) => {
  let newGrid = g;
  let node = newGrid[r][c];
  let newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[r][c] = newNode;
  return newGrid;
};

const Grid = () => {
  const [grid, updateGrid] = useState([]);
  const [mousePress, setMousePress] = useState(false);

  useEffect(() => {
    updateGrid(createGrid());
  }, []);

  const clearGrid = () => {
    updateGrid(createGrid());
  };

  const onMouseDown = (row, col) => {
    let newGrid = toggleWalls(grid, row, col);
    updateGrid(newGrid);
    setMousePress(true);
  };

  const onMouseEnter = (row, col) => {
    if (!mousePress) return;
    let newGrid = toggleWalls(grid, row, col);
    updateGrid(newGrid);
  };

  const onMouseUp = () => {
    setMousePress(false);
  };

  // const animateShortestPath = (shortestPath) => {};
  const animateAlgo = (visitedNodes) => {
    for (let i = 0; i < visitedNodes.length; i++) {
      setTimeout(() => {
        // if (i === visitedNodes.length) {
        //   setTimeout(() => animateShortestPath(shortestPath));
        //   return;
        // }
        let eachVisitedNode = visitedNodes[i];
        let newGrid = grid;
        let newVisitedNode = {
          ...eachVisitedNode,
          isVisited: true,
        };
        newGrid[eachVisitedNode.row][eachVisitedNode.col] = newVisitedNode;
        console.log("grid state updated");
      }, 10 * i);
    }
  };

  const visualize = (grid) => {
    let startNode = grid[startingRow][startingCol];
    let finishNode = grid[finishRow][finishCol];
    let visitedNodes = dijkstra(grid, startNode, finishNode);
    // let shortestPath = getShortestPath(finishNode);
    animateAlgo(visitedNodes);
  };

  return (
    <>
      <button onClick={() => visualize(grid)}>
        Visualize Dijkstra's Algorithm
      </button>
      <button onClick={() => clearGrid()}>Reset Grid</button>
      <div className="grid">
        {grid.map((row, rowId) => {
          return (
            <div key={rowId}>
              {row.map((node, nodeId) => {
                const { row, col, isStart, isFinish, isWall, isVisited } = node;
                return (
                  <Node
                    key={nodeId}
                    row={row}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    isVisited={isVisited}
                    mouseIsPressed={mousePress}
                    mouseDown={(row, col) => onMouseDown(row, col)}
                    mouseEnter={(row, col) => onMouseEnter(row, col)}
                    mouseUp={() => onMouseUp()}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Grid;
