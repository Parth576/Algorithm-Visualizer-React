const getAllNodes = (grid) => {
  let allNodes = [];
  for (let row of grid) {
    for (let node of row) {
      allNodes.push(node);
    }
  }
  return allNodes;
};

const updateDistance = (grid, currentNode) => {
  let neighbours = [];
  let r = currentNode.row;
  let c = currentNode.col;
  if (r > 0) neighbours.push(grid[r - 1][c]);
  if (r < 19) neighbours.push(grid[r + 1][c]);
  if (c > 0) neighbours.push(grid[r][c - 1]);
  if (c < 64) neighbours.push(grid[r][c + 1]);

  for (let v of neighbours) {
    v.distance = currentNode.distance + 1;
    v.previousNode = currentNode;
  }
};

export const dijkstra = (grid, startNode, finishNode) => {
  let visitedNodes = [];
  startNode.distance = 0;
  let allNodes = getAllNodes(grid);
  while (allNodes.length !== 0) {
    allNodes.sort((node1, node2) => node1.distance - node2.distance);
    let currentNode = allNodes.shift();
    if (currentNode.isWall) continue;
    if (currentNode.distance === Infinity) return visitedNodes;
    visitedNodes.push(currentNode);
    if (currentNode === finishNode) return visitedNodes;
    updateDistance(grid, currentNode);
  }
};

export const getShortestPath = (finishNode) => {
  let shortestPath = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    shortestPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return shortestPath;
};
