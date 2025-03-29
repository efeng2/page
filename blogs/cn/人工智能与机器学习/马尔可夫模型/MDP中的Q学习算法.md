# MDP中的Q学习算法
2025-03-03  

## Q学习 (Q-Learning)  
Q学习是一种通过Q表(Q-table)来学习状态-动作价值的强化学习方法。智能体(agent)通过不断尝试不同动作，最终学习到在特定状态下采取哪些动作能获得更大奖励。

**核心特点**：
- 维护一个Q表记录状态-动作对的价值
- 通过试错(trial-and-error)机制进行学习
- 不需要环境模型(model-free)

## Q学习更新方程  

$$
Q_{k+1}(s, a) = (1-\alpha) Q_k(s, a) + \alpha \big(R(s,a,s') + \gamma \max_{a'} Q_k(s', a')\big)
$$

**参数说明**：  
$s$ - 当前状态 (current state)  
$a$ - 执行动作 (action taken)  
$s'$ - 新状态 (new state)  
$R(s,a,s')$ - 即时奖励 (immediate reward)  

$\gamma$ - 折扣因子 (discount factor, 0≤γ≤1)  
$\alpha$ - 学习率 (learning rate, 0<α≤1)  

**算法特性**：  
1. 学习率$\alpha$控制新信息对Q值的影响程度  
2. 折扣因子$\gamma$决定未来奖励的现值  
3. $\max_{a'}Q(s',a')$表示对新状态最优动作的估计  
4. 通过时序差分(temporal difference)方式进行更新  