const boardCoordinates = [
    [0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],
    [1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],
    [2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],
    [3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],
    [4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],
    [5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],
    [6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6]
];

const graph = [];

for (let i = 0; i < boardCoordinates.length; i++) {
    let currentCellNeighbors = [];
    let candidateNeighbors = [
        [(boardCoordinates[i][0] + 2), (boardCoordinates[i][1] + 1)],
        [(boardCoordinates[i][0] + 2), (boardCoordinates[i][1] - 1)],
        [(boardCoordinates[i][0] - 2), (boardCoordinates[i][1] + 1)],
        [(boardCoordinates[i][0] - 2), (boardCoordinates[i][1] - 1)],
        [(boardCoordinates[i][0] + 1), (boardCoordinates[i][1] + 2)],
        [(boardCoordinates[i][0] + 1), (boardCoordinates[i][1] - 2)],
        [(boardCoordinates[i][0] - 1), (boardCoordinates[i][1] + 2)],
        [(boardCoordinates[i][0] - 1), (boardCoordinates[i][1] - 2)]       
    ]
    for (let j = 0; j < candidateNeighbors.length; j++) {
        if (candidateNeighbors[j][0] < 7 && candidateNeighbors[j][0] >= 0) {
            if (candidateNeighbors[j][1] < 7 && candidateNeighbors[j][1] >= 0) {
                currentCellNeighbors.push(candidateNeighbors[j][0] * 7 + candidateNeighbors[j][1]);
            }
        }
    }
    graph.push(currentCellNeighbors);
}

function knightMoves(start, destination){
    let queue = [];
    let marked = [];
    let visited = [];
    let parent = [];

    let mappedStart = start[0] * 7 + start[1];
    let mappedDestination = destination[0] * 7 + destination[1];
    
    parent[mappedStart]=null;
    queue.push(mappedStart);
    while (queue.length>0) {
        let currentNode = queue.shift();
        if (!marked.includes(currentNode)) {
            let x = currentNode % 7;
            let y = Math.floor(currentNode / 7);
            visited.push([x, y]);
            marked.push(currentNode);
            if (currentNode === mappedDestination) {
                let path = [];
                let curr = currentNode;
                while (curr !== null) {
                    let x = Math.floor(curr / 7);
                    let y = curr % 7;
                    path.push([x, y]);
                    curr = parent[curr];
                }
                return path.reverse();

            }
            let currentNodeNeighbors = graph[currentNode];
            for (let i = 0; i < currentNodeNeighbors.length; i++) {
                if (!marked.includes(currentNodeNeighbors[i])) {
                    queue.push(currentNodeNeighbors[i]);
                    parent[currentNodeNeighbors[i]]=currentNode;
                }
            }
        }
    }
    return visited;
}