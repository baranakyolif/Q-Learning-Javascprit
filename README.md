

# Q-Learning-Javascprit
This HTML code generates a web page showing a simple artificial intelligence agent (Lemy) trying to traverse a maze using a Q-Learning algorithm. 

In its first test, the code learnt and completed the matrix below (used for the maze representation) in 545 steps.

![mat](https://github.com/user-attachments/assets/9d0f2d65-62cf-4650-81c7-3fed79ce493c)


This code aims to give students a comprehensive understanding of artificial intelligence and machine learning using the basic Q-Learning algorithm. The tool provides users with an environment that simulates the learning process in a maze. Users can experience how the Q-Learning algorithm works and how to optimise it.
:

Educational Value: Makes it easy to understand and apply the basic principles of the Q-Learning algorithm.
Practical Experience: Provides a real-time learning and optimisation process.
Flexibility: Users can start, stop and continue the learning process.
Data Export: After the learning process is completed, the Q-values obtained can be exported in CSV format.

Limited General Use: This tool is only intended for training purposes to understand the Q-Learning algorithm and is not sufficient for general use scenarios.
Technological Requirements: The tool requires certain technological infrastructures and may create access difficulties for users who do not have these infrastructures.

Important Note: This tool is for educational purposes only and any damage or liability arising from its use is not accepted. Users should use this tool at their own risk and responsibility. This document is provided for educational purposes only and no responsibility is accepted for its use. In case of any technical problems or support needs, it is recommended to contact the relevant technical support team.

HTML and CSS Structure:

The page has a structure that includes a menu bar, control buttons and a maze play area.
The menu bar offers various links and is located at the top of the page.
In the centre of the page, there is a canvas element and this is the area where the maze game will be visually displayed.
It also contains buttons for controlling the game (start, stop, continue) and timer indicators.
Q-Learning Algorithm with JavaScript:

A maze and an agent (Lemy) are drawn on the canvas element.
The Q-Learning algorithm is applied to update the agent's Q-values and select the best actions:
getQ(state, action): Returns the Q-value according to the given state and action.
updateQ(state, action, reward, nextState): Updates the Q-values.
getBestAction(state): Selects the action with the highest Q-value.
chooseAction(state): Selects the action using the Epsilon-greedy strategy.
The game moves the agent through the maze and the agent gains experience and learns by navigating the maze.
