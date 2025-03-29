# 数学建模 (Mathematical Modeling)
2024-12-20

## 平衡点 (Equilibrium Points)
- 令dy/dx=0，求解y值

## 稳定性分析 (Stability Analysis)

### 相线图 (Phase-line Plot)
- 纵轴为y'，横轴为y的图表
- x轴截距即为平衡点
- y>0时箭头向右，y<0时箭头向左
- 稳定点：两侧箭头均指向该点
- 不稳定点：两侧箭头均背离该点
- 半稳定点：同侧箭头同向

### Python相线图绘制
```python
import numpy as np
import matplotlib.pyplot as plt

# 定义导数函数 y' = f(y)
def f(y):
    # 示例：dy/dx = y*(1-y)*(y-2)，平衡点在y=0,1,2
    return y * (1 - y) * (y - 2)
    
# 设置y值范围
y_values = np.linspace(-0.5, 2.5, 100)
y_prime = f(y_values)

# 绘制相线图
fig, ax = plt.subplots(figsize=(8, 4))
ax.plot(y_values, y_prime, label="y'")
ax.axhline(0, color='black', linewidth=0.5)  # y'=0基准线

# 标记平衡点
equilibrium_points = [0, 1, 2]
for y_eq in equilibrium_points:
    ax.plot(y_eq, 0, 'ro')  # 红点标记
    ax.text(y_eq, 0.1, f'y = {y_eq}', ha='center', color='red')

# 添加稳定性箭头
for i in range(1, len(y_values) - 1):
    if y_prime[i] > 0:
        ax.annotate('', xy=(y_values[i + 1], y_prime[i + 1]), 
                    xytext=(y_values[i], y_prime[i]),
                    arrowprops=dict(arrowstyle="->", color='blue'))
    elif y_prime[i] < 0:
        ax.annotate('', xy=(y_values[i - 1], y_prime[i - 1]), 
                    xytext=(y_values[i], y_prime[i]),
                    arrowprops=dict(arrowstyle="->", color='red'))

# 图表装饰
ax.set_xlabel("y")
ax.set_ylabel("y'")
ax.set_title("带稳定性箭头的相线图")
ax.legend()
plt.grid(True)
plt.show()
```

## 二维方程组示例 (System of Equations - 2D Example)

### 平衡点求解
1. 令x*=0, y*=0
2. 联立方程消元
3. 分类讨论各平衡点情况

### 稳定性分析
1. 求雅可比矩阵(Jacobian matrix) A
2. 通过特征方程det(A-λI)=0判断特征值符号
   - λ>0时不稳定
   - λ<0时稳定
3. 对每个平衡点重复分析

### Python向量场绘制
```python
import numpy as np
import matplotlib.pyplot as plt

# 参数设置
alpha, beta, delta, gamma = 1.0, 0.5, 0.5, 1.0

# 定义微分方程组
def system(x, y):
    # 捕食者-猎物模型(Lotka-Volterra Model)
    dx = alpha * x - beta * x * y
    dy = delta * x * y - gamma * y
    return dx, dy

# 生成网格点
x_vals = np.linspace(0, 5, 20)
y_vals = np.linspace(0, 5, 20)
X, Y = np.meshgrid(x_vals, y_vals)

# 计算方向场
DX, DY = system(X, Y)
M = np.hypot(DX, DY)  # 箭头长度归一化
DX, DY = DX/M, DY/M   # 方向向量归一化

# 绘制方向场
fig, ax = plt.subplots(figsize=(8,8))
ax.quiver(X, Y, DX, DY, M, pivot='middle', color='blue', scale=20)
ax.set_xlabel("x")
ax.set_ylabel("y")
ax.set_title("捕食者-猎物模型方向场")

# 计算平衡点
equilibrium_points = [(0, 0), (gamma/delta, alpha/beta)]
for (x_eq, y_eq) in equilibrium_points:
    ax.plot(x_eq, y_eq, 'ro')
    ax.text(x_eq, y_eq+0.2, f'({x_eq:.2f}, {y_eq:.2f})', ha='center', color='red')

# 图表装饰
ax.set_xlim([0,5])
ax.set_ylim([0,5])
plt.grid(True)
plt.show()
```

## 降维技术 (Dimension reduction)
- 变量替换方法

## 建模方法 (Model Building)
- 现实问题的简化
- 变化率 = 输入率 - 输出率
- 可引入比例因子

## 经典模型 (Models)

### 物理模型 (Physics)
- 简谐振荡器(Simple harmonic oscillator)

### 指数模型 (Exponential Models)
- 放射性衰变(Radioactive decay)
- 碳定年法(Carbon dating)
- 建筑热传导(Heating/Cooling of Buildings)

### 流体浓度 (Fluid Concentration)
- 混合问题(Mixing problem)

### 人口模型 (Population Models)
- 指数增长模型(Malthusian Model)
- 逻辑斯蒂模型(Logistic Model)
- 蛛网图分析(Cobweb Diagram)
- 补偿模型(Depensation model)
- 捕捞模型(With Harvesting)
- 分岔点分析(Bifurcation Point)

### 捕食者-猎物模型 (Predator-Prey Model)
- Lotka-Volterra模型
- 竞争模型(Competition Models)

### 战争模型 (War Modeling)
- 兰彻斯特作战模型(Lanchester Model of Conflict)

### 洛伦兹方程 (Lorenz Equation)
- 三维系统
- 混沌非周期行为(Chaotic aperiodic)
- 初值敏感性(Determinstic on Initial Condition)