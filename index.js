## Attention! This system only saves penalty points as training data. I will upload the codes related to reward points soon.   
### I prepared these codes for a few students who are interested in data science to explain the working logic of the qlearning algorithm.  
### Since it is an introductory code, the purpose here is to give the logic of the model rather than training the model. Although the codes are a good skeleton for daily life applications, they should be customised.

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Q-Learning Labyrinth | WHAT IF THE MIND</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: auto; /* Kaydırma çubuğunu göstermek için */
            height: 100vh; /* Görünüm yüksekliği */
            font-family: Arial, sans-serif; /* Genel font ayarı */
        }

        /* Menü çubuğu stilleri */
        .menu-bar {
            background-color: #333; /* Menü çubuğu arka plan rengi */
            color: #fff; /* Menü çubuğu yazı rengi */
            padding: 10px 20px; /* İç boşluk */
            display: flex; /* Yatay düzenleme */
            justify-content: space-between; /* Menü öğeleri arasında boşluk */
            align-items: center; /* Dikey ortalama */
        }

        .menu-bar a {
            color: #fff; /* Bağlantı rengi */
            text-decoration: none; /* Alt çizgi yok */
            margin: 0 15px; /* Menü öğeleri arasındaki boşluk */
        }

        .menu-bar a:hover {
            text-decoration: underline; /* Üzerine gelindiğinde alt çizgi */
        }

        .container {
            min-height: 50vh; /* İçerik yüksekliği */
            display: flex; /* Flexbox kullanımı */
            flex-direction: row; /* Yatay hizalama */
            align-items: stretch; /* Dikeyde eşit hizalama */
            justify-content: space-between; /* İçerikler arasında eşit boşluk */
            padding: 20px; /* İç boşluk */
        }

        .text {
            flex: 1; /* Metin alanını genişletir */
            margin-right: 20px; /* Sağ kenar boşluğu */
            padding: 10px; /* İçerik boşluğu */
            border: 1px solid #ddd; /* Çerçeve rengi */
            border-radius: 5px; /* Köşe yuvarlama */
            background-color: #f9f9f9; /* Arka plan rengi */
        }

        .other-content {
            flex: 1; /* Diğer içerik alanını genişletir */
            margin-left: 20px; /* Sol kenar boşluğu */
            padding: 10px; /* İçerik boşluğu */
            border: 1px solid #ddd; /* Çerçeve rengi */
            border-radius: 5px; /* Köşe yuvarlama */
            background-color: #f9f9f9; /* Arka plan rengi */
        }

        canvas {
            background-color: #f1f2d8;
            width: 100%; /* Canvas genişliği */
            height: auto; /* Canvas yüksekliği, oranı korur */
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        table, th, td {
            border: 1px solid black;
        }

        th, td {
            padding: 8px;
            text-align: left;
        }

        button {
            padding: 10px;
            margin-right: 10px;
        }

        .slider-container label {
            margin-right: 10px;
        }

        #timer {
            font-size: 24px;
            font-family: Arial, sans-serif;
        }
        .lemy {
    text-align: center; /* Center-aligns the text horizontally */
    font-size: 16px; /* Sets a smaller font size */
    margin: 20px auto; /* Centers the div with auto margins and adds space above and below */
    padding: 0 20px; /* Adds padding on the left and right sides */
    box-sizing: border-box; /* Ensures padding does not affect the element's width */
}
    </style>
</head>
<body>
    <!-- Menü çubuğu -->
    <div class="menu-bar">
        <div class="menu-left">
            <a href="https://www.whatifthemind.com/">Home Page</a>
            <a href="https://www.whatifthemind.com/test.html">EcoLlama Project</a>
            <a href="https://www.linkedin.com/in/baran-akyol-487748275/">Linkedn</a>
        </div>
        <div class="menu-right">
            <a href="https://www.whatifthemind.com/gg.html">Company</a>
        </div>
    </div>

    <br>
    <div class="lemy"> Meet Lemy. Lemi is a simple version of artificial intelligence powered by a Q-Learning algorithm. By clicking the Start button, you can train him to traverse the maze. Using your computer's CPU, he tries and gains experience to traverse the maze. This process is based on a reward and punishment system. Each time it touches the wall of the maze, it receives a penalty point to update its experience and after a certain period of time it learns to cross the maze. You can download these training data values in CSV format, and you can upload the values again at a different time to make it pass the maze. Lemy's goal is to introduce the Q-Learning algorithm to people interested in data science and to let them experience its output.</div><br>
    <div class="container">
        <div style="height: auto; background: linear-gradient(to bottom, #fff, #f9f9f9);">
            <canvas id="mazeCanvas"></canvas>
            <div class="controls">
                <br>
                <button id="startBtn" onclick="startTimer()">Start</button>
                <button id="stopBtn" onclick="stopTimer()">Stop</button>
                <button id="resumeBtn" onclick="startTimer()">Continue</button>
                <button id="downloadCsvBtn" onclick="resetTimer()">LearningData Download (CSV)</button>
            </div>
            
            <div class="slider-container">
                <label for="speedSlider">Güncelleme Hızı (ms):</label>
                <input type="range" id="speedSlider" min="10" max="1000" value="100">
                <span id="speedValue">100 ms</span>
            </div>
            <br>
            <div id="timer">Learning Time: 0:00</div>

            <script>
                let timer;
                let seconds = 0;
                let isRunning = false;

                function startTimer() {
                    if (!isRunning) {
                        timer = setInterval(updateTime, 1000);
                        isRunning = true;
                    }
                }

                function stopTimer() {
                    clearInterval(timer);
                    isRunning = false;
                }

                function resetTimer() {
                    clearInterval(timer);
                    isRunning = false;
                    seconds = 0;
                    document.getElementById('timer').textContent = 'Time: 0:00';
                }

                function updateTime() {
                    seconds++;
                    let minutes = Math.floor(seconds / 60);
                    let secs = seconds % 60;
                    document.getElementById('timer').textContent = `Time: ${minutes}:${secs.toString().padStart(2, '0')}`;
                }
            </script>



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
            [1,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,0,1,0,0,0,1,1,1,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,1,1,0,1,0,0,1,1,1,0,1,0,1],
            [1,1,0,0,0,1,0,0,1,1,1,0,1,1,0,1,1,1,0,1,0,0,0,1,1,0,0,1,0,0,1,1,1,1,1,1,1,0,1],
            [1,0,1,0,0,0,1,1,0,1,0,0,1,1,1,0,1,1,0,1,0,0,0,1,1,1,0,0,0,1,1,0,1,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0] 
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
                let intervalTime = 10; // Varsayılan güncelleme süresi
                

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
                        intervalId = setInterval(gameLoop, intervalTime); // Güncelleme hızına göre ayarla
                    }
                });

                document.getElementById('stopBtn').addEventListener('click', () => {
                    clearInterval(intervalId);
                    intervalId = null;
                });

                document.getElementById('resumeBtn').addEventListener('click', () => {
                    if (!intervalId) {
                        intervalId = setInterval(gameLoop, intervalTime); // Devam ettir
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
        intervalId = setInterval(gameLoop, intervalTime); // Yeni güncelleme hızına göre ayarla
    }
});



                // Başlangıçta oyunu duraklatmak
                document.getElementById('stopBtn').click();
            </script>
        </div>
        <div class="text">
            <h2>How Does the Q-Learning Algorithm Work?</h2>
            <p>Q-learning is one of the reinforcement learning algorithms and enables an agent to learn from its environment. Essentially, the agent performs various actions while trying to maximize the rewards it receives from the environment. Here are the key steps of the Q-learning algorithm:</p>
            
            <h3>Agent</h3>
            <p>The agent is an entity that interacts with the environment and makes decisions. Depending on the states in its environment, it chooses various actions and receives rewards for each action. The agent's goal is to learn the best action strategy to maximize its rewards.</p>
            
            <h3>Q-Table</h3>
            <p>The Q-learning algorithm uses a Q-table to learn the action-value function. The Q-table stores the value (Q-value) for each state-action pair. These values represent the expected long-term rewards for the agent.</p>
            
            <h3>Updates</h3>
            <p>The Q-learning algorithm updates the Q-table as the agent performs actions. Updates are typically done using the following formula:</p>
            <pre><code>Q(s, a) &lt;- Q(s, a) + α * (r + γ * max(Q(s', a')) - Q(s, a))</code></pre>
            <p>Where:</p>
            <ul>
                <li><strong>Q(s, a):</strong> The current Q-value for state s and action a.</li>
                <li><strong>α:</strong> The learning rate, which determines how much new information contributes to existing knowledge.</li>
                <li><strong>r:</strong> The reward the agent receives from the current action.</li>
                <li><strong>γ:</strong> The discount factor, which determines the impact of future rewards on present rewards.</li>
                <li><strong>max(Q(s', a')):</strong> The Q-value of the best action that can be taken in the new state (s').</li>
            </ul>
            
            <h3>Update Rates</h3>
            <p>Updates in Q-learning can be fast or slow. Fast updates allow the agent to respond more quickly to changes in its environment but may cause fluctuations in Q-values. Slow updates provide a more stable learning process but can lead to longer learning times and slower responses in dynamic environments.</p>
            
            <h3>Reward and Penalty System</h3>
            <p>In Q-learning, rewards and penalties guide the learning process. A reward is given when the agent performs a desirable action or reaches a goal, encouraging the agent to repeat such actions. Conversely, a penalty is applied when the agent takes an undesired action or fails to achieve the goal, discouraging it from repeating such actions.</p>
            
            <h4>Overfitting and Generalization</h4>
            <p>Overfitting occurs when the agent's learning is too closely tied to the training environment, leading to poor performance in new or unseen environments. To prevent overfitting, it's important to balance exploration (trying new actions) and exploitation (using known actions that yield high rewards). Techniques such as adjusting the learning rate, incorporating decay strategies for exploration, and regularly evaluating the agent in diverse scenarios can help maintain generalization and prevent overfitting.</p>
            
            <h4>Additional Considerations</h4>
            <p>It's crucial to ensure that the Q-values converge to accurate estimates of long-term rewards. This can be influenced by the choice of parameters like the learning rate and discount factor. Additionally, implementing mechanisms to prevent the agent from repeatedly exploring suboptimal actions or getting stuck in local optima can further improve learning outcomes.</p>
        </div>
        
    </div>
</body>
</html>
