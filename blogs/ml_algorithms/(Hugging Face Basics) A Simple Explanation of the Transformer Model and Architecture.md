# (Hugging Face Basics) A Simple Explanation of the Transformer Model and Architecture
2024-07-22

## What is a Transformer
A Transformer is a neural network architecture based on the self-attention mechanism (Self-attention mechanism), proposed in the 2017 paper "Attention is All You Need," which brought a new model architecture to the field of Natural Language Processing (NLP). It is a type of seq2seq model (Sequence to Sequence Model).

The Transformer can tackle the task of converting an input sequence into an output sequence by learning to understand and generate text similar to human language through the analysis of large amounts of data.

Self-Attention Mechanism (Self-attention Mechanism)
Also known as Scaled Dot-Product Attention, this is a mechanism in deep learning and a core component of the Transformer neural network architecture. Attention refers to determining which word is most important in understanding the semantics based on the context, while self refers to performing attention calculations using only the input sequence without involving the output sequence.

### Natural Language Processing (Natural Language Processing)

Abbreviated as NLP, this field is an intersection of linguistics and machine learning, focusing on parsing human vocabulary, language, and their contexts.
NLP is a cross-disciplinary field focusing on understanding everything related to human language. The goal of NLP tasks is not only to understand individual words in isolation but also to understand the context in which these words are used.
Here is a list of common NLP tasks, each with some examples:

- **Classifying entire sentences**: Determining the sentiment of reviews, detecting whether an email is spam, determining if a sentence is grammatically correct, or if two sentences are logically related
- **Classifying each word in a sentence**: Identifying grammatical components (nouns, verbs, adjectives) or named entities (people, places, organizations) in a sentence
- **Generating text content**: Completing prompts with automatically generated text, filling in blanks in text with masked words
- **Extracting answers from text**: Given a question and context, extracting the answer to the question from the information provided in the context
- **Generating new sentences from input text**: Translating text into another language, summarizing text

(from Hugging Face official tutorials): 
seq2seq model (Sequence to Sequence Model)
A sequence to sequence model is an important concept in deep learning and NLP, which is a method of generating one sequence based on a given sequence in a specific way. It can also be referred to as an Encoder-Decoder model (Encoding-Decoding Model), and it is a variant of RNN (Recurrent Neural Network) n-to-m.

Recurrent Neural Network (RNN): A type of neural network where the current output is related to the previous outputs. n-to-m refers to the input sequence (n elements) to the output sequence (m elements) which can be of different lengths.

## Transformer Architecture
The transformer structure from the paper "Attention is All You Need"

The Transformer consists of an Encoder and a Decoder. The input data first enters the encoder, where it is transformed into a numerical representation for each input word, called a Feature Vector (feature vector).

Using the self-attention mechanism, it can consider the context (both left and right sides) simultaneously, thus achieving language understanding.
The simple structure is as follows: Input, six layers of Encoder and six layers of Decoder, Output

## Input Section

### Inputs

Inputs are represented as a series of words or tokens. These tokens are the basic units of text and can be words, punctuation, or any other text element (such as start and end symbols).

### Input Embedding

Each token in the input text is converted into a continuous, fixed-dimensional vector sequence. This vector can capture the semantic and syntactic information of the word and map it to a set of values (e.g., Hello -> [0.8, 0.5, 0.2, 0.2, 0.5, ...]), called word embeddings.

Each Encoder receives a list of feature vectors of fixed length d_model = 512. The lowest Encoder layer receives word embeddings, while other Encoder layers receive the output from the layer below.

### Right-Shift Outputs
The output refers to the model predicting the existing output sentence. At each time step, the model predicts the next word and adds it to the end of the output sequence.

Shifted Right involves moving the initial output sequence of the Decoder one position to the right by adding a start symbol, causing the entire sequence to shift one position to the right. This allows the model to start predicting the first word from the start symbol.

### Output Embedding
Output embedding is similar to input embedding, converting each token in the output sequence into a continuous, fixed-dimensional vector sequence. These vectors can capture the semantic and syntactic information of the words and map them to a set of values.

### Positional Encoding
Injects the position information of words in the sequence into the input embedding. When processing sequence data, the position of words is often important for understanding the meaning of a sentence. The positional encoding of the Transformer uses sin and cos functions to generate positional vectors, mapping each position to a value between -1 and 1.
  represents the position vector for even tokens, using the sin function
  represents the position vector for odd tokens, using the cos function
  represents the position of the token in the input
  represents the group number of sin/cos for positional encoding, with a total of 256 groups, starting from 0 and ending at 255 (0, 1, 2, 3, ..., )
  represents the dimension of the feature vector (512)
Overall input:
## Output Section
Linear Layer
A component of a fully connected neural network that can project an input vector into another dimension. In the Transformer model, linear layers are typically used to convert the outputs of the Encoder and Decoder into log-odds vectors.
### Softmax
An activation function that can convert a real number vector into a probability distribution over the vocabulary. This probability distribution represents the model's prediction probability for each word, ensuring that the sum of all probabilities equals one.
Output Probabilities (Output Probabilities)

The probability of each word in the output sequence being predicted. After the Softmax activation function activates the Decoder's output vector, the probability distribution for each word can be obtained, with the word with the highest output probability being selected as the next predicted word.
## Encoder
The Encoder is responsible for processing the input sequence and generating a series of continuous vector representations.

What the Encoder is Good At
The Encoder uses bi-directional context encoding (Bi-directional Context), which means that the positional encoding considers the words to the left and right of a word in the sentence, and this is achieved through the self-attention mechanism.
Bi-directional Context Encoding (Bi-directional Context)

The encoding considers the words to the left and right of a word in the sentence, thus better understanding the entire sentence's context.
Good at: Understanding sentences, sentiment analysis (Sentiment analysis), predicting masked words

Famous Encoders include BERT, RoBERTa, ALBERT, ERINE (Wenxin Yiyan), etc.

### Composition Modules
The Encoder consists of N=6 identical layers stacked together, with each layer containing two sub-layers.
The first layer is a multi-head self-attention mechanism
The second layer is a position-wise feed-forward network

### Multi-Head Self-Attention Mechanism

An extension of the self-attention mechanism, where "multi-head" means dividing the input sequence's embedding vector into multiple "heads," each with its own weight matrix. Each head calculates the similarity between the query, key, and value vectors separately, and after parallel computation, it is converted into weights through the Softmax function.
Weight Matrix (Weight Matrix): Used to calculate attention weights, representing the importance of each word in the attention mechanism. The weight matrix represents the query, key, and value (Q, K, V) matrices.

### Query, Key, and Value
The first step in calculating self-attention is to convert each element in the sequence into three vectors for processing – the query vector, key vector, and value vector. These are usually obtained by multiplying the weight matrices Q, K, V with the original element vector (such as word embeddings).
Mathmul: After calculating the query, key, and value vectors with the formula above, the model calculates the attention scores for each word in the sequence by taking the dot product of all the key vectors in the input sentence with the query vector of the current word

Scale: After calculating the scores, the scores are divided by  , which is the dimension of the key vector (in the paper, the authors set this to 64, and the square root is 8). This makes the gradients more stable because the authors suspected that when the value of  is large, the size of the dot product increases, leading to very small softmax gradients.

Softmax: Next, softmax is used to normalize the attention scores, obtaining a normalized attention weight that is positive and sums to 1.

Mathmul: Each value vector is then multiplied by the softmax score to emphasize words relevant to the semantic understanding and to weaken irrelevant words. Finally, the sum of the weighted value vectors is calculated to obtain the output of the self-attention mechanism for that position

The multi-head mechanism adds a step where the word embeddings are split into 8 different heads and calculated with the above process, then concatenated (Concat) and integrated through another linear layer before being passed to the feed-forward network.

The input to the Encoder beyond the first layer is not word embeddings but the output processed by the previous Encoder layer.
### Feed-Forward Network
A neural network that transmits information in one direction, processing the non-linear transformations of input tokens one by one. It performs transformations at each position and then passes the processed information to the next layer.
### Residual Connection and Layer Normalization (Add & Norm)
Residual connections help the model train better by adding cross-layer connections. Layer normalization standardizes the output after each sub-layer.
After all Encoders have processed the output, the last Encoder passes the key matrix (K) and value matrix (V) to each Decoder layer, as these matrices are needed in the Decoder's self-attention mechanism to calculate the attention weights with the Encoder's output.
## Decoder
The Decoder is responsible for predicting word probabilities and generating sentences. The structure of the Decoder allows it to consider all previously generated words when generating a sequence.
### Decoder's Strengths
The Decoder uses Unidirectional Context Encoding, which means that a word can only observe the context to its left, while the context to its right is hidden (or vice versa). This is achieved through the use of a Masked self-attention mechanism.
### Unidirectional Context Encoding
When generating a sequence, only the context to the left of the word (previous words) is considered, while the context on the other side (future words) is hidden.

Strengths: Causal Language Modeling - predicting the next word in a sentence, generating sequences.
Famous Decoders include GPT-2, GPT Neo, ChatGLM (ZhiPu QingYan), etc.
### Components
The Decoder is also composed of N=6 identical layers stacked on top of each other, with each layer containing three sub-layers.

In addition to the two sub-layers that are the same as the Encoder, it adds an extra sub-layer that performs multi-head attention over the Encoder's output. Note that this is not self-attention but Encoder-Decoder attention.
### Masked Self-Attention Mechanism
The self-attention layer is only allowed to see the positions that have already been generated in the output sequence, preventing the model from seeing future information when predicting the next word. This is achieved by masking future positions (setting them to -inf) before the softmax in the self-attention calculation.
### Encoder-Decoder Attention
Similar to self-attention, but the query matrix (Q) comes from the lower Decoder, while the key matrix (K) and value matrix (V) come from the final output of the Encoder. Its role is to combine the output information of the Encoder layer within the Decoder layer, which helps the Decoder to refer to the information of the entire input sequence when generating each word.
### Feed-Forward Network
The structure is the same as the feed-forward network in the Encoder, processing the input and passing it to the next Decoder layer.
## Encoder-Decoder
The Encoder and Decoder do not share word weights. The Encoder is responsible for understanding the input sentence, while the Decoder generates the sequence based on the Encoder's understanding.
### Benefits of Using the Encoder-Decoder Structure
This structure allows the model to generate output text of varying lengths after understanding the semantic content of the input text, achieving high-quality translation or summarization results.
Strengths: Handling sequence-to-sequence tasks, such as translation, text summarization.

Famous Encoder-Decoders include the Transformer itself, BART, Pegasus, etc.
## References:
Attention is All You Need

GitHub - huggingface/course: The Hugging Face course on Transformers

Attention机制与Self-Attention机制的区别_self attention机制有何不同-CSDN博客

哔哩哔哩 | 1.4 The Transformer architecture - Hugging Face自然语言处理教程(官方)

【神经网络】学习笔记十四——Seq2Seq模型-CSDN博客

【超详细】【原理篇&实战篇】一文读懂Transformer-CSDN博客

How Transformers Work: A Detailed Exploration of Transformer Architecture | DataCamp

图解Transformer系列一：Positional Encoding（位置编码）

A Gentle Introduction to Positional Encoding in Transformer Models, Part 1 - MachineLearningMastery.com

这是我见过最全的 Transformer 模型解读了（代码+注释+讲解）-CSDN博客

一文彻底搞懂 Transformer（图解+手撕）-CSDN博客

The Illustrated Transformer – Jay Alammar – Visualizing machine learning one concept at a time.
如有错误请指出！