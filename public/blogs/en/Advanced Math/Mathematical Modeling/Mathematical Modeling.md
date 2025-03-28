# Mathematical Modeling
2024-12-20

## Equilibrium Points

- Set $dy/dx$ to $0$, solve for $y$

## Stability

### Phase-line Plot

- Plot with y axis as y', x axis as y
- x-intercept -> equilibrium point
- If y > 0, arrow right, if y < 0, arrow left.
- Stable: Arrows on both sides point towards the point
- Unstable: Arrows on both sides point away the point
- Semi-Stable: Arrows towards the same direction

### Python Plot Phase-line

```{py}

import numpy as np
import matplotlib.pyplot as plt

# Define the derivative function y' = f(y)

def f(y):

    # Example: dy/dx = y * (1 - y) * (y - 2), with equilibrium points at y = 0, 1, and 2

    return y * (1 - y) * (y - 2)
    
# Set up y values

y_values = np.linspace(-0.5, 2.5, 100)

y_prime = f(y_values)



# Plot the phase-line

fig, ax = plt.subplots(figsize=(8, 4))



# Plot y' vs. y and label equilibrium points

ax.plot(y_values, y_prime, label="y'")

ax.axhline(0, color='black', linewidth=0.5)  # Horizontal line at y' = 0



# Identify equilibrium points and add labels

equilibrium_points = [0, 1, 2]

for y_eq in equilibrium_points:

    ax.plot(y_eq, 0, 'ro')  # Red dot at equilibrium points

    ax.text(y_eq, 0.1, f'y = {y_eq}', ha='center', color='red')



# Add arrows to indicate stability

for i in range(1, len(y_values) - 1):

    if y_prime[i] > 0:

        ax.annotate('', xy=(y_values[i + 1], y_prime[i + 1]), xytext=(y_values[i], y_prime[i]),

                    arrowprops=dict(arrowstyle="->", color='blue'))

    elif y_prime[i] < 0:

        ax.annotate('', xy=(y_values[i - 1], y_prime[i - 1]), xytext=(y_values[i], y_prime[i]),

                    arrowprops=dict(arrowstyle="->", color='red'))



# Customize plot

ax.set_xlabel("y")

ax.set_ylabel("y'")

ax.set_title("Phase-Line Plot with Stability Arrows")

ax.legend()

plt.grid(True)

plt.show()

```



### Python Plot Actual

```{py}

# Solve ODE

# Label Equilibrium Points

```



## System of Equations - 2D Example

### Equilibrium Points

1. Set x*, y* to zero

2. Plug into each other to eliminate x, y

3. Set cases for each equilibrium point



### Stability

1. Find Jacobian matrix A

2. Find sign of Eigenvalues (find lambda for det(A - \lambda I = 0)) 

- If \lambda > 0, unstable

- If \lambda < 0, stable

3. Repeat for each Equilibrium Point



### Python Plot

```{py}

import numpy as np

import matplotlib.pyplot as plt



alpha, beta, delta, gamma = 1.0, 0.5, 0.5, 1.0



# Define the system of differential equations

def system(x, y):

    # Example: Predator-prey model (Lotka-Volterra)

    # dx/dt = alpha * x - beta * x * y

    # dy/dt = delta * x * y - gamma * y

    dx = alpha * x - beta * x * y

    dy = delta * x * y - gamma * y

    return dx, dy



# Set up the grid of points

x_vals = np.linspace(0, 5, 20)

y_vals = np.linspace(0, 5, 20)

X, Y = np.meshgrid(x_vals, y_vals)



# Calculate direction fields (dx, dy) at each point on the grid

DX, DY = system(X, Y)

M = np.hypot(DX, DY)  # Normalize arrow length for visualization

DX, DY = DX / M, DY / M  # Normalize direction vectors



# Plot direction fields

fig, ax = plt.subplots(figsize=(8, 8))

ax.quiver(X, Y, DX, DY, M, pivot='middle', color='blue', scale=20)

ax.set_xlabel("x")

ax.set_ylabel("y")

ax.set_title("Direction Field for Predator-Prey Model")



# Calculate equilibrium points for the system

# For the Lotka-Volterra, equilibrium points are (0, 0) and (gamma / delta, alpha / beta)

equilibrium_points = [(0, 0), (gamma / delta, alpha / beta)]

for (x_eq, y_eq) in equilibrium_points:

    ax.plot(x_eq, y_eq, 'ro')  # Red dot at equilibrium points

    ax.text(x_eq, y_eq + 0.2, f'({x_eq:.2f}, {y_eq:.2f})', ha='center', color='red')



# Customize plot

ax.set_xlim([0, 5])

ax.set_ylim([0, 5])

plt.grid(True)

plt.show()

```



## Dimension reduction

- Change of Variables



## How to build a Model

- Simplification of reality

- Rate of change = rate in - rate out

- Rate can be proportinal, with factors introduced



## Models

### Physics

- Simple harmonic oscillator



### Exponential Models

- Radioactive decay

- Carbon dating

- Heating and Cooling of Buildings



### Fluid Concentration

- Mixing problem



### Population Models

- Exponential (Malthusian) Model

- Logistic Model

- Cobweb Diagram

- Depensation model

- With Havesting

- Bifurcation Point



### Predator Prey Model 

- Lotka-Volterra Model

- Competition Models



### War Modeling

- Lanchester Model of Conflict



### Lorenz Equation

- 3D

- Chaotic aperiodic

- Determinstic on Initial Condition

