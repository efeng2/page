### Separable Equations (Method of Separation)
2024-11-20

- Form: $\frac{dy}{dt} = g(y) h(t)$

- First-order, where variables can be separated, where all y variables can be on the same side as dy, and all t variables can be on the same side as dt.



1. Separate Variables: Rearrange to $\int \frac{1}{g(y)} \, dy = \int h(t) \, dt$.

2. Integrate Both Sides: Solve each side to find $y(t)$.



### $\mu$-Sub (Method of Integrating Factors)

- Form: $\frac{dy}{dt} + p(t) y = g(t)$

- First-order linear ODEs



1. Integrating Factor: Find $\mu(t) = e^{\int p(t) \, dt}$.

2. Solve for $y(t)$: General solution is $y(t) = \frac{1}{\mu(t)} \left( C + \int \mu(t) g(t) \, dt \right)$.



### Exact Equations

- Form: $M(x, y) dx + N(x, y) dy = 0$

- First-order equation, where it satisfies an exactness condition.



1. Check for if Equation is Exact: Verify if $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$.

2. Set $\psi(x, y)$: $\frac{\partial \psi}{\partial x} = M$ and $\frac{\partial \psi}{\partial y} = N$.

3. $\psi(x,y) = \int M(x,y) dx + g(y)$

4. $\frac{\partial \psi}{\partial y} = \frac{\partial}{\partial y} (\psi(x,y)) = \frac{\partial}{\partial y} \int M(x,y) dx + g'(y) = N(x,y)$

5. Find $g(y)$ by integrating

6. Set Equation Equal to C: Implicit solution is $\psi(x, y) = C$.



### Method of Undetermined Coefficients

- Form:  $y^{(n)}+a_1 y^{(n-1)}+ \dots + a_n y = b(t)$

- Nonhomogeneous



1. Solve Homogeneous Equation: Find $y_c$ by solving the homogeneous equation $y^{(n)} + a_1 y^{(n-1)} + \dots + a_n y = 0$.



2. Guess Particular Solution $y_p$ Based form based on $b(t)$:

- For Polynomials $b(t) = t^n$:

   - Guess a polynomial of the same degree. 

   - E.g. If $b(t) = t^2 + 3t$, guess $y_p = At^2 + Bt + C$.

- For Exponentials $b(t) = e^{at}$: Guess $y_p = Ae^{at}$.

   - If $e^{at}$ is part of the homogeneous solution, multiply by $t$ (guess $y_p = Ate^{at}$).

- For Sines and Cosines $b(t) = \sin(at)$ or $\cos(at)$:

     - Guess $y_p = A\cos(at) + B\sin(at)$.

     - If $\cos(at)$ or $\sin(at)$ are part of the homogeneous solution, multiply by $t$ (e.g., $y_p = t(A\cos(at) + B\sin(at))$).



- For Products of Exponentials and Polynomials $b(t) = t^n e^{at}$:

     - Guess $y_p = (A_n t^n + A_{n-1} t^{n-1} + \dots + A_0)e^{at}$.

     - If $e^{at}$ is part of the homogeneous solution, multiply by $t$ as necessary.



- For Products of Polynomials with Sines and Cosines $b(t) = t^m \sin(at)$ or $b(t) = t^m \cos(at)$:

     - Guess $y_p = (B_m t^m + B_{m-1} t^{m-1} + \dots + B_0)\cos(at) + (C_m t^m + C_{m-1} t^{m-1} + \dots + C_0)\sin(at)$.

     - If $\cos(at)$ or $\sin(at)$ are part of the homogeneous solution, multiply by $t$ as needed.



   - For Complex Terms $b(t) = e^{(a+bi)t}$:

     - Guess $y_p = e^{at}(A\cos(bt) + B\sin(bt))$.

     - If $e^{at}\cos(bt)$ or $e^{at}\sin(bt)$ appear in the homogeneous solution, multiply by $t$ to achieve independence.



4. Substitute the Particular Solution Guess into the Differential Equation:

   - Substitute your guess for $y_p$ into the nonhomogeneous ODE.

   - Differentiate as necessary and collect terms.

   - Match coefficients of $t$, $\cos$, $\sin$, etc., on both sides of the equation to solve for the unknown coefficients.



5. Write the General Solution:

   - Combine the complementary solution $y_c$ and the particular solution $y_p$: 

     $y(t) = y_c + y_p$



### Variation of Parameters

- Type: Second-order linear ODEs where undetermined coefficients are unsuitable, particularly with variable coefficients.



1. Find the Complementary Solution: Solve the homogeneous equation.

2. Formulate Particular Solution: Use $y_p = u_1 y_1 + u_2 y_2$, where $y_1$ and $y_2$ are solutions to the homogeneous equation.

3. Solve for $u_1$ and $u_2$: Use the method of variation of parameters to determine these functions.

### Laplace Transform Method

- Type: Linear ODEs with initial conditions, often used for equations involving step functions or impulses.



1. Apply Laplace Transform: Transform the equation to solve algebraically in the Laplace domain.

2. Solve Algebraic Equation: Find $Y(s)$, the Laplace transform of $y(t)$.

3. Inverse Transform: Apply the inverse Laplace transform to obtain $y(t)$ in the time domain.



### Common Laplace Transforms

- Constant: $\mathcal{L}\{1\} = \frac{1}{s}$



- Power of t: $\mathcal{L}\{t^n\} = \frac{n!}{s^{n+1}}$



- Exponential: $\mathcal{L}\{e^{at}\} = \frac{1}{s - a}$



- Sine: $\mathcal{L}\{\sin(at)\} = \frac{a}{s^2 + a^2}$



- Cosine: $\mathcal{L}\{\cos(at)\} = \frac{s}{s^2 + a^2}$



- Hyperbolic sine: $\mathcal{L}\{\sinh(at)\} = \frac{a}{s^2 - a^2}$



- Hyperbolic cosine: $\mathcal{L}\{\cosh(at)\} = \frac{s}{s^2 - a^2}$



- Unit Step Function (Heaviside): $\mathcal{L}\{u(t - a)\} = \frac{e^{-as}}{s}$



- Dirac Delta Function: $\mathcal{L}\{\delta(t - a)\} = e^{-as}$



Derivatives



- First derivative: $\mathcal{L}\{f'(t)\} = sF(s) - f(0)$



- Second derivative: $\mathcal{L}\{f''(t)\} = s^2 F(s) - s f(0) - f'(0)$

### Stability Analysis

- Type: Autonomous first-order ODEs $y' = f(y)$, where we analyze equilibrium points.



1. Find Equilibrium Points: Solve $f(y) = 0$ to locate equilibria.

2. Analyze Stability: Determine stability by evaluating $f'(y)$ at each equilibrium:

   - $f'(y) < 0$: asymptotically stable.

   - $f'(y) > 0$: unstable.

   - $f'(y) = 0$: inconclusive.