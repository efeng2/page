# Q-Learning in MDPs
2025-03-03

## Q-Learning
Q-learning is having a Q-table that learns according to a defined learning rate which action in a state could lead to greater rewards for the agent. It learns by trying different actions over and over again until it learns which action can lead to greater awards.

Q-Learning Equation:

$$
Q_{k+1}(s, a) = (1-\alpha) Q_k(s, a) + \alpha (R(s,a,s') + \gamma max_{a'} Q_k(s', a'))
$$

Where:

$s$ - state
$a$ - action
$s'$ - new state
$r$ - reward

$\gamma$ - discount factor
$\alpha$ - learning rate


