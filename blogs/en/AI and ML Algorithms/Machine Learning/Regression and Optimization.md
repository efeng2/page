# Regression and Optimization  
2023-10-11

Regression is a fundamental technique in machine learning and statistics used to model relationships between variables. Optimization methods like gradient descent and cross-validation help improve model performance.  

## Types of Regression  

Use dataset: House Prices - Advanced Regression Techniques: https://www.kaggle.com/c/house-prices-advanced-regression-techniques/data

### Linear Regression  
- Finds the best-fit line that minimizes the sum of squared residuals.  
- Assumes a linear relationship between input features and the target variable.  

```python
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import numpy as np

# Step 1: Load the data
try:
    data = pd.read_csv('king_county_house_prices.csv')
except FileNotFoundError:
    print("The dataset file was not found. Please check the file path.")
    exit()

# Step 2: Select features and the target variable
# Here we assume common features for house price prediction
features = ['sqft_living', 'bedrooms', 'bathrooms']
X = data[features]
y = data['price']

# Step 3: Handle missing values
# For simplicity, fill missing values with the mean for numerical columns
X = X.fillna(X.mean())

# Step 4: Split the data into training and validation sets
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 5: Train the linear regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Step 6: Make predictions on the validation set
y_pred = model.predict(X_val)

# Step 7: Evaluate the model
mse = mean_squared_error(y_val, y_pred)
print(f"Mean Squared Error on validation set: {mse}")
rmse = np.sqrt(mse)
print(f"Root Mean Squared Error on validation set: {rmse}")
```

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