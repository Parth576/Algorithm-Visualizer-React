import React, { useState, useEffect } from "react";
import Node from "./Node";
import "./Grid.css";
import { dijkstra, getShortestPath } from "../algorithms/dijkstra";

let startingRow = 10;
let startingCol = 15;
let finishRow = 10;
let finishCol = 40;
let editValue = "";

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
    isShortest: false,
  };
};

const toggleWalls = (g, r, c) => {
  console.log("walls are being toggled");
  let newGrid = g.slice();
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
  const [startFinish, setStartFinish] = useState(false);

  useEffect(() => {
    updateGrid(createGrid());
  }, []);

  const clearGrid = () => {
    updateGrid(createGrid());
  };

  const toggleStartFinish = (g, r, c, isStart, isFinish) => {
    console.log("start or finish is being toggled");
    let newGrid = g.slice();
    let currentNode = g[r][c];
    if (editValue === "start") {
      startingRow = r;
      startingCol = c;
      let newNode = {
        ...currentNode,
        isStart: !currentNode.isStart,
      };
      newGrid[r][c] = newNode;
      return newGrid;
    } else if (editValue === "finish") {
      finishRow = r;
      finishCol = c;
      let newNode = {
        ...currentNode,
        isFinish: !currentNode.isFinish,
      };
      newGrid[r][c] = newNode;
      return newGrid;
    }
  };

  const onMouseDown = (row, col, isStart, isFinish) => {
    console.log("onMouseDown is called");
    console.log(grid[row][col]);
    console.log(grid[row][col].isStart);
    console.log(isStart);
    if (startFinish) {
      let newGrid = toggleStartFinish(grid, row, col, isStart, isFinish);
      updateGrid(newGrid);
      setStartFinish(false);
    } else {
      if (isStart) {
        editValue = "start";
        let newGrid = toggleStartFinish(grid, row, col, isStart, isFinish);
        updateGrid(newGrid);
        setStartFinish(true);
      } else if (isFinish) {
        editValue = "finish";
        let newGrid = toggleStartFinish(grid, row, col, isStart, isFinish);
        updateGrid(newGrid);
        setStartFinish(true);
      } else {
        let newGrid = toggleWalls(grid, row, col);
        updateGrid(newGrid);
        setMousePress(true);
      }
    }
  };

  const onMouseEnter = (row, col, isStart, isFinish) => {
    console.log("onMouseEnter is called");
    if (startFinish) return;
    if (mousePress === false && startFinish === false) return;
    // if (startFinish) {
    //   let newGrid = toggleStartFinish(grid, row, col, isStart, isFinish);
    //   updateGrid(newGrid);
    //   return;
    // }
    let newGrid = toggleWalls(grid, row, col);
    updateGrid(newGrid);
  };

  const onMouseUp = (row, col, isStart, isFinish) => {
    console.log("onMouseUp is called");
    // if (startFinish) {
    //   let newGrid = toggleStartFinish(grid, row, col, isStart, isFinish);
    //   updateGrid(newGrid);
    //   setStartFinish(false);
    // } else setMousePress(false);
    setMousePress(false);
  };

  const animateShortestPath = (shortestPath) => {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        let shortestNode = shortestPath[i];
        let shortestGrid = grid.slice();
        let newShortestNode = {
          ...shortestNode,
          isShortest: true,
        };
        shortestGrid[shortestNode.row][shortestNode.col] = newShortestNode;
        updateGrid(shortestGrid);
      }, 5 * i);
    }
  };

  const animateAlgo = (visitedNodes, shortestPath) => {
    for (let i = 0; i < visitedNodes.length; i++) {
      setTimeout(() => {
        if (i === visitedNodes.length - 1) {
          animateShortestPath(shortestPath);
          return;
        }
        let eachVisitedNode = visitedNodes[i];
        let newGrid = grid.slice();
        let newVisitedNode = {
          ...eachVisitedNode,
          isVisited: true,
        };
        newGrid[eachVisitedNode.row][eachVisitedNode.col] = newVisitedNode;
        updateGrid(newGrid);
      }, 5 * i);
    }
  };

  const visualize = (grid) => {
    let startNode = grid[startingRow][startingCol];
    let finishNode = grid[finishRow][finishCol];
    let visitedNodes = dijkstra(grid, startNode, finishNode);
    let shortestPath = getShortestPath(finishNode);
    animateAlgo(visitedNodes, shortestPath);
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
                const {
                  row,
                  col,
                  isStart,
                  isFinish,
                  isWall,
                  isVisited,
                  isShortest,
                } = node;
                return (
                  <Node
                    key={nodeId}
                    row={row}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    isVisited={isVisited}
                    isShortest={isShortest}
                    mouseIsPressed={mousePress}
                    mouseDown={(row, col, isStart, isFinish) =>
                      onMouseDown(row, col, isStart, isFinish)
                    }
                    mouseEnter={(row, col, isStart, isFinish) =>
                      onMouseEnter(row, col, isStart, isFinish)
                    }
                    mouseUp={(row, col, isStart, isFinish) =>
                      onMouseUp(row, col, isStart, isFinish)
                    }
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
