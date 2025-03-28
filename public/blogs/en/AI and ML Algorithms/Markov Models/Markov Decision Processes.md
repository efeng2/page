# Markov Decision Processes  
2025-03-03

## Markov Models  

Markov models help reason about sequential data by incorporating time or space into probability models.  

### Examples  
- Speech recognition  
- Robot localization  
- User attention tracking  
- Medical monitoring  

At time $ t $ the system is in state $ S_t $ governed by:  

$$
P(S_1) P(S_t | S_{t-1})
$$

- Transition probabilities: Define how states evolve.  
- Stationarity assumption: Probabilities remain constant over time.  
- No action choice (unlike MDPs).  

### Joint Distribution  

$$
P(S_1, S_2, ..., S_T) = P(S_1) \prod_{t=2}^{T} P(S_t | S_{t-1})
$$

---

## Markov Decision Processes (MDPs)  

An MDP extends Markov models by incorporating actions and rewards:  

- States $ s \in S $ (e.g., location of a robot).  
- Actions $ a \in A $ (e.g., driving a car).  
- Transition function $ T(s, a, s') $ (e.g., traffic affects arrival time).  
- Reward function $ R(s, a, s') $ (e.g., arriving early = +20).  
- Policy $ \pi(s) \to a $: Maps states to actions.  
- Value function $ V_{\pi}(s) $: Measures long-term rewards from a state.  

### Calculation

Value(s) -> Reward can get after x moves - transition reward.

With Discount Factor -> $G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3}$

How to find best path with Bellman Equation and Value Iteration [here](http://github.efeng2.io/page/blog/AI%20and%20ML%20Algorithms/Markov%20Models/Markov%20Decision%20Processes)
