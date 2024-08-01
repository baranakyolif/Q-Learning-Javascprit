In this step, you can reload the data that you have previously trained and downloaded to the agent and enable it to make decisions in the light of this information.  
 

Code: 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maze Game with Q-Learning</title>
</head>
<body>
    <canvas id="mazeCanvas" style="border:1px solid #000;"></canvas>
    <div>
        <button id="startBtn">Start</button>
        <button id="stopBtn">Stop</button>
        <button id="resumeBtn">Resume</button>
        <button id="downloadCsvBtn">Download CSV</button>
        <input type="file" id="uploadCsv" accept=".csv">
        <label for="speedSlider">Speed:</label>
        <input type="range" id="speedSlider" min="1" max="100" value="10">
        <span id="speedValue">10 ms</span>
    </div>
    <script>
        const canvas = document.getElementById('mazeCanvas');
        const ctx = canvas.getContext('2d');
        const tileSize = 20;
        const mazeWidth = 40 * tileSize;
        const mazeHeight = 30 * tileSize;
        canvas.width = mazeWidth;
        canvas.height = mazeHeight;

        
 const maze = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,1,1],
            [1,0,1,1,1,0,1,1,1,1,0,0,0,0,0,0,1,1,0,1,1,0,1,0,1,0,0,0,1,1,0,0,1,0,0,1,0,1,1],
            [1,0,1,0,0,0,1,0,1,0,1,1,0,0,1,0,1,0,0,1,1,0,0,1,1,0,0,0,0,0,0,1,1,0,0,1,0,0,1],
            [1,0,0,1,0,1,1,1,0,0,0,0,1,0,1,0,0,0,1,1,1,0,1,0,1,0,0,1,1,0,1,1,0,1,1,1,0,0,1],
            [1,0,0,1,0,0,1,0,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,0,0,0,1,1,1,0,0,1,1],
            [1,1,0,0,1,0,0,1,1,0,0,1,1,0,0,1,0,1,0,0,0,1,0,1,1,0,0,0,1,1,0,1,1,0,0,0,1,0,1],
            [1,0,0,1,1,1,0,0,0,0,1,1,0,1,0,0,0,1,1,0,1,0,1,0,1,0,0,1,1,1,0,0,0,0,0,0,0,1,1],
            [1,1,0,1,1,1,0,1,1,1,1,1,0,1,0,0,0,1,0,0,0,1,0,1,1,1,1,1,0,1,0,1,0,0,1,1,0,1,1],
            [1,1,0,0,1,0,1,1,0,0,1,0,1,0,0,0,0,1,1,0,0,0,1,1,0,1,0,1,0,0,1,0,1,1,1,0,1,1,1],
            [1,1,0,1,0,0,0,1,1,1,1,1,1,0,0,0,0,1,0,1,0,1,1,1,0,0,1,1,0,1,1,1,0,1,1,0,1,1,1],
            [1,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,1,0,1,1,1,0,0,0,0,1,1,1],
            [1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,1,0,0,1,0,0,1,0,1,1,0,1,1,1],
            [1,1,1,1,0,0,0,0,1,1,0,1,1,1,1,0,0,0,0,0,0,1,1,1,0,1,0,0,0,1,1,1,0,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,1,1,1,0,0,0,0,0,0,0,1,1,0,1,0,0,1,1,1,0,1,1,1],
            [1,1,0,1,1,0,0,0,1,1,0,0,1,1,0,1,1,1,0,1,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,0,1],
            [1,0,1,0,1,0,1,1,0,1,0,0,1,1,1,0,1,1,0,1,0,0,0,1,1,1,0,0,0,1,1,0,1,0,0,1,1,0,1],
            [1,0,1,1,1,0,1,1,0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,1,0,1,1,1,0,0,0,0,1,1,1],
            [1,0,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,0,0,0,1,1,0,0,0,1,0,0,1,0,0,1,0,1,1,0,1,1,1],
            [1,1,1,1,0,0,0,0,1,1,1,1,1,0,1,1,0,1,0,0,0,1,1,1,0,1,0,0,0,1,1,1,0,1,1,1,1,1,1],
            [1,0,0,0,1,1,0,0,1,0,1,0,1,0,0,0,1,1,1,0,1,0,0,0,0,0,1,1,0,1,0,0,1,1,1,0,1,1,1],
            [1,1,0,0,1,0,0,0,1,1,1,0,1,1,0,0,1,1,0,1,0,0,0,1,1,0,0,1,0,0,1,1,1,1,1,1,1,0,1],
            [1,0,1,0,1,0,1,0,0,1,0,0,1,1,1,0,1,1,0,1,0,0,0,1,1,1,0,0,0,1,1,0,1,0,0,1,1,0,1],
            [1,0,1,0,0,1,1,1,0,0,0,1,1,1,1,0,1,1,0,1,1,1,1,1,0,0,0,1,0,0,1,1,0,0,0,0,1,1,1],
            [1,0,0,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,1,0,0,0,0,1,1,0,1,1,1],
            [1,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,0,1,0,0,0,1,1,1,0,0,0,0,0,0,0],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,1,1,0,1,0,0,1,1,1,0,1,0,1],
            [1,1,0,0,0,1,0,0,1,1,1,0,1,1,0,1,1,1,0,1,0,0,0,1,1,0,0,1,0,0,1,1,1,1,1,1,1,0,1],
            [1,0,1,0,0,0,1,1,0,1,0,0,1,1,1,0,1,1,0,1,0,0,0,1,1,1,0,0,0,1,1,0,1,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] 
        ];


        const agent = {
            x: 1 * tileSize,
            y: 1 * tileSize,
            size: tileSize,
            color: 'blue',
            reward: 0,
        };

        const goal = {
            x: 39 * tileSize,
            y: 1 * tileSize,
            size: tileSize,
            color: 'red'
        };

        const Q = {};
        const alpha = 0.1; // Learning rate
        const gamma = 0.9; // Discount factor
        const epsilon = 0.1; // Exploration rate
        let intervalId;
        let intervalTime = 10; // Default update interval

        function getQ(state, action) {
            if (!Q[state]) Q[state] = {};
            if (Q[state][action] === undefined) Q[state][action] = 0;
            return Q[state][action];
        }

        function updateQ(state, action, reward, nextState) {
            const maxNextQ = Math.max(...Object.values(Q[nextState] || {}), 0);
            const oldQ = getQ(state, action);
            Q[state] = Q[state] || {};
            Q[state][action] = oldQ + alpha * (reward + gamma * maxNextQ - oldQ);
        }

        function getBestAction(state) {
            const actions = ['up', 'down', 'left', 'right'];
            const actionValues = actions.map(action => getQ(state, action));
            const maxQ = Math.max(...actionValues);
            const bestActions = actions.filter((action, index) => actionValues[index] === maxQ);
            return bestActions[Math.floor(Math.random() * bestActions.length)];
        }

        function chooseAction(state) {
            if (Math.random() < epsilon) {
                const actions = ['up', 'down', 'left', 'right'];
                return actions[Math.floor(Math.random() * actions.length)];
            }
            return getBestAction(state);
        }

        function getState(x, y) {
            return `${Math.floor(x / tileSize)},${Math.floor(y / tileSize)}`;
        }

        function moveAgent(action) {
            const prevX = agent.x;
            const prevY = agent.y;
            if (action === 'up') agent.y -= tileSize;
            if (action === 'down') agent.y += tileSize;
            if (action === 'left') agent.x -= tileSize;
            if (action === 'right') agent.x += tileSize;

            if (agent.x < 0) agent.x = 0;
            if (agent.y < 0) agent.y = 0;
            if (agent.x >= mazeWidth) agent.x = mazeWidth - tileSize;
            if (agent.y >= mazeHeight) agent.y = mazeHeight - tileSize;

            const cellX = Math.floor(agent.x / tileSize);
            const cellY = Math.floor(agent.y / tileSize);

            if (maze[cellY][cellX] === 1) {
                agent.x = prevX;
                agent.y = prevY;
                return -1; // Penalty for hitting a wall
            }
            if (agent.x === goal.x && agent.y === goal.y) {
                return 10; // Reward for reaching the goal
            }
            return 0; // Neutral step
        }

        function update() {
            const state = getState(agent.x, agent.y);
            const action = chooseAction(state);
            const reward = moveAgent(action);
            const nextState = getState(agent.x, agent.y);
            updateQ(state, action, reward, nextState);
            draw();
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = agent.color;
            ctx.fillRect(agent.x, agent.y, agent.size, agent.size);

            ctx.fillStyle = goal.color;
            ctx.fillRect(goal.x, goal.y, goal.size, goal.size);

            for (let y = 0; y < maze.length; y++) {
                for (let x = 0; x < maze[y].length; x++) {
                    if (maze[y][x] === 1) {
                        ctx.fillStyle = 'black';
                        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
                    }
                }
            }
        }

        function gameLoop() {
            update();
            draw();
        }

        document.getElementById('startBtn').addEventListener('click', () => {
            if (!intervalId) {
                intervalId = setInterval(gameLoop, intervalTime); // Set based on update speed
            }
        });

        document.getElementById('stopBtn').addEventListener('click', () => {
            clearInterval(intervalId);
            intervalId = null;
        });

        document.getElementById('resumeBtn').addEventListener('click', () => {
            if (!intervalId) {
                intervalId = setInterval(gameLoop, intervalTime); // Resume game
            }
        });

        document.getElementById('downloadCsvBtn').addEventListener('click', () => {
            const csvRows = [];
            csvRows.push(['State', 'Action', 'Q-Value']);
            for (const state in Q) {
                for (const action in Q[state]) {
                    csvRows.push([state, action, Q[state][action]]);
                }
            }
            const csvContent = csvRows.map(e => e.join(",")).join("\n");
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', 'q_values.csv');
            link.click();
        });

        document.getElementById('speedSlider').addEventListener('input', (event) => {
            intervalTime = event.target.value;
            document.getElementById('speedValue').textContent = `${intervalTime} ms`;
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = setInterval(gameLoop, intervalTime); // Set new update speed
            }
        });

        // Handle CSV upload to load Q-values
        document.getElementById('uploadCsv').addEventListener('change', function (event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function (e) {
                const text = e.target.result;
                const lines = text.split('\n');
                lines.shift(); // Remove header

                lines.forEach(line => {
                    const [state, action, qValue] = line.split(',');
                    if (state && action && qValue) {
                        if (!Q[state]) Q[state] = {};
                        Q[state][action] = parseFloat(qValue);
                    }
                });

                alert('Q-values loaded from CSV.');
            };

            reader.readAsText(file);
        });

        // Initially stop the game
        document.getElementById('stopBtn').click(); 
    </script> 
</body>
</html>
