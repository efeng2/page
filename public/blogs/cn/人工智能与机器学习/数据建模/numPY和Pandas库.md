# numPY和Pandas库
2025-01-13

numPy and Pandas are python libaries that are used in data science 

numPy documentation

numPy is used for 

Pandas is used for

```{py}

import numpy as np

```

```{py}

# creation

a = np.array([[1, 2, 3],

[4, 5, 6]])

# indexing

#1D

a[0] = 10 #zero indexing

a[:3]

#2D

a[1, 3] # row, col

#Data type

a.dtype

np.zeros(), np.ones(), np.empty(), np.arange(), np.linspace()

np.ones(2, dtype=np.int64)

np.sort(), np.concatenate()

ndarray.ndim, ndarray.size, ndarray.shape

reshape()

data[0:2]

print(a[a < 5])

five_up = (a >= 5)

divisible_by_2 = a[a%2==0]

c = a[(a > 2) & (a < 11)]



np.vstack(), np.hstack(), np.hsplit(), .view(), copy() - need because will mod original



Operations



+-*/ a.sum()



Broadcasting



*



Operations



data.max()



data.min(axis=0)



data.sum()



```



Pandas documentation: https://pandas.pydata.org/docs/reference/index.html#api



Pandas data structure: dataframe - 3d data sturcture



Coloumn - series

Row 



```{py}

import pandas as pd

```



```{py}

# creation

df = pd.DataFrame(
   ...:     {
   ...:         "Name": [
   ...:             "Braund, Mr. Owen Harris",
   ...:             "Allen, Mr. William Henry",
   ...:             "Bonnell, Miss. Elizabeth",
   ...:         ],
   ...:         "Age": [22, 35, 58],
   ...:         "Sex": ["male", "male", "female"],
   ...:     }
   ...: )
ages = pd.Series([22, 35, 58], name="Age")
# indexing
df["Age"]
# Operations
df["Age"].max()
df.describe()
```

References



https://numpy.org/doc/stable/user/absolute_beginners.html



https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html#min-tut-01-tableoriented