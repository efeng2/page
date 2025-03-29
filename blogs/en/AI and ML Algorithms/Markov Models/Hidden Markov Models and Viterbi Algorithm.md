# Hidden Markov Models and Viterbi Algorithm
2025-03-01

## Hidden Markov Model

## Viterbi Algorithm

Competes proabaility of the trellis diagram.

It is sometimes used for part-of-speech classification of sentences

Algorithm details:
- Create two tables, one for phase transitions probabilities and one for class probability.
- Draw a trellis diagram connecting the nodes to their possible transitions.
- Calculate the probability of each node by multiplting the probability of the previous node by the transition probability and the class probability.
- Usually the start node has a probability of one because it is given.

## Stationary Proability

$$
P_{\infty}(A) = P(A_2 | A_1) P_{\infty}(A) + P(A_2 | B_1) P_{\infty}(B)
$$

$$
P_{\infty}(B) = 1 - P_{\infty}(A)
$$