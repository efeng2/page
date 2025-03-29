# Integral Speedrun
2024-11-17

## Integral Definition
Area under a curve.

## Integral Rules

### Constant Rule

$$ \int c \, dx = cx + C $$

### Power Rule

$$ \int x^n \, dx = \frac{x^{n+1}}{n+1} + C, \quad n \neq -1 $$

### Sum Rule

$$ \int (f(x) + g(x)) \, dx = \int f(x) \, dx + \int g(x) \, dx $$

### Constant Multiple Rule

$$ \int c \cdot f(x) \, dx = c \int f(x) \, dx $$

### Product Rule (Integration by Parts)

If $u = f(x)$ and $dv = g(x) \, dx$, then:

$$ \int u \, dv = uv - \int v \, du $$

### Substitution Rule (U-Substitution)

Let $u = g(x)$, then:

$$ \int f(g(x)) g'(x) \, dx = \int f(u) \, du $$

---

# Common Integrals

## Exponential Functions

$$ \int e^x \, dx = e^x + C $$

$$ \int a^x \, dx = \frac{a^x}{\ln(a)} + C, \quad a > 0, a \neq 1 $$

### Trigonometric Functions

$$ \int \sin(x) \, dx = -\cos(x) + C $$

$$ \int \cos(x) \, dx = \sin(x) + C $$

$$ \int \sec^2(x) \, dx = \tan(x) + C $$

$$ \int \csc^2(x) \, dx = -\cot(x) + C $$

$$ \int \sec(x) \tan(x) \, dx = \sec(x) + C $$

$$ \int \csc(x) \cot(x) \, dx = -\csc(x) + C $$

### Logarithmic Functions

$$ \int \frac{1}{x} \, dx = \ln |x| + C $$

---

## Integral Rules for Specific Techniques

### Partial Fraction Decomposition

Here’s the revised section with added details for partial fraction decomposition:

---

## Integral Rules for Specific Techniques

### Partial Fraction Decomposition

\[
\frac{P(x)}{Q(x)}
\]

\( \deg P(x) < \deg Q(x) \)

#### Distinct Factors

\[
\frac{P(x)}{(x - a)(x - b)}
\]

\[
=\frac{A}{x - a} + \frac{B}{x - b}
\]

#### Repeated Factors

\[
\frac{P(x)}{(x - a)^n}
\]

\[
=\frac{A_1}{x - a} + \frac{A_2}{(x - a)^2} + \dots + \frac{A_n}{(x - a)^n}
\]

#### Irreducible quadratic factors
\[
(x^2 + a)
\]

\[
= \frac{Ax + B}{x^2 + a}
\]

### Trigonometric Substitution

1. **For \( \sqrt{a^2 - x^2} \)**: Use \( x = a\sin\theta \), so \( dx = a\cos\theta \, d\theta \).
2. **For \( \sqrt{a^2 + x^2} \)**: Use \( x = a\tan\theta \), so \( dx = a\sec^2\theta \, d\theta \).
3. **For \( \sqrt{x^2 - a^2} \)**: Use \( x = a\sec\theta \), so \( dx = a\sec\theta\tan\theta \, d\theta \).

### Improper Integrals

Evaluate $\int_a^{\infty} f(x) \, dx$ as a limit:

$$ \int_a^{\infty} f(x) \, dx = \lim_{b \to \infty} \int_a^b f(x) \, dx $$

Similarly, for $ \int_{-\infty}^a f(x) \, dx $ and $ \int_{-\infty}^{\infty} f(x) \, dx $.



 