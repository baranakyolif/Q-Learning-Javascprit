

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

Video: https://www.youtube.com/watch?v=DROpXmoNjKM 

HTML and CSS Structure:

The page has a structure that includes a menu bar, control buttons and a maze play area.
The menu bar offers various links and is located at the top of the page.
In the centre of the page, there is a canvas element and this is the area where the maze game will be visually displayed.
It also contains buttons for controlling the game (start, stop, continue) and timer indicators.
Q-Learning Algorithm with JavaScript:

A maze and an agent (Lemy) are drawn on the canvas element.

------------------------------------------------------------------------------------------------------

# Loading Old Values: (Page2)

In this step, you can reload the data that you have previously trained and downloaded to the agent and enable it to make decisions in the light of this information.  
### Impacts
Acceleration of the Learning Process:

### Existing Q-Values:  
When previously trained Q-values are loaded, they provide access to information that your agent has already learnt. This can speed up the learning process because the agent will do new learning based on existing Q-values.
### Starting Knowledge:  
The training process can progress much faster than starting from scratch. With these Q-values, the agent continues to learn using existing knowledge and can make more informative actions instead of random actions at the beginning.
### Accuracy of Decisions:  

Improved Performance: If the Q-values in the CSV file are accurate and informative, the agent can make better decisions. This allows it to make more accurate and effective movements based on the knowledge acquired in the previous training.  
### Effect of Old Knowledge:  
However, old Q-values may in some cases not be valid in the current environment. If there have been significant changes in the environment (e.g. new actions or rewards), the old values may adversely affect the agent's decisions.
### Impact of Training:  

Improved Learning: Installed Q-values can speed up the learning process and allow you to achieve good results more quickly. However, if there are new environmental factors or changes, the agent must adapt to these factors.
### Achieving Balance:  
When learning using old Q-values, it is important to also update Q-values in new situations. This ensures that both old information and new data are taken into account.  

### Summary  
If the old Q-values are valid and accurate, the new training process can often be faster and more effective because the agent can use the previously learnt information.
However, if the old data are incompatible with current situations, then the agent may have difficulty adapting to new environmental changes.
The Q-Learning algorithm is applied to update the agent's Q-values and select the best actions:
getQ(state, action): Returns the Q-value according to the given state and action.
updateQ(state, action, reward, nextState): Updates the Q-values.
getBestAction(state): Selects the action with the highest Q-value.
chooseAction(state): Selects the action using the Epsilon-greedy strategy.
The game moves the agent through the maze and the agent gains experience and learns by navigating the maze.
