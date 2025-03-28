# Derivative Speedrun 
2024-11-17

## Derivative Definition
Rate of change of a function with respect to a variable (eg. velocity)

## Derivative Notations

1. Leibniz notation: $ \frac{dy}{dx} $ 

2. Lagrange notation: $ f'(x) $ 

3. Newton's notation (primarily for time derivatives): $ \dot{y} = \frac{dy}{dt} $


## Derivative Rules

### Constant rule

$$ f(x) = c $$

$$ f'(x) = 0 $$ 


### Power rule 

$$ f(x) = x^n $$

$$ f'(x) = nx^{n-1} $$ 

If $n < 1$, $x \neq 0$


### Sum Rule

$$ f(x) = g(x) + h(x) $$

$$ f'(x) = g'(x) + h'(x) $$ 


### Constant Multiple Rule

$$ f(x) = c \cdot g(x) $$
$$ f'(x) = c \cdot g'(x) $$


### Product Rule

$$ f(x) = g(x) \cdot h(x) \cdot k(x) $$

$$ f'(x) = g'(x)h(x)k(x) + g(x)h'(x)k(x) + g(x)h(x)k'(x) $$



### Quotient Rule

$$ f(x) = \frac{g(x)}{h(x)} $$

$$ f'(x) = \frac{g'(x)h(x) - g(x)h'(x)}{(h(x))^2} $$

### Chain Rule

$$ f(x) = g(h(k(x))) $$

$$ f'(x) = g'(h(k(x))) \cdot h'(k(x)) \cdot k'(x) $$

---

## Derivatives of Common Functions

### Exponential Functions

$$ \frac{d}{dx} e^x = e^x $$

$$ \frac{d}{dx} a^x = a^x \ln(a), \quad a > 0 $$

### Logarithmic Functions

$$ \frac{d}{dx} \ln(x) = \frac{1}{x} $$

$$ \frac{d}{dx} \log_a(x) = \frac{1}{x \ln(a)} $$

### Trigonometric Functions

$$ \frac{d}{dx} \sin(x) = \cos(x) $$

$$ \frac{d}{dx} \cos(x) = -\sin(x) $$

$$ \frac{d}{dx} \tan(x) = \sec^2(x) $$

$$ \frac{d}{dx} \cot(x) = -\csc^2(x) $$

$$ \frac{d}{dx} \sec(x) = \sec(x) \tan(x) $$

$$ \frac{d}{dx} \csc(x) = -\csc(x) \cot(x) $$

### Inverse Trigonometric Functions

$$ \frac{d}{dx} \sin^{-1}(x) = \frac{1}{\sqrt{1 - x^2}} $$

$$ \frac{d}{dx} \cos^{-1}(x) = -\frac{1}{\sqrt{1 - x^2}} $$

$$ \frac{d}{dx} \tan^{-1}(x) = \frac{1}{1 + x^2} $$

$$ \frac{d}{dx} \cot^{-1}(x) = -\frac{1}{1 + x^2} $$

$$ \frac{d}{dx} \sec^{-1}(x) = \frac{1}{|x| \sqrt{x^2 - 1}} $$

$$ \frac{d}{dx} \csc^{-1}(x) = -\frac{1}{|x| \sqrt{x^2 - 1}} $$

