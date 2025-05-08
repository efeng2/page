# N层神经网络 (N-Layer Neural Network)  
2025.03.22  

## 大语言模型 (Large Language Models)  
**温度参数 (Temperature)**：  
- 较高值 = 更具创造性  
- 较低值 = 更保守精确  
通过调节词语联合概率分布实现：  
概率计算公式：softmax(向量 * 1/温度参数)  

## N元语言模型 (N-gram Models)  
- 基于统计的经典语言模型  
- 依赖前N-1个词预测当前词  

通过分析大规模文本语料库，可以学习到tokens构成的长度为n的序列的联合概率分布

Input (联合概率分布): $P(w_1, w_2, ..., w_{n})$
Output (概率): $P(w_n|w_1, w_2, ..., w_{n-1})$

## 基于深度神经网络的N元模型 (Deep Neural Networks for N-gram Models)  

\begin{tabular}{|c|c|c|}
\hline
\textbf{Inputs} & \textbf{Multilayer Neural Net} & \textbf{Outputs} \\
\hline
$w_1$ & \rightarrow & $P(v_1| w_1, w_2, ..., w_{n-1})$ \\
\hline
$w_2$ & \rightarrow & $\vdots$ \\
\hline
$\vdots$ & \rightarrow &  \\
\hline
$w_{n-1}$ & \rightarrow & $P(v_z| w_1, w_2, ..., w_{n-1})$ \\
\hline
\end{tabular}

为获得符合概率分布约束的输出值，需使用softmax处理层

训练中的运用：深度神经网络的标准机器学习方法：  
对于每个训练样本，将其前向传播（feed forward）通过神经网络，并计算期望输出与实际输出之间的差异作为误差（"损失/loss"）。  
然后通过计算损失函数相对于权重的梯度向量（gradient vector），并沿梯度相反方向（为降低而非增加损失）调整步长，从而更新神经网络权重以减小损失。该梯度计算过程称为反向传播（backpropagation）。  