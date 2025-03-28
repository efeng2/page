# Dynamical Systems and Chaos Study Notes 
2025-03-14

## Dynamical Systems
A **dynamical system** is a set of rules that govern the time evolution of a set of state variables.

## One-Dimensional Systems

### Classification

- **Autonomous**: The right-hand side (RHS) does not depend on $t$.
- **Linear**: The system is linear in $x$.

### Fixed Points

A fixed point satisfies:

$$
\dot{x} = 0
$$

- **Phase space (state space)**: The space in which all possible states of a dynamical system are represented.

#### Stability at Fixed Points
1. **Stable** - $f(x*)' \lt 0$
2. **Asymptotically stable**
3. **Unstable** - $f(x*)' \gt 0$
4. **Inconclusive** - $f(x*)' = 0$

- **Phase Portrait**: A diagram that shows trajectories of a dynamical system in phase space. 
  - Above the $x$-axis, the particle moves left.
  - Below the $x$-axis, the particle moves right.

- **Qualitative Graph**: 
  - Fixed points are represented as dashed lines.
  - Stable points attract trajectories.
  - Unstable points repel trajectories.

- **Non-autonomous/time-dependent equations** $\dot{x} = f(x,t)$ are treated as two-dimensional or second-order systems.

- **Globally Stable**: The system approaches the fixed point from all initial conditions.
- **Locally Stable**: Stability depends on the initial condition.

### Logistic Equation

The **logistic equation** describes population growth with limiting factors.

### Alternative Way to Determine Stability

Consider:

$$
\dot{x} = f(x), \quad x^* = 0
$$

Perturb around $x^*$:

$$
x(t) = x^* + \epsilon(t)
$$

where $\epsilon(t)$ represents small perturbations.

Using a **Taylor expansion** around $x^*$:

$$
f(x) = f(x^*) + \epsilon(t) f'(x^*) + \frac{\epsilon(t)^2}{2} f''(x^*)
$$

Solving the ODE:

$$
\dot{\epsilon} = \epsilon f'(x^*)
$$

$$
\epsilon(t) = \epsilon(0) e^{f'(x^*)t}
$$

If $f'(x^*) \lt 0$, the perturbation decays, implying stability.

### Existence and Uniqueness Theorem

Consider the initial value problem:

$$
\dot{x} = f(x), \quad x(0) = x_0
$$

If $f(x)$ and $f'(x)$ are **continuous** on an open interval $R$ of the $x$-axis, and $x_0 \in R$, then there exists a unique solution $x(t)$ on some interval $(-\tau, \tau)$ around $t = 0$.

### Impossibility of Oscillations

Solutions to $\dot{x} = f(x)$ **cannot oscillate**. The only possibilities for a vector field on the real line are:
1. Convergence to a fixed point.
2. Divergence to $\pm \infty$.



## Bifurcations in One-Dimensional Systems

Bifurcations occur when the stability of fixed points depends on a parameter.

**Bifurcation Points**: Points where stability changes.

Step 1: Find fixed points

Step 2: Find $r_c$ where $b^2-4ac$ becomes 0

### Saddle-Node Bifurcations

A **saddle-node bifurcation** occurs when two fixed points are created or destroyed.

- **Normal form**:

$$
  \dot{x} = L + x^2
$$

- Near the bifurcation point $(x^*, L_c)$:

$$
  f(x, L) = 0, \quad f'(x) = 0
$$

At a bifurcation point, there is typically one **semi-stable** fixed point.

**Bifurcation Diagram**:

![Bifurcation diagram with r](</page/blogs/Advanced Math/Mathematical Modeling/image-19.png>)

![Bifucation](</page/blogs/Advanced Math/Mathematical Modeling/image-18.png>)

**Tip**: If solving $f(x) = 0$ is difficult, use a **graphical intersection approach**:
- Intersection points correspond to fixed points.
- Stability:
  - If $f_2(x) \gt f_1(x)$, move left.
  - If $f_1(x) \gt f_2(x)$, move right.

### Transcritical Bifurcation

- **Normal form**:

$$
  \dot{x} = Lx - x^2, \quad L \in \mathbb{R}
$$

- **Fixed points**: 

$$
  x^* = 0, \quad x^* = L
$$

**Bifurcation Diagrams**:

![Transcritical Bifurcation](</page/blogs/Advanced Math/Mathematical Modeling/Transcritical.png>)

In a transcritical bifurcation, the two fixed points **do not disappear**; they **switch stability**.

### Pitchfork Bifurcation

#### Supercritical Pitchfork Bifurcation

- **Normal form**:

$$
  \dot{x} = Lx - x^3
$$

- **Fixed points**:

$$
  x^* = 0, \quad x^* = \pm \sqrt{L}, \quad L \gt 0
$$

- $x^* = 0$ is **stable** for $L \lt 0$ but **unstable** for $L \gt 0$, where two **stable** fixed points emerge.

**Bifurcation Diagrams**:

![Supercritical Pitchfork](</page/blogs/Advanced Math/Mathematical Modeling/image-1.png>)

![Bifurcation Diagram](</page/blogs/Advanced Math/Mathematical Modeling/image.png>)

#### Subcritical Pitchfork Bifurcation

- **Normal form**:

$$
  \dot{x} = Lx + x^3
$$

- **Fixed points**:

$$
  x^* = 0, \quad x^* = \pm \sqrt{-L}, \quad L \gt 0
$$

- $x^* = 0$ is **stable** for $L \gt 0$ but **unstable** for $L \lt 0$, where two **unstable** fixed points are destroyed.

**Bifurcation Diagrams**:

![Subcritical Pitchfork](</page/blogs/Advanced Math/Mathematical Modeling/image-3.png>)

## Nondimensionalizing

$$x = \frac{u}{v}, \quad \tau = \frac{t}{T}$$

$$u = xU \quad \Rightarrow \quad \frac{du}{dt} = \frac{d}{dt}(xU) = U\frac{dx}{d\tau} \frac{d\tau}{dt} = \frac{U}{T} \frac{dx}{d\tau}$$

## Circle Phase Space

Basic model of systems that oscillate:

$$\dot{\theta} = f(\theta)$$

A vector field on the circle $S_L$:

$$\theta \in [0, L) = S_L$$

Example:

$$\dot{\theta} = \sin{\theta}, \quad \theta \in S_{2\pi} = [0, 2\pi)$$

Fixed points:

$$\sin{\theta} = 0 \Rightarrow \theta = n\pi, \quad n \in \mathbb{N} \Rightarrow \theta^* = 0 \text{ and } \theta^* = \pi$$

![Phase Space](</page/blogs/Advanced Math/Mathematical Modeling/image-4.png>)

A point on a circle is called an **angle** or **phase**.

### Uniform Oscillator

$\theta$ changes uniformly:

$$\dot{\theta} = \omega$$

Solution:

$$\theta(t) = \omega t + \theta_0, \quad \theta_0 \text{ is the initial angle.}$$

Period of oscillation:

$$T = \frac{2\pi}{\omega}$$

### Nonuniform Oscillator

$$\dot{\theta} = \omega - \alpha \sin \theta$$

Fixed points:

$$\omega = \alpha \sin \theta$$

- If $\alpha \lt \omega$, no fixed points.
- If $\alpha = \omega$, there is a semi-stable fixed point at $\theta^* = \frac{\pi}{2}$.
- If $\alpha \gt \omega$, two fixed points exist (one stable, one unstable).

Solving for the period:

$$\int_0^{2\pi} \frac{d\theta}{\omega - \alpha \sin \theta} = \int_0^T dt \Rightarrow \theta = 2 \arctan \omega, \quad T = \frac{2\pi}{\sqrt{\omega^2 - \alpha^2}}$$

Conclusion: A **Saddle-Node bifurcation** occurs at $\alpha = \omega$, $\theta^* = \frac{\pi}{2}$.

## Two-Dimensional Linear Systems

$$\dot{x} = ax + by, \quad \dot{y} = cx + dy$$

### Matrix Form

$$\dot{\mathbf{x}} = A\mathbf{x}$$

$$A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}, \quad \mathbf{x} = \begin{pmatrix} x \\ y \end{pmatrix}$$

Fixed points occur at $\dot{\mathbf{x}} = 0$ for any $A$.

Solutions can be visualized as trajectories moving on the $(x,y)$ plane (a vector field on a phase plane).

### Vector Field

Plot:

- When $y=0$, examine $(\dot{x}, \dot{y})$.
- When $x=0$, examine $(\dot{x}, \dot{y})$.

### Phase Portrait

Integrate $\frac{\dot{x}}{\dot{y}}$ to get the phase portrait.

### Stable Manifold

Set of initial conditions $\begin{pmatrix} x_0 \\ y_0 \end{pmatrix}$ such that $\mathbf{x}(t) \to \mathbf{x}^*$ as $t \to \infty$.

### Unstable Manifold

Set of initial conditions $\begin{pmatrix} x_0 \\ y_0 \end{pmatrix}$ such that $\mathbf{x}(t) \to \mathbf{x}^*$ as $t \to -\infty$.

### Classification

Assume $\dot{\mathbf{x}} = A\mathbf{x}$ and guess a solution:

$$\mathbf{x}(t) = e^{\lambda t} \mathbf{v}$$

Solving:

$$\lambda \mathbf{v} = A \mathbf{v}$$

Find eigenvalues:

$$\begin{vmatrix} a - \lambda & b \\ c & d - \lambda \end{vmatrix}$$

$$\tau = \text{trace}(A) = a + d$$

$$\Delta = \det(A) = ad - bc$$

Eigenvalues:

$$\lambda_1 = \frac{\tau + \sqrt{\tau^2 - 4\Delta}}{2}, \quad \lambda_2 = \frac{\tau - \sqrt{\tau^2 - 4\Delta}}{2}$$

General solution:

$$\mathbf{x}(t) = c_1 e^{\lambda_1 t} \mathbf{v}_1 + c_2 e^{\lambda_2 t} \mathbf{v}_2$$

- **Large eigenvalue**: Fast eigendirection.
- **Small eigenvalue**: Slow eigendirection.

![Phase Portrait](</page/blogs/Advanced Math/Mathematical Modeling/image-11.png>)

### Stability

- **If** $\Delta \lt 0$, eigenvalues have opposite signs → **Saddle Point**.
- **If** $\Delta \gt 0$, eigenvalues are either:
  - **Real and same sign (Nodes)**.
  - **Complex conjugate (Spirals and Centers)**.
- **Further classification:**
  - Nodes: $\tau^2 - 4\Delta \gt 0$
  - Spirals: $\tau^2 - 4\Delta \lt 0$
  - Degenerate and Star Nodes: $\tau^2 - 4\Delta = 0$
  - $\tau \lt 0$: Eigenvalues have negative real parts → **Stable**.
  - $\tau \gt 0$: **Unstable**.
  - $\tau = 0$: Purely imaginary eigenvalues → **Neutrally stable**.
- **If** $\Delta = 0$, at least one eigenvalue is zero → **Whole line or plane of fixed points**.

## Nonlinear 2D Systems  

$$
\dot{x_1} = f_1(x_1, x_2)
$$

$$
\dot{x_2} = f_2(x_1, x_2)
$$

### Vector Notation  

$$
\vec{x} = \vec{f}(\vec{x})
$$

$$
\vec{x} =
\begin{pmatrix}
x_1 \\
x_2
\end{pmatrix},  
\quad  
\vec{f}(\vec{x}) =
\begin{pmatrix}
f_1(x_1, x_2) \\
f_2(x_1, x_2)
\end{pmatrix}
$$

For nonlinear systems, finding analytical solutions is difficult. Instead, we analyze the qualitative behavior of solutions using properties of $\vec{f}(\vec{x})$.



### Existence and Uniqueness Theorem (n-dimensional systems)  
If $\vec{f}(\vec{x})$ is continuous and all its partial derivatives are continuous in some open, connected set $D \subset \mathbb{R}^n$, then for any $\vec{x_0} \in D$, the IVP has a unique solution $\vec{x}(t)$ in some interval $(- \tau, \tau)$ around $t = 0$.

- Due to uniqueness, different trajectories never intersect.



### Linearization Technique – Approximate Phase Portrait  
**Fixed Points:** Occur when $\dot{x} = 0$ and $\dot{y} = 0$ simultaneously.

#### Jacobian Matrix  
$$
A =
\begin{bmatrix}
\frac{\partial f_1}{\partial x_1} & \frac{\partial f_1}{\partial x_2} \\
\frac{\partial f_2}{\partial x_1} & \frac{\partial f_2}{\partial x_2}
\end{bmatrix}
$$

Evaluating $A$ at fixed points allows us to determine stability:

- **Repellers (sources):** Both eigenvalues have positive real parts.  
- **Attractors (sinks):** Both eigenvalues have negative real parts.  
- **Saddles:** One eigenvalue is positive, and one is negative.  
- **Centers:** Both eigenvalues are purely imaginary ($\text{Re}(\lambda) = 0$).  
- **Higher-order and non-isolated fixed points:** At least one eigenvalue is 0 ($\text{Re}(\lambda) = 0$).  

**Stability Conditions:**  
- **Unstable:** If any eigenvalue has a positive real part.  
- **Stable:** If all eigenvalues have negative real parts.  



## Conservative Systems  

$$
E(x) = \frac{1}{2} m \dot{x}^2 + V(x)
$$

**Conserved Quantity:** $E$ is constant over time:  
$$
\frac{dE}{dt} = 0
$$

- Conservative systems cannot have attracting fixed points.  
- **Separatrix:** Divides phase portrait into distinct behaviors.  
- **Heteroclinic Orbit:** Trajectory connecting different fixed points.  
- **Homoclinic Orbit:** Trajectory starting and ending at the same fixed point.  



## Limit Cycle  

An **isolated closed trajectory**, meaning neighboring trajectories either spiral toward or away from it.

- **Stable (attracting):** All neighboring trajectories approach the limit cycle, modeling self-sustained oscillations.  
- **Closed orbit:** Must encircle a fixed point, with no fixed points allowed inside $R$ (a closed, bounded subset of the plane).  



## Gradient Systems  

$$
\dot{\vec{x}} = -\nabla V
$$

where $V$ is a potential function and  
$$
\nabla V = \left( \frac{\partial V}{\partial x}, \frac{\partial V}{\partial y} \right)
$$

$$
\dot{x} = -\frac{\partial V}{\partial x}, \quad \dot{y} = -\frac{\partial V}{\partial y}
$$

1. **Gradient System Condition:** If $\frac{\partial V}{\partial x} = \frac{\partial V}{\partial y}$, the system is gradient.  
2. **Computing $V$:**

$$
  -V = \int \frac{\partial V}{\partial x} \,dx + g(y)
$$

$$
  -\frac{\partial V}{\partial y} = -\frac{\partial V}{\partial y} + g'(y)
$$

$$
  g(y) = \int g'(y) \,dy, \quad C = 0
$$



### Bendixson's Theorem  

If a region $D \subset \mathbb{R}^2$ has no holes and  

$$
\frac{\partial f}{\partial x} + \frac{\partial g}{\partial y} \neq 0
$$

for all $x, y$ without changing sign in $D$, then the system  

$$
\dot{x} = f(x, y), \quad \dot{y} = g(x, y)
$$

has **no closed trajectories** in $D$.



### Liapunov Functions  

Consider $\dot{\vec{x}} = \vec{f}(\vec{x})$ with a fixed point $\vec{x}^*$. Suppose there exists a **Liapunov function** $V(\vec{x})$, a continuously differentiable real-valued function satisfying:

1. $V(\vec{x}) \gt 0$ for all $\vec{x} \neq \vec{x}^* and V(\vec{x}^*) = 0$.
2. $\dot{V}(\vec{x}) \lt 0$ for all $\vec{x} \neq \vec{x}^*$.

Then, the system has **no closed orbits**.



### Dulac’s Criterion  

For $\dot{\vec{x}} = \vec{f}(\vec{x})$ defined on a simply connected region $R$, if there exists a continuously differentiable real-valued function $g(\vec{x})$ such that  
$$
D \cdot (f(\dot{\vec{x}}))
$$
has a constant sign throughout $R$, then **no closed orbits exist in $R$**.



### Poincaré-Bendixson Theorem  

Given:  

1. $R$ is a closed, bounded subset of the plane.  
2. $\dot{\vec{x}} = \vec{f}(\vec{x})$ is continuously differentiable on an open set containing $R$.  
3. $R$ has no fixed points.  
4. A trajectory $C$ is **confined** in $R$ (it starts in $R$ and stays in $R$ for all future time).  

Then, $C$ is either a **closed orbit** or **spirals toward a closed orbit** as $t \to \infty$.

\gt **Implication:** 2D autonomous systems cannot exhibit **chaos**.



## Weakly Nonlinear Oscillators  

$$
x'' + x + \epsilon h(x, x') = 0
$$

We restrict ourselves to small $\epsilon$ to analyze possible **limit cycles**.

- **Example:** van der Pol oscillator:  

$$
  x'' + x + \epsilon (x^2 - 1)x' = 0
$$



### Regular Perturbation Theory  

We assume a series expansion:  

$$
x = x_0(t) + \epsilon x_1(t) + \epsilon^2 x_2(t) + \dots
$$

$$
x' = x_0'(t) + \epsilon x_1'(t) + \epsilon^2 x_2'(t) + \dots
$$

Grouping terms by powers of $\epsilon$:

- $O(\epsilon^0)$ = Terms with no $\epsilon$.  
- $O(\epsilon^1)$ = Terms with one $\epsilon$.  

**Key Condition:** Initial conditions must be valid for all sufficiently small $\epsilon$ to prevent unbounded growth as $t \to \infty$.

$$
x(t, \epsilon) = solution(\epsilon^0) + \epsilon \, solution(\epsilon^1) + O(\epsilon^2)
$$  

## Bifurcations in 2D Systems

To analyze bifurcations, we find the Jacobian and split cases accordingly.

### Zero-Eigenvalue Bifurcations

- **Saddle-Node Bifurcation**: Fixed points collide into one.
- **Transcritical Bifurcation**: Fixed points exchange stability.
- **Pitchfork Bifurcation**: A single stable fixed point transitions into an unstable one.
- **Supercritical Pitchfork Bifurcation**: A single stable fixed point splits into two stable fixed points.

### Hopf Bifurcations

#### Supercritical Hopf Bifurcation

Suppose a is a parameter in the system and denotes the critical rate at which bifurcation occurs. Consider:

1. For $a \lt a_c$: We have a stable spiral point where the entire phase plane is attracted to the fixed point.
2. For $a \gt a_c$: The fixed point changes to an unstable spiral. However, the overall dynamics far from the fixed point remain unchanged, as bifurcations are local phenomena. Far away, the dynamics move inward, but near the fixed point, they move outward, creating a limit cycle.

This type of bifurcation is referred to as a **supercritical Hopf bifurcation**, as a limit cycle emerges when $a \gt a_c$.

#### Subcritical Hopf Bifurcation

The subcritical case is more dramatic: after the bifurcation, trajectories must jump to a distant attractor, which may be another fixed point, a limit cycle, infinity, or, in three or higher dimensions, a chaotic attractor.

## Discrete Dynamical Systems

### Difference Equation Systems

A discrete system is defined as:

$$x_{n+1} = f(x_n, n)$$

where **n** is a time-like variable.

Solutions are not continuous functions but sequences indexed by **n**:
$$(x_0, x_1, ... x_n)$$

#### Fixed Points

A point whose further iteration does not change:

$$x_{n+1} = x_n \Rightarrow x_n = f(x_n)$$

Fixed points satisfy:

$$x^* = f(x^*)$$

#### Stability

For a linearized system:

$$x_{n+1} = \lambda x_n$$

The solution follows:

$$x_n = \lambda^n x_0$$

Fixed points satisfy:

$$x^* = \lambda x^* \Rightarrow x^* (\lambda -1) = 0$$

- **If** $|\lambda| \lt 1$, then $x_n$ converges to 0 (stable).
- **If** $|\lambda| \gt 1$, then $\lambda^n$ grows without bounds as $n$ increases (unstable).
- **If** $|\lambda| = 1$, the linear stability analysis is inconclusive.

### Cobweb Diagram

A graphical iteration of a map given $x_{n+1} = f(x_n)$:

1. Draw from $x_0$ to $f(x_n)$.
2. Draw horizontally to $x_1$.
3. Draw vertically to $f(x_n)$.
4. Repeat.

### Periodic Orbits

A periodic orbit of period **N** satisfies:

$$x_N = x_0$$

$$x = f^N(x) = f(f(f(...(x))))$$

**Period-2 Orbit Cycle:**

$$x_{n+1} = x_{n+2}$$

$$x_{n+2} = x_{n+1}$$

**Period-Doubling Bifurcation:**
New 2-cycles appear at a bifurcation value **r**.

## Chaos

**Strogatz Definition:** Chaos is an aperiodic long-term behavior in a deterministic system that exhibits sensitive dependence on initial conditions.

**Decominck Definition:** The dynamics on a compact set is chaotic if it depends sensitively on initial conditions and is transitive on the set, meaning orbits get arbitrarily close to every point in the set.

### Unimodal Map

A map $f(x)$ defined on $[0,1] \rightarrow [0,1]$ is **unimodal** if it is smooth, concave down, and has a single maximum.

- If $x_{n+1} = f(x_n)$ has an **unstable period-3 orbit**, then the map has unstable periodic orbits of any integer period. The difference equation is chaotic.

## Fractals

### Self-Similarity
Self-similarity refers to the repetition of the original structure at different scales when zoomed in.

### Countability
A set with an infinite number of elements is countable if its elements can be put into a one-to-one correspondence with the natural numbers. Otherwise, the set is uncountable.

## Cantor Sets

1. Draw the line segment [0,1].
2. Remove the middle third interval.
3. Repeat the process indefinitely—the limit of this process is the Cantor set, C.

**Properties of the Cantor Set:**
- Uncountable
- Self-similar
- The Lebesgue measure (total size) of C is 0

Mathematical representation:

$$\sum^{\infty}_{n=0} 2^n \frac{1}{3^{n+1}}$$

where $2^n$ is the number of segments removed, and $\frac{1}{3^{n+1}}$ is the length of each remaining piece.

**Geometric Series Equation:**
$$S_n = \sum^{\infty}_{n=0} a_n r^n = \frac{a_1}{1 - r}$$

## Dimension

### The Similarity Dimension (for Self-Similar Sets)
The similarity dimension $d$ is given by:

$$d = \frac{\ln{M}}{\ln{R}}$$

where:
- $M$ is the number of identical copies
- $R$ is the scaling factor

### Box-Counting Dimension
- Not self-similar fractals

$$
d = \lim_{\epsilon \rightarrow 0} \frac{\ln N(\epsilon)}{\ln \frac{1}{\epsilon}}
$$

## Strange Attractors

### Lyapunov Exponents
- rate of separation of infinitesimally close trajectories

$$
|\delta(t)| \approx e^{\lambda t}|\delta(0)|
$$

### Stretching and Folding

Baker's Map box Dimension $a> \frac{1}{2}$

Attractor A is approximated by $B^n(S)$
with $2^n$ strips of height $a^n$ and length 1.

Cover A with square boxes of side: $\epsilon = a^n$

Strips take N boxes: $N \approx a^{-n} * 2^n$

$$
d = \lim_{n\rightarrow 0} \frac{\ln(\frac{a}{2}^{-n})}{\ln(a^{-n})} = 1+ \frac{\ln(\frac{1}{2})}{\ln a}
$$

### Henon Map

- invertible
- dissipative
- trapping region for some paramter values

Area-contracting

1. Compute determinant of Jacobian matrix

$f(x,y) = 1-ax^2+y$

$g(x,y)=bx$

## Useful Graphs

$x^2$
![alt text](</page/blogs/Advanced Math/Mathematical Modeling/image-9.png>)

$x^3$
![alt text](</page/blogs/Advanced Math/Mathematical Modeling/image-10.png>)

$2x - x^2$
![alt text](</page/blogs/Advanced Math/Mathematical Modeling/image-23.png>)

$e^x$
![alt text](</page/blogs/Advanced Math/Mathematical Modeling/image-5.png>)

$e^{-x}$
![alt text](</page/blogs/Advanced Math/Mathematical Modeling/image-6.png>)

$sin(x)$
![alt text](</page/blogs/Advanced Math/Mathematical Modeling/image-8.png>)

$cos(x)$
![alt text](</page/blogs/Advanced Math/Mathematical Modeling/image-7.png>)

$tan(x)$
![alt text](</page/blogs/Advanced Math/Mathematical Modeling/image-22.png>)

Unit Circle (sin -> y; cos -> x)
![alt text](</page/blogs/Advanced Math/Mathematical Modeling/image-17.png>)

Trig Identities
![alt text](</page/blogs/Advanced Math/Mathematical Modeling/image-20.png>)

Derivatives and Integrals
![alt text](</page/blogs/Advanced Math/Mathematical Modeling/image-21.png>)

## Citation
Images from: 
Strogatz, Steven H.. Nonlinear Dynamics and Chaos : With Applications to Physics, Biology, Chemistry, and Engineering, Westview Press, 2014. ProQuest Ebook Central, http://ebookcentral.proquest.com/lib/washington/detail.action?docID=1181622.

Unit Circle From: Wikipedia

Information from:
University of Washington Course AMATH 402, taught by Professor Anastassiya Semenova