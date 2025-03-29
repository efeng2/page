# Math in Deep Learning and Large Language Models
2025-03-09

Prequisites: [Preceptrons](http://github.efeng2.io/page/blog/AI%20and%20ML%20Algorithms/Markov%20Models/Preceptrons)

## FeedForward Neural Network

## Hidden Node Input Activation

### Sigmoid Activation Function
- continuous and differentiable
- derivative gets
closer and closer to zero as the magnitude of the input increases, which can can cause a gradient descent algorithm to take
a very long time to converge.

$g_1(h) = \frac{1}{(1+e^h)}$

### Rectified Linear Unit (ReLU)

- continuous and sub-differentiable

$g_3(h) = max(0,h)$

### Softmax

- Joint probabilities of words, used in generatve LLMs to find out the next most probable phrase.
- From 0 to 1

More about softmax in LLMs [here](N-Layer Neural Network)