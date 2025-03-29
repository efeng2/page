# Clustering
2023-10-11

## Unsupervised Learning
 - Labels Are Unknown

Unsupervised learning is a type of machine learning where the model is not provided with labels for the data. Instead, the model tries to identify patterns and structures in the data itself. The goal is to explore the underlying structure or distribution of the data, and techniques like clustering are used to group similar data points together.


## Supervised Learning - Input -> Labels Are Known
In supervised learning, the model is trained on data that is labeled, meaning each data point is associated with a known output (label). The objective is to learn a mapping from inputs to outputs, so the model can predict the correct labels for new, unseen data points.

### Example:
- *Supervised Learning:* A model is trained to predict whether an email is spam or not based on labeled data (spam or not).

## Clustering 
- Finding Clusters and Assigning Each Example to a Particular Cluster

Clustering is a type of unsupervised learning where the goal is to partition a dataset into groups (clusters) of similar data points. The model identifies inherent structures within the data and assigns each data point to a specific cluster. The assumption is that points within the same cluster are more similar to each other than to those in other clusters.

## Centroid
 - Location of Its Center

In clustering, the centroid is the center of a cluster. It represents the average of all points within the cluster.

## k-means++
 - Initializing with a Set of Points Farther Away from Each Other

k-means++ is an initialization method used to improve the convergence of the k-means algorithm. It selects initial cluster centroids in a way that they are farther apart from each other. This helps avoid poor local minima that could result from random initialization.

### Example:
- *k-means++:* Instead of randomly choosing initial centroids, k-means++ selects centroids that are far apart, reducing the likelihood of poor clustering results.

## Coordinate Descent
 - Heterogeneity Decreases or Stays the Same on Step 1/2

Coordinate descent is an optimization method where the model iteratively minimizes the objective function by adjusting one variable at a time while keeping others constant. In k-means, the algorithm alternates between assigning points to the nearest centroid and recalculating centroids to minimize the sum of squared distances.

## Mixture Models
 - Model Each Cluster as a Different Probability Distribution and Learn Their Parameters, Allows Soft Assignments (Probability)

Mixture models are probabilistic models that assume the data is generated from a mixture of several probability distributions, with each cluster corresponding to one distribution. Unlike hard clustering, where each data point is assigned to a single cluster, mixture models allow for soft assignments, meaning a data point can belong to multiple clusters with different probabilities.

## Hierarchical Clustering
 - Dendrograms

Hierarchical clustering is a method that builds a hierarchy of clusters, which can be visualized as a tree-like structure called a dendrogram. There are two types of hierarchical clustering: agglomerative (bottom-up) and divisive (top-down). This method does not require the number of clusters to be specified in advance.

### Divisive
 - Top-Down, Start One Big Cluster and Then Recursively Split the Data into Smaller Clusters

Divisive hierarchical clustering starts with all data points in a single cluster and recursively splits it into smaller, more homogeneous clusters. It proceeds by choosing the most "heterogeneous" cluster and dividing it into smaller clusters.

### Agglomerative
 - Bottom-Up, Start Data Point in Its Own Cluster. Merge Clusters Until All Points Are in One Big Cluster

Agglomerative hierarchical clustering starts with each data point as its own individual cluster and then repeatedly merges the closest clusters until all points are part of a single cluster. This process is driven by distance or similarity between clusters.

## Dendrogram
 - x-Axis Shows the Data Points (Arranged in a Very Particular Order), y-Axis Shows Distance Between Pairs of Clusters, Height Indicates Min Distance
 
A dendrogram is a tree-like diagram used to visualize the results of hierarchical clustering. The x-axis represents the data points, while the y-axis shows the distance between pairs of clusters. The height of each node in the dendrogram represents the minimum distance at which two clusters were merged. This allows for a visual interpretation of the clustering process and helps in choosing the optimal number of clusters.