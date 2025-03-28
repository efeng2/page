# ODE 速通
2024-11-20

### 可分离变量方程（分离变量法 Method of Separation）

- 形式：$\frac{dy}{dt} = g(y) h(t)$

- 一阶方程，可将变量分离，使所有y变量与dy同侧，所有t变量与dt同侧。

1. 分离变量：重排为$\int \frac{1}{g(y)} \, dy = \int h(t) \, dt$

2. 两边积分：求解得$y(t)$

### 积分因子法（$\mu$-代换 Method of Integrating Factors）

- 形式：$\frac{dy}{dt} + p(t) y = g(t)$

- 一阶线性常微分方程

1. 积分因子：计算$\mu(t) = e^{\int p(t) \, dt}$

2. 求解$y(t)$：通解为$y(t) = \frac{1}{\mu(t)} \left( C + \int \mu(t) g(t) \, dt \right)$

### 恰当方程（Exact Equations）

- 形式：$M(x, y) dx + N(x, y) dy = 0$

- 满足恰当性条件的一阶方程

1. 验证恰当性：检查$\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$

2. 设势函数$\psi(x, y)$：满足$\frac{\partial \psi}{\partial x} = M$，$\frac{\partial \psi}{\partial y} = N$

3. $\psi(x,y) = \int M(x,y) dx + g(y)$

4. $\frac{\partial \psi}{\partial y} = \frac{\partial}{\partial y} (\psi(x,y)) = \frac{\partial}{\partial y} \int M(x,y) dx + g'(y) = N(x,y)$

5. 积分求$g(y)$

6. 令方程等于常数：隐式解为$\psi(x, y) = C$

### 待定系数法（Method of Undetermined Coefficients）

- 形式：$y^{(n)}+a_1 y^{(n-1)}+ \dots + a_n y = b(t)$

- 非齐次方程

1. 解齐次方程：求$y_c$

2. 根据$b(t)$形式猜测特解$y_p$：

- 多项式$b(t) = t^n$：猜同次多项式（如$b(t)=t^2+3t$则猜$y_p=At^2+Bt+C$）

- 指数函数$b(t)=e^{at}$：猜$Ae^{at}$（若与齐次解重复则乘以t）

- 正余弦函数$b(t)=\sin(at)$或$\cos(at)$：猜$A\cos(at)+B\sin(at)$（若重复则乘以t）

- 多项式与指数乘积$b(t)=t^n e^{at}$：猜$(A_n t^n+...+A_0)e^{at}$（必要时乘以t）

- 多项式与正余弦乘积$b(t)=t^m \sin(at)$：猜$(B_m t^m+...+B_0)\cos(at)+(C_m t^m+...+C_0)\sin(at)$

- 复指数项$b(t)=e^{(a+bi)t}$：猜$e^{at}(A\cos(bt)+B\sin(bt))$

4. 将特解代入原方程确定系数

5. 通解为$y(t) = y_c + y_p$

### 参数变异法（Variation of Parameters）

- 类型：二阶线性方程，适用于变系数或待定系数法失效的情况

1. 求齐次解$y_c$

2. 设特解$y_p = u_1 y_1 + u_2 y_2$

3. 解$u_1$和$u_2$

### 拉普拉斯变换法（Laplace Transform Method）

- 类型：带初值的线性方程，特别适合含阶跃函数或冲激的情况

1. 施加拉普拉斯变换

2. 解代数方程求$Y(s)$

3. 逆变换得$y(t)$

### 常用拉氏变换对

- 常数：$\mathcal{L}\{1\} = \frac{1}{s}$

- 幂函数：$\mathcal{L}\{t^n\} = \frac{n!}{s^{n+1}}$

- 指数：$\mathcal{L}\{e^{at}\} = \frac{1}{s - a}$

- 正弦：$\mathcal{L}\{\sin(at)\} = \frac{a}{s^2 + a^2}$

- 余弦：$\mathcal{L}\{\cos(at)\} = \frac{s}{s^2 + a^2}$

- 双曲正弦：$\mathcal{L}\{\sinh(at)\} = \frac{a}{s^2 - a^2}$

- 单位阶跃：$\mathcal{L}\{u(t - a)\} = \frac{e^{-as}}{s}$

- 冲激函数：$\mathcal{L}\{\delta(t - a)\} = e^{-as}$

导数变换：

- 一阶导：$\mathcal{L}\{f'(t)\} = sF(s) - f(0)$

- 二阶导：$\mathcal{L}\{f''(t)\} = s^2 F(s) - s f(0) - f'(0)$

### 稳定性分析（Stability Analysis）

- 类型：自治一阶方程$y' = f(y)$

1. 求平衡点：解$f(y) = 0$

2. 稳定性判据：
   - $f'(y) < 0$：渐近稳定
   - $f'(y) > 0$：不稳定
   - $f'(y) = 0$：无法判定