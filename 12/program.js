const { input, testInput } = require("./input");

let startNodes = [];
let endNode = "";

const findStartAndEndIndexes = (graph) => {
  for (let y = 0; y < graph.length; y++) {
    for (let x = 0; x < graph[y].length; x++) {
      if (graph[y][x] === "S" || graph[y][x] === "a") {
        startNodes.push(y * 10000 + x);
        graph[y][x] = "a";
      }
      if (graph[y][x] === "E") {
        endNode = y * 10000 + x;
        graph[y][x] = "z";
      }
    }
  }
};

const getLinksForNode = (x, y, graph, links) => {
  if (y * 10000 + x === endNode) return links;

  if (x > 0 && graph[y][x - 1].charCodeAt(0) - graph[y][x].charCodeAt(0) < 2) {
    const edgeNode = y * 10000 + x - 1;
    if (!links[y * 10000 + x].includes(edgeNode)) links[y * 10000 + x].push(edgeNode);
  }
  if (y > 0 && graph[y - 1][x].charCodeAt(0) - graph[y][x].charCodeAt(0) < 2) {
    const edgeNode = (y - 1) * 10000 + x;
    if (!links[y * 10000 + x].includes(edgeNode)) links[y * 10000 + x].push(edgeNode);
  }
  if (x < graph[y].length - 1 && graph[y][x + 1].charCodeAt(0) - graph[y][x].charCodeAt(0) < 2) {
    const edgeNode = y * 10000 + x + 1;
    if (!links[y * 10000 + x].includes(edgeNode)) links[y * 10000 + x].push(edgeNode);
  }
  if (y < graph.length - 1 && graph[y + 1][x].charCodeAt(0) - graph[y][x].charCodeAt(0) < 2) {
    const edgeNode = (y + 1) * 10000 + x;
    if (!links[y * 10000 + x].includes(edgeNode)) links[y * 10000 + x].push(edgeNode);
  }
  return links;
};

const parseLinks = (graph) => {
  let links = {};
  for (let y = 0; y < graph.length; y++) {
    for (let x = 0; x < graph[y].length; x++) {
      links[y * 10000 + x] = [];
      links = getLinksForNode(x, y, graph, links);
    }
  }
  return links;
};


const traverseGraph = (links, startNbr, shortestPathToEnd) => {
  let visitedNodes = [startNodes[startNbr]];
  let nodesToVisit = links[startNodes[startNbr]];
  let nextNodesToVisit = [];
  let steps = 0;
  while (!visitedNodes.includes(endNode) && nodesToVisit.length !== 0) {
    for (let i = 0; i < nodesToVisit.length; i++) {
      for (let j = 0; j < links[nodesToVisit[i]].length; j++) {
        if (
          !visitedNodes.includes(links[nodesToVisit[i]][j]) &&
          !nextNodesToVisit.includes(links[nodesToVisit[i]][j])
        ) {
          nextNodesToVisit.push(links[nodesToVisit[i]][j]);
        }
      }
      visitedNodes.push(nodesToVisit[i]);
    }
    nodesToVisit = nextNodesToVisit;
    nextNodesToVisit = [];
    steps++;
    if (steps >= shortestPathToEnd)
      return steps;
  }
  if (visitedNodes.includes(endNode)) return steps;
  else return Infinity;
};

const getLengthOfShortestPath = (input) => {
  const graph = input.split("\n").map((line) => line.split(""));
  findStartAndEndIndexes(graph);
  const links = parseLinks(graph);
  let shortestPathToEnd = Infinity;
  for (let startNbr = 0; startNbr < startNodes.length; startNbr++) {
    let pathLength = traverseGraph(links, startNbr, shortestPathToEnd);
    shortestPathToEnd = pathLength < shortestPathToEnd ? pathLength : shortestPathToEnd;
  }
  return shortestPathToEnd;
};

console.log("test input:", getLengthOfShortestPath(testInput));
startNodes = [];
endNode = "";
console.log("actual input:", getLengthOfShortestPath(input));
