# Regression and Optimization  
2023-10-11

Regression is a fundamental technique in machine learning and statistics used to model relationships between variables. Optimization methods like gradient descent and cross-validation help improve model performance.  

## Types of Regression  

### Linear Regression  
- Finds the best-fit line that minimizes the sum of squared residuals.  
- Assumes a linear relationship between input features and the target variable.  

### Ridge Regression (L2 Regularization)  
- Adds an L2 penalty to the loss function, which discourages large coefficients.  
- Helps prevent overfitting by shrinking coefficients toward zero but does not eliminate them.  

### LASSO Regression (L1 Regularization)  
- Applies an L1 penalty, which forces some coefficients to become exactly zero.  
- Encourages sparsity, selecting only the most important features.  
- A higher regularization parameter (\(\lambda\)) results in more coefficients being set to zero, reducing model complexity but increasing the risk of underfitting.  

## Overfitting vs. Underfitting  

- Overfitting:  
  - Model is too complex (e.g., high-degree polynomial regression).  
  - Low bias, high variance—performs well on training data but poorly on new data.  

- Underfitting:  
  - Model is too simple (e.g., linear regression for a non-linear problem).  
  - High bias, low variance—fails to capture underlying patterns in the data.  

## Classification Concepts  

- Simple Threshold Classifier:  
  - Predicts only positive or negative outcomes based on a threshold.  

- Linear Classifier:  
  - Assigns weights to input features and makes decisions based on a weighted sum.  

- Decision Boundary:  
  - A dividing line that separates different classes in a classification problem.  

- Generalization Error:  
  - The difference between training error and validation error—measures how well a model performs on unseen data.  

## Optimization Techniques  

### Gradient Descent  
- An optimization algorithm used to find the best parameter values by minimizing the loss function.  
- Iteratively updates parameters in the direction of the steepest descent.  

### Cross-Validation  
- A technique for model evaluation that partitions the dataset into \( k \) subsets.  
- Trains \( k \) models, each time using one subset for validation and the rest for training.  
- Helps assess model performance for different levels of complexity.  