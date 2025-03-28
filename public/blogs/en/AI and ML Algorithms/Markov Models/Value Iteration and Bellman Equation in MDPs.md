# Value Iteration and Bellman Equation in MDPs
2025-02-25

Value Iteration is one way of finding the best action to take from a state to get from a state to the goal state.

### Bellman Equations 
Update Equation 

$$
V_{\pi}(s) = 0 \text{ if } s \in \text{Goal}, \quad \min_{a} Q_{\pi}(s, a) \text{ otherwise}
$$

$$
Q_{\pi}(s, a) = \sum_{s'} T(s, a, s') \times (R(s,a,s') + \gamma V(s'))
$$

## Dynamic Programming  

Used to solve MDPs efficiently through:  

### Value Iteration  
- Initialize $ V_0 $ arbitrarily ($ V=0 $ for goal states, $ V=100 $ otherwise).  
- Iterate until max residual ($ \delta $) < $ \epsilon $: 

$$
  V_n = V_{n+1}
$$ 

### Python Implementation  

Below is a implementation of Value iteration
[Link](https://www.geeksforgeeks.org/implement-value-iteration-in-python/) 