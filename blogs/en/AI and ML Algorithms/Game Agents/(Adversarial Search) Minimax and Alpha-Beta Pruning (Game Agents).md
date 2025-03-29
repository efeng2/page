# **Adversarial Search: Minimax and Alpha-Beta Pruning for Game Agents**  
2025-02-07

Adversarial search is a fundamental technique in game-playing AI, where two opposing players—Max and Min—compete to optimize their respective objectives. The Minimax algorithm and its optimization through Alpha-Beta pruning allow agents to make strategic decisions efficiently.  

## **Minimax Algorithm**  

- The game consists of two players: **Max** and **Min**.  
- The **Max** player aims to maximize the evaluation function, while the **Min** player seeks to minimize it.  
- The game tree alternates between **Max layers** and **Min layers**.  
- The **Max player** starts at the root node and selects moves that lead to the highest possible evaluation.  
- The **Min player** responds by choosing moves that minimize the evaluation, counteracting Max’s advantage.  
- The process continues recursively until reaching terminal states or a predefined search depth.  

## **Alpha-Beta Pruning**  

During minimax search, if we pass in a alpha value and a beta value to each node of out tree, we can reduce the amount of nodes evaluated.

- It maintains two values:  
  - **Alpha**: The best value the Max player can guarantee so far.  
  - **Beta**: The best value the Min player can guarantee so far.  
- If a node's value is worse than an already known alternative (Alpha passes Beta or Beta passes Alpha), it is **pruned** (ignored) to save computation.  

Algorithm details:
- Assume a tree depth of 3. Alpha value of $-\infty$ and beta $+\infty$ is passed into the first leaf node. if the leaf node is attached to a max node, update alpha, otherwise, update beta. after searching all the leaf nodes of this max/min node, alpha and beta are passed back up to the root node, if the root node is a max player, set the alpha value to the previous beta value, otherwise, do the opposite. Whenever alpha passes beta, prune the next nodes.

## **Zobrist Hashing**  

Zobrist Hashing is a technique used for efficiently storing and retrieving game states in transposition tables:  

- Assigns a unique hash value to each board position using randomly generated bitstrings.  
- Allows quick lookup of previously explored positions to avoid redundant calculations.  
- Enhances performance in adversarial search by reusing evaluations of identical board states encountered through different move sequences.  