# Bayes Nets (Event Independence and Joint Probability Distributions)
2025-02-25

## Joint Distributions

Chain Rule:
$ P(A, B, C) = P(A) P(B| A) P(C| A, B)$

## Bayes Net Structure

Joint Distribution:
- States without arrows are marginals.
- States arrow to depend on states where the arrow is from

$$
P(A)P(B|A)P(C)P(D|B,C)
$$

## D-Separation
Method of determining the conditionally independence of event A and B given the condition that other variables are observed

How to use D-Separation [here](http://github.efeng2.io/page/blog/AI%20and%20ML%20Algorithms/Markov%20Models/Markov%20Decision%20Processes)

<!-- #(A) = 2
#(B) = 3
#(C) = 3
#(D) = 2

#(P(A,B,C,D)) = 2 \times 3 \times 3 \times 2

#(P(B|A)) = 2 \times 3

#(P(D|B,C)) = 2 \times 3 \times 3 -->



